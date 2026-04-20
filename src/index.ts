#!/usr/bin/env node
/**
 * eSpace MCP Server
 *
 * Exposes eSpace facilities management API operations as MCP tools.
 * Auth: API key → JWT token (auto-managed).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { eSpaceProvider } from "./provider.js";

// --- Configuration ---
const ESPACE_API_KEY = process.env.ESPACE_API_KEY;
const ESPACE_BASE_URL = process.env.ESPACE_BASE_URL || "https://api.espace.cool";

if (!ESPACE_API_KEY) {
  console.error("Error: ESPACE_API_KEY environment variable is required");
  process.exit(1);
}

// --- Initialize provider ---
const provider = eSpaceProvider.getInstance(ESPACE_BASE_URL, ESPACE_API_KEY);

// --- Create MCP server ---
const server = new McpServer({
  name: "espace",
  version: "1.0.0",
});

// =========================================================================
// WORK ORDER TOOLS
// =========================================================================

server.tool(
  "get-work-order",
  "Get details of a specific work order by ID. Use include to get related Costs, Spaces, Tasks, Attachments.",
  {
    workOrderId: z.number().int().describe("The work order ID"),
    include: z.string().optional().describe("Comma-separated: Costs, Spaces, Tasks, Attachments"),
  },
  async ({ workOrderId, include }) => {
    const result = await provider.workOrders.getWorkOrder(workOrderId, include);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "list-work-orders",
  "List work orders with optional filters by location, status, priority, assignment, service category, or date range.",
  {
    locationId: z.number().int().optional().describe("Filter by location ID"),
    statusId: z.number().int().optional().describe("Filter by status ID"),
    priorityId: z.number().int().optional().describe("Filter by priority ID"),
    assignedId: z.number().int().optional().describe("Filter by assigned user ID"),
    serviceCategoryId: z.number().int().optional().describe("Filter by service category ID"),
    startDate: z.string().optional().describe("Filter start date (ISO format)"),
    endDate: z.string().optional().describe("Filter end date (ISO format)"),
    include: z.string().optional().describe("Comma-separated: Costs, Spaces, Tasks, Attachments"),
  },
  async (params) => {
    const result = await provider.workOrders.listWorkOrders(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "create-work-order",
  "Create a new work order. Requires description, location, service category, and priority. ALWAYS confirm with user before calling.",
  {
    FullDescription: z.string().describe("Full description of the work order"),
    LocationId: z.number().int().describe("Location ID"),
    ServiceCategoryId: z.number().int().describe("Service category ID"),
    PriorityId: z.number().int().describe("Priority ID"),
    Eta: z.string().optional().describe("Requested completion date (ISO format)"),
    AssignedId: z.number().int().optional().describe("User ID to assign"),
    VendorAssignedId: z.number().int().optional().describe("Vendor ID to assign"),
    AssignedDepartmentId: z.number().int().optional().describe("Department ID to assign"),
  },
  async (params) => {
    const result = await provider.workOrders.createWorkOrder(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "update-work-order",
  "Update an existing work order. ALWAYS confirm with user before calling.",
  {
    WorkOrderId: z.number().int().describe("Work order ID to update"),
    FullDescription: z.string().optional().describe("Updated description"),
    LocationId: z.number().int().optional().describe("Updated location ID"),
    ServiceCategoryId: z.number().int().optional().describe("Updated service category ID"),
    PriorityId: z.number().int().optional().describe("Updated priority ID"),
    StatusId: z.number().int().optional().describe("Updated status ID"),
    Eta: z.string().optional().describe("Updated completion date (ISO format)"),
    AssignedId: z.number().int().optional().describe("Updated assigned user ID"),
  },
  async (params) => {
    const result = await provider.workOrders.updateWorkOrder(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "delete-work-order",
  "Delete a work order. ALWAYS confirm with user before calling.",
  {
    workOrderId: z.number().int().describe("Work order ID to delete"),
  },
  async ({ workOrderId }) => {
    const result = await provider.workOrders.deleteWorkOrder(workOrderId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-spaces",
  "Get the spaces (rooms/areas) associated with a work order.",
  {
    workOrderId: z.number().int().describe("The work order ID"),
  },
  async ({ workOrderId }) => {
    const result = await provider.workOrders.getSpaces(workOrderId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-tasks",
  "Get tasks for a specific work order.",
  {
    workOrderId: z.number().int().describe("The work order ID"),
  },
  async ({ workOrderId }) => {
    const result = await provider.workOrders.getTasks(workOrderId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "add-work-order-task",
  "Add a task to a work order. ALWAYS confirm with user before calling.",
  {
    workOrderId: z.number().int().describe("Work order ID"),
    Description: z.string().optional().describe("Task description"),
    DueDate: z.string().optional().describe("Due date (ISO format)"),
    TotalMinutes: z.number().int().optional().describe("Estimated minutes"),
    AssignedToUserId: z.number().int().optional().describe("Assigned user ID"),
    AssignedToDepartmentId: z.number().int().optional().describe("Assigned department ID"),
  },
  async ({ workOrderId, ...task }) => {
    const result = await provider.workOrders.addTask(workOrderId, task);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "update-work-order-task",
  "Update a task on a work order. ALWAYS confirm with user before calling.",
  {
    taskId: z.number().int().describe("Task ID to update"),
    Description: z.string().optional().describe("Updated description"),
    DueDate: z.string().optional().describe("Updated due date (ISO format)"),
    TotalMinutes: z.number().int().optional().describe("Updated estimated minutes"),
    IsCompleted: z.boolean().optional().describe("Mark task as completed"),
  },
  async ({ taskId, ...task }) => {
    const result = await provider.workOrders.updateTask(taskId, task);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-costs",
  "Get costs for a specific work order.",
  {
    workOrderId: z.number().int().describe("The work order ID"),
  },
  async ({ workOrderId }) => {
    const result = await provider.workOrders.getCosts(workOrderId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-attachments",
  "Get file attachments for a specific work order.",
  {
    workOrderId: z.number().int().describe("The work order ID"),
  },
  async ({ workOrderId }) => {
    const result = await provider.workOrders.getAttachments(workOrderId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-priorities",
  "Get all available work order priority levels.",
  {},
  async () => {
    const result = await provider.workOrders.getPriorities();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-work-order-statuses",
  "Get all available work order status types.",
  {},
  async () => {
    const result = await provider.workOrders.getStatuses();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// =========================================================================
// MINISTRY / ORGANIZATION TOOLS
// =========================================================================

server.tool(
  "get-locations",
  "Get all locations for the ministry/organization.",
  {},
  async () => {
    const result = await provider.ministry.getLocations();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-users",
  "Get all users for the ministry/organization.",
  {},
  async () => {
    const result = await provider.ministry.getUsers();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-categories",
  "Get all event categories for the ministry/organization.",
  {},
  async () => {
    const result = await provider.ministry.getCategories();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-service-categories",
  "Get all service categories (used for work orders and maintenance).",
  {},
  async () => {
    const result = await provider.ministry.getServiceCategories();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-editors",
  "Get all event editors for the ministry/organization.",
  {},
  async () => {
    const result = await provider.ministry.getEditors();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-task-templates",
  "Get all task templates available in the organization.",
  {},
  async () => {
    const result = await provider.ministry.getTaskTemplates();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// =========================================================================
// MAINTENANCE TOOLS
// =========================================================================

server.tool(
  "get-maintenance",
  "Get details of a specific scheduled maintenance item. Use include for related Spaces, Tasks, Attachments, WorkOrders.",
  {
    maintenanceId: z.number().int().describe("The maintenance ID"),
    include: z.string().optional().describe("Comma-separated: Spaces, Tasks, Attachments, WorkOrders"),
  },
  async ({ maintenanceId, include }) => {
    const result = await provider.maintenance.getMaintenance(maintenanceId, include);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "list-maintenance",
  "List scheduled maintenance items with optional filters.",
  {
    locationId: z.number().int().optional().describe("Filter by location ID"),
    include: z.string().optional().describe("Comma-separated: Spaces, Tasks, Attachments, WorkOrders"),
  },
  async (params) => {
    const result = await provider.maintenance.listMaintenance(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-maintenance-spaces",
  "Get the spaces (rooms/areas) associated with a scheduled maintenance item.",
  {
    maintenanceId: z.number().int().describe("The maintenance ID"),
  },
  async ({ maintenanceId }) => {
    const result = await provider.maintenance.getSpaces(maintenanceId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-maintenance-types",
  "Get all available scheduled maintenance types.",
  {},
  async () => {
    const result = await provider.maintenance.getMaintenanceTypes();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-frequency-types",
  "Get all available maintenance frequency types (for scheduling recurrence).",
  {},
  async () => {
    const result = await provider.maintenance.getFrequencyTypes();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// =========================================================================
// EVENT TOOLS
// =========================================================================

server.tool(
  "get-event",
  "Get details of a specific event. Use include for related Spaces, Resources, Services.",
  {
    eventId: z.number().int().describe("The event ID"),
    include: z.string().optional().describe("Comma-separated related objects to include"),
  },
  async ({ eventId, include }) => {
    const result = await provider.events.getEvent(eventId, include);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "list-events",
  "List events with optional filters by location, date range, or category.",
  {
    locationId: z.number().int().optional().describe("Filter by location ID"),
    startDate: z.string().optional().describe("Filter start date (ISO format)"),
    endDate: z.string().optional().describe("Filter end date (ISO format)"),
    categoryId: z.number().int().optional().describe("Filter by category ID"),
    include: z.string().optional().describe("Comma-separated related objects to include"),
  },
  async (params) => {
    const result = await provider.events.listEvents(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-event-spaces",
  "Get the space tree for an event. Returns all spaces (rooms/areas) with hierarchy, capacity, and scheduling status.",
  {
    eventId: z.number().int().describe("The event ID"),
    scheduleId: z.number().int().describe("The schedule ID for the event"),
  },
  async ({ eventId, scheduleId }) => {
    const result = await provider.events.getSpaces(eventId, scheduleId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-event-occurrences",
  "Get occurrences of a recurring event within a date range.",
  {
    eventId: z.number().int().describe("The event ID"),
    startDate: z.string().optional().describe("Start date (ISO format)"),
    endDate: z.string().optional().describe("End date (ISO format)"),
  },
  async ({ eventId, ...params }) => {
    const result = await provider.events.getOccurrences(eventId, params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// =========================================================================
// EQUIPMENT TOOLS
// =========================================================================

server.tool(
  "get-equipment",
  "Get details of a specific piece of equipment.",
  {
    equipmentId: z.number().int().describe("The equipment ID"),
  },
  async ({ equipmentId }) => {
    const result = await provider.equipment.getEquipment(equipmentId);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "list-equipment",
  "List all equipment with optional filters.",
  {
    locationId: z.number().int().optional().describe("Filter by location ID"),
    equipmentTypeId: z.number().int().optional().describe("Filter by equipment type ID"),
  },
  async (params) => {
    const result = await provider.equipment.listEquipment(params);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get-equipment-types",
  "Get all available equipment types.",
  {},
  async () => {
    const result = await provider.equipment.getEquipmentTypes();
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// =========================================================================
// START SERVER
// =========================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
