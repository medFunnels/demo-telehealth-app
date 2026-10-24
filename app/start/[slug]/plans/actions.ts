"use server";

import { redirect } from "next/navigation";

import { medfunnels } from "@/medfunnels.server";
import { CONVERSION_NAME, PLANS } from "@/lib/plans";

export async function choosePlan(formData: FormData) {
    const slug = String(formData.get("slug") ?? "");
    const plan = PLANS.find((item) => item.id === formData.get("plan"));
    if (!plan || !medfunnels.release(slug)) redirect("/");
    // A real app would take payment first. The conversion carries a registered name and an amount, nothing about
    // the patient. It returns false (and never throws) when analytics is off or medFunnels refuses it.
    await medfunnels.recordConversion(slug, CONVERSION_NAME, plan.price);
    redirect(`/start/${encodeURIComponent(slug)}/welcome?plan=${plan.id}`);
}
