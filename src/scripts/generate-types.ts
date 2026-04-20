/**
 * generate-types.ts — Reads swagger.json and generates TypeScript interfaces
 * and Zod validation schemas for all eSpace API models.
 *
 * Usage: npx tsx src/scripts/generate-types.ts
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SWAGGER_PATH = join(__dirname, "../../swagger.json");
const OUTPUT_DIR = join(__dirname, "../models");

interface SwaggerProperty {
  type?: string;
  format?: string;
  description?: string;
  $ref?: string;
  readOnly?: boolean;
  items?: SwaggerProperty;
  enum?: (string | number)[];
}

interface SwaggerDefinition {
  type?: string;
  description?: string;
  required?: string[];
  properties?: Record<string, SwaggerProperty>;
}

function swaggerTypeToTs(prop: SwaggerProperty): string {
  if (prop.$ref) {
    const refName = prop.$ref.split("/").pop()!;
    return sanitizeTypeName(refName);
  }

  switch (prop.type) {
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "string":
      if (prop.format === "date-time") return "string"; // ISO date string
      if (prop.enum) return prop.enum.map((e) => `"${e}"`).join(" | ");
      return "string";
    case "array":
      if (prop.items) return `${swaggerTypeToTs(prop.items)}[]`;
      return "unknown[]";
    case "object":
      return "Record<string, unknown>";
    default:
      return "unknown";
  }
}

function swaggerTypeToZod(prop: SwaggerProperty, required: boolean): string {
  let zodType: string;

  if (prop.$ref) {
    const refName = prop.$ref.split("/").pop()!;
    zodType = `${sanitizeTypeName(refName)}Schema`;
  } else {
    switch (prop.type) {
      case "integer":
        zodType = "z.number().int()";
        break;
      case "number":
        zodType = "z.number()";
        break;
      case "boolean":
        zodType = "z.boolean()";
        break;
      case "string":
        if (prop.format === "date-time") {
          zodType = "z.string().datetime().or(z.string())";
        } else if (prop.enum) {
          zodType = `z.enum([${prop.enum.map((e) => `"${e}"`).join(", ")}])`;
        } else {
          zodType = "z.string()";
        }
        break;
      case "array":
        if (prop.items) {
          zodType = `z.array(${swaggerTypeToZod(prop.items, true)})`;
        } else {
          zodType = "z.array(z.unknown())";
        }
        break;
      default:
        zodType = "z.unknown()";
    }
  }

  if (!required) zodType += ".optional()";
  if (prop.readOnly) zodType += " /* readOnly */";
  return zodType;
}

function sanitizeTypeName(name: string): string {
  // Handle generic types like GenericApiModel[Dictionary[Int32,String]]
  return name.replace(/[\[\],]/g, "_").replace(/_+$/, "");
}

function sanitizeFileName(name: string): string {
  return name.replace(/[\[\],]/g, "_").replace(/_+$/, "");
}

function generateInterface(
  name: string,
  def: SwaggerDefinition
): string {
  const tsName = sanitizeTypeName(name);
  const lines: string[] = [];

  if (def.description) {
    lines.push(`/** ${def.description} */`);
  }
  lines.push(`export interface ${tsName} {`);

  if (def.properties) {
    const required = new Set(def.required || []);
    for (const [propName, prop] of Object.entries(def.properties)) {
      const opt = required.has(propName) ? "" : "?";
      const readonly = prop.readOnly ? "readonly " : "";
      if (prop.description) {
        lines.push(`  /** ${prop.description} */`);
      }
      lines.push(`  ${readonly}${propName}${opt}: ${swaggerTypeToTs(prop)};`);
    }
  }

  lines.push("}");
  return lines.join("\n");
}

function generateZodSchema(
  name: string,
  def: SwaggerDefinition
): string {
  const tsName = sanitizeTypeName(name);
  const lines: string[] = [];

  lines.push(`export const ${tsName}Schema = z.object({`);

  if (def.properties) {
    const required = new Set(def.required || []);
    for (const [propName, prop] of Object.entries(def.properties)) {
      const isRequired = required.has(propName);
      lines.push(`  ${propName}: ${swaggerTypeToZod(prop, isRequired)},`);
    }
  }

  lines.push("});");
  return lines.join("\n");
}

function collectRefs(def: SwaggerDefinition): Set<string> {
  const refs = new Set<string>();
  if (!def.properties) return refs;

  for (const prop of Object.values(def.properties)) {
    if (prop.$ref) {
      refs.add(sanitizeTypeName(prop.$ref.split("/").pop()!));
    }
    if (prop.items?.$ref) {
      refs.add(sanitizeTypeName(prop.items.$ref.split("/").pop()!));
    }
  }
  return refs;
}

// --- Main ---
console.log("Generating TypeScript types from eSpace Swagger spec...\n");

const spec = JSON.parse(readFileSync(SWAGGER_PATH, "utf8"));
const definitions: Record<string, SwaggerDefinition> = spec.definitions || {};
const defNames = Object.keys(definitions).sort();

console.log(`Found ${defNames.length} model definitions\n`);

// Clean and recreate output directory
if (existsSync(OUTPUT_DIR)) {
  rmSync(OUTPUT_DIR, { recursive: true });
  console.log(`Cleaned output directory: ${OUTPUT_DIR}`);
}
mkdirSync(OUTPUT_DIR, { recursive: true });

// Generate individual files
for (const name of defNames) {
  const def = definitions[name];
  const tsName = sanitizeTypeName(name);
  const fileName = sanitizeFileName(name);

  // Collect imports for referenced types
  const refs = collectRefs(def);

  // --- Interface file ---
  const ifaceLines: string[] = [];
  for (const ref of refs) {
    if (ref !== tsName) {
      ifaceLines.push(`import type { ${ref} } from "./${sanitizeFileName(ref)}.js";`);
    }
  }
  if (ifaceLines.length > 0) ifaceLines.push("");
  ifaceLines.push(generateInterface(name, def));
  writeFileSync(join(OUTPUT_DIR, `${fileName}.ts`), ifaceLines.join("\n") + "\n");

  // --- Zod schema file ---
  const zodLines: string[] = ['import { z } from "zod";'];
  for (const ref of refs) {
    if (ref !== tsName) {
      zodLines.push(`import { ${ref}Schema } from "./${sanitizeFileName(ref)}.schema.js";`);
    }
  }
  zodLines.push("");
  zodLines.push(generateZodSchema(name, def));
  writeFileSync(join(OUTPUT_DIR, `${fileName}.schema.ts`), zodLines.join("\n") + "\n");

  console.log(`  ${tsName} (${Object.keys(def.properties || {}).length} fields)`);
}

// --- Index file ---
const indexLines: string[] = [
  "// Auto-generated barrel export — do not edit manually",
  "",
];
for (const name of defNames) {
  const tsName = sanitizeTypeName(name);
  const fileName = sanitizeFileName(name);
  indexLines.push(`export type { ${tsName} } from "./${fileName}.js";`);
  indexLines.push(`export { ${tsName}Schema } from "./${fileName}.schema.js";`);
}
writeFileSync(join(OUTPUT_DIR, "index.ts"), indexLines.join("\n") + "\n");

console.log(
  `\nSuccessfully generated ${defNames.length} interfaces + ${defNames.length} Zod schemas (${defNames.length * 2} files + index)\n`
);
