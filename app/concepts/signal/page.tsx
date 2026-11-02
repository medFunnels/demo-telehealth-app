import type { Metadata } from "next";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ArrowRight } from "@/components/icons";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "Signal · Homepage concept",
    description: "A dark, data-led homepage concept for a hormone, peptide and longevity clinic.",
};

const GOALS: { name: string; pattern: string; category: Category["id"] }[] = [
    { name: "Male hormones", pattern: "rings", category: "longevity" },
    { name: "Female hormones", pattern: "waves", category: "longevity" },
    { name: "Recovery & sleep", pattern: "grid", category: "longevity" },
    { name: "Cellular energy", pattern: "dots", category: "longevity" },
    { name: "Metabolic health", pattern: "lines", category: "weight" },
    { name: "Healthy aging", pattern: "glow", category: "longevity" },
];

const MARKERS: [string, string][] = [
    ["Total testosterone", "A"], ["Estradiol", "A"], ["IGF-1", "B"], ["HbA1c", "A"],
    ["ApoB", "B"], ["hs-CRP", "C"], ["Vitamin D", "B"], ["TSH", "A"],
];

export default function SignalPage() {
    const concept = getConcept("signal");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));

    return (
        <ConceptFrame concept={concept}>
            <header className="sg-header">
                <div className="container sg-header-row">
                    <span className="sg-wordmark">tidewell<span>/signal</span></span>
                    <nav className="sg-nav" aria-label="Signal concept">
                        <a href="#how">How it works</a>
                        <a href="#goals">Goals</a>
                        <a href="#membership">Membership</a>
                    </nav>
                    <Link href={href()} className="sg-button sg-button-small">Join</Link>
                </div>
            </header>

            <section className="sg-hero">
                <div className="container">
                    <span className="sg-label">[ Hormones · Peptides · Longevity ]</span>
                    <h1 className="sg-h1">Measure first.<br /><span>Then optimize.</span></h1>
                    <p className="sg-lead">A 50+ biomarker baseline, a clinician who reads it with you, and a protocol of hormones and peptides built on your numbers, not on guesswork.</p>
                    <div className="actions">
                        <Link href={href()} className="sg-button">Get your baseline <ArrowRight size={18} /></Link>
                        <a href="#how" className="sg-button sg-button-ghost">See how it works</a>
                    </div>
                    <dl className="sg-stats">
                        <div><dt>50+</dt><dd>Biomarkers per panel</dd></div>
                        <div><dt>2×</dt><dd>Retests a year</dd></div>
                        <div><dt>1:1</dt><dd>Clinician review</dd></div>
                    </dl>
                </div>
            </section>

            <section id="how" className="sg-section">
                <div className="container">
                    <span className="sg-label">How it works</span>
                    <h2 className="sg-h2">Know what&apos;s happening on the inside.</h2>
                    <div className="sg-steps">
                        <div className="sg-step">
                            <span className="sg-label">[1]</span>
                            <h3>Your baseline, quantified</h3>
                            <p>One blood draw covers hormones, metabolism, inflammation and more.</p>
                            <div className="sg-card" aria-label="Sample health score">
                                <div className="sg-card-head"><span>Health score</span><span className="sg-muted">Sample</span></div>
                                <ul className="sg-markers">
                                    {MARKERS.map(([name, grade]) => <li key={name}><span className={`sg-grade sg-grade-${grade}`}>{grade}</span>{name}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="sg-step">
                            <span className="sg-label">[2]</span>
                            <h3>Your biological age</h3>
                            <p>How fast you&apos;re aging, estimated from your results and tracked over time.</p>
                            <div className="sg-card sg-card-age" aria-label="Sample biological age">
                                <span className="sg-label">Biological age · sample</span>
                                <strong>37</strong>
                                <p><span>4 years younger</span> than your calendar age</p>
                            </div>
                        </div>
                        <div className="sg-step">
                            <span className="sg-label">[3]</span>
                            <h3>A protocol that adapts</h3>
                            <p>If treatment fits, your clinician prescribes, then adjusts at every retest.</p>
                            <div className="sg-card" aria-label="Sample protocol">
                                <div className="sg-card-head"><span>Protocol</span><span className="sg-muted">Sample</span></div>
                                {[["Sermorelin", "Improves IGF-1"], ["Testosterone", "Targets total T"], ["NAD+", "Energy support"]].map(([name, why]) => (
                                    <div key={name} className="sg-protocol-row"><strong>{name}</strong><span>{why}</span></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="goals" className="sg-section">
                <div className="container">
                    <span className="sg-label">Goals</span>
                    <h2 className="sg-h2">Start where it matters to you.</h2>
                    <div className="sg-goals">
                        {GOALS.map((goal) => (
                            <Link key={goal.name} href={href(goal.category)} className={`sg-goal sg-pattern-${goal.pattern}`}>
                                <span>{goal.name}</span>
                                <ArrowRight size={16} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="membership" className="sg-section">
                <div className="container sg-membership">
                    <div>
                        <span className="sg-label">Membership</span>
                        <h2 className="sg-h2">$149<span>/mo</span></h2>
                        <p className="sg-lead">Two full panels a year, clinician reviews, unlimited messaging and dose changes. Prescriptions are priced separately, at cost plus pharmacy fees.</p>
                        <Link href={href()} className="sg-button">Join Signal <ArrowRight size={18} /></Link>
                    </div>
                    <ul className="sg-includes">
                        {["50+ biomarker panel, twice a year", "Biological age tracking", "1:1 clinician results review", "Hormone and peptide prescriptions, if appropriate", "Unlimited messaging with your care team"].map((item, i) => (
                            <li key={item}><span className="sg-label">0{i + 1}</span>{item}</li>
                        ))}
                    </ul>
                </div>
                <p className="container sg-fine">Compounded medications are not FDA-approved. Biological age is an estimate, not a diagnosis. Prescriptions require a consultation with a licensed clinician.</p>
            </section>
        </ConceptFrame>
    );
}
