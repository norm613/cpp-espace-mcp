import type { VmWebhookEvent } from "./VmWebhookEvent.js";

export interface VmWebhookSubscripotion {
  Id?: number;
  Url: string;
  Notes?: string;
  Events?: VmWebhookEvent[];
}
