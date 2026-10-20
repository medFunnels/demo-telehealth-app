import { medfunnels } from "../../../../medfunnels.server";

export const runtime = "nodejs";
// Opt-in funnel analytics ("analytics": true in medfunnels.config.json): aggregate counts only. Does nothing when off.
export const POST = medfunnels.eventsRoute;
