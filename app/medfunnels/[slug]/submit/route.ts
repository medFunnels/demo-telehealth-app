import { medfunnels } from "@/medfunnels.server";

export const runtime = "nodejs";

// Answers arrive here already validated against the signed questionnaire. medFunnels never sees them.
export const POST = medfunnels.submitRoute(async (answers, { request, questionnaire }) => {
    // 1. Identify the patient with your own session (cookies on `request`).
    // 2. Save `answers` with their record. Each has questionKey, kind, value and displayValue.
    // Return { ok: false, message } to show the patient an error instead.
    // This demo has no patient records, so it accepts the visit and saves nothing.
});
