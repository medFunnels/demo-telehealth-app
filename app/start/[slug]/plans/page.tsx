import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Check, Shield, Truck } from "../../../../components/icons";
import { PLANS } from "../../../../lib/plans";
import { getProgram } from "../../../../lib/programs";
import { choosePlan } from "./actions";

export const metadata: Metadata = { title: "Choose your plan" };

type Props = { params: Promise<{ slug: string }> };

export default async function PlansPage({ params }: Props) {
    const { slug } = await params;
    const program = getProgram(slug);
    if (!program) notFound();
    return (
        <div className="checkout">
            <div className="checkout-head">
                <span className="step-pill"><Check size={14} /> Visit complete</span>
                <h1>Choose your plan</h1>
                <p>A licensed clinician will review your {program.name.toLowerCase()} visit within 24 hours. You&apos;re only charged if treatment is prescribed.</p>
            </div>
            <div className="plan-grid">
                {PLANS.map((plan) => (
                    <form key={plan.id} action={choosePlan} className={`plan-card${plan.popular ? " popular" : ""}`}>
                        <input type="hidden" name="slug" value={slug} />
                        <input type="hidden" name="plan" value={plan.id} />
                        {plan.popular ? <span className="plan-badge">Best value</span> : null}
                        <div className="plan-title">
                            <h3>{plan.name}</h3>
                            <p>{plan.blurb}</p>
                        </div>
                        <p className="plan-price"><strong>${plan.price}</strong><span>{plan.cadence}</span></p>
                        <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
                        <button className={`button button-large${plan.popular ? "" : " button-ghost"}`} type="submit">Continue with {plan.name}</button>
                    </form>
                ))}
            </div>
            <ul className="assurances">
                <li><Shield size={16} /> No charge unless prescribed</li>
                <li><Truck size={16} /> Free, discreet shipping</li>
                <li><Check size={16} /> Cancel anytime</li>
            </ul>
        </div>
    );
}
