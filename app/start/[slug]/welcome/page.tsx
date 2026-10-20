import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Chat, Check, Stethoscope, Truck } from "../../../../components/icons";
import { PLANS } from "../../../../lib/plans";
import { getProgram } from "../../../../lib/programs";

export const metadata: Metadata = { title: "You're all set" };

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ plan?: string }> };

export default async function WelcomePage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { plan: planId } = await searchParams;
    const program = getProgram(slug);
    const plan = PLANS.find((item) => item.id === planId);
    if (!program || !plan) notFound();
    return (
        <div className="done">
            <span className="done-mark" aria-hidden="true"><Check size={34} /></span>
            <h1>You&apos;re all set</h1>
            <p className="done-lead">Your {program.name.toLowerCase()} visit and {plan.name.toLowerCase()} plan (${plan.price}{plan.cadence}) are in.</p>
            <ol className="next-steps">
                <li><span><Stethoscope size={18} /></span><div><strong>Clinician review</strong>A licensed provider reviews your visit, usually within 24 hours.</div></li>
                <li><span><Chat size={18} /></span><div><strong>We&apos;ll message you</strong>If anything needs clarifying, your provider reaches out first.</div></li>
                <li><span><Truck size={18} /></span><div><strong>Free delivery</strong>Once prescribed, your treatment ships in discreet packaging.</div></li>
            </ol>
            <Link className="button button-large" href="/">Back to Tidewell</Link>
        </div>
    );
}
