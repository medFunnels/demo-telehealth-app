import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ArrowRight } from "@/components/icons";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "TORQUE · Overdrive concept",
    description: "A dark, action-first homepage concept for TORQUE, a fictional performance hormone and peptide clinic.",
};

// TORQUE is a fictional brand. Archivo's width axis gives the condensed display type.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-torque" });

const MARQUEE = ["Testosterone", "Sermorelin", "NAD+", "Semaglutide", "Estradiol", "Labs included"];

const MISSIONS: { n: string; name: string; rx: string; cadence: string; from: number; category: Category["id"] }[] = [
    { n: "01", name: "Strength", rx: "Testosterone therapy", cadence: "Weekly", from: 149, category: "longevity" },
    { n: "02", name: "Recovery", rx: "Sermorelin peptide", cadence: "Nightly", from: 129, category: "longevity" },
    { n: "03", name: "Output", rx: "NAD+ injection or spray", cadence: "3× a week", from: 90, category: "longevity" },
    { n: "04", name: "Body comp", rx: "GLP-1 metabolic care", cadence: "Weekly", from: 199, category: "weight" },
];

const TIMELINE = [
    { week: "00", title: "Baseline", text: "50+ biomarker draw. Fifteen minutes." },
    { week: "01", title: "Debrief", text: "Clinician call. Your numbers, your targets." },
    { week: "02", title: "Deploy", text: "If prescribed, your protocol ships." },
    { week: "06", title: "Adjust", text: "Check-in. Dose tuned to how you respond." },
    { week: "12", title: "Retest", text: "New panel. Prove it worked, then push." },
];

const STATS = [["15", "Minute lab draw"], ["48", "Hour clinician review"], ["12", "Week retest cycle"], ["0", "Waiting rooms"]];

const READOUTS: { label: string; value: string; pct: number }[] = [
    { label: "Free T", value: "14.2 ng/dL", pct: 78 },
    { label: "IGF-1", value: "+22%", pct: 64 },
    { label: "Recovery", value: "84%", pct: 84 },
    { label: "Sleep", value: "7h 42m", pct: 70 },
];

function Split({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="tq-split">
            <span>{children}</span>
            <span className="tq-split-arrow"><ArrowRight size={18} /></span>
        </Link>
    );
}

function Marks() {
    return <><i className="tq-mark tq-mark-tl" /><i className="tq-mark tq-mark-tr" /><i className="tq-mark tq-mark-bl" /><i className="tq-mark tq-mark-br" /></>;
}

export default function OverdrivePage() {
    const concept = getConcept("overdrive");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));
    const band = [...MARQUEE, ...MARQUEE, ...MARQUEE];

    return (
        <ConceptFrame concept={concept} brand="TORQUE">
            <div className={`tq ${display.variable}`}>
                <header className="tq-header">
                    <a href="#top" className="tq-logo">TORQUE<span>///</span></a>
                    <nav className="tq-nav" aria-label="TORQUE">
                        <a href="#missions">Missions</a>
                        <a href="#protocol">Protocol</a>
                        <a href="#pricing">Pricing</a>
                    </nav>
                    <Split href={href()}>Start protocol</Split>
                </header>

                <section id="top" className="tq-hero">
                    <div className="tq-grid-bg" aria-hidden="true" />
                    <div className="tq-streaks" aria-hidden="true"><i /><i /><i /></div>
                    <Marks />
                    <h1 className="tq-giant">
                        <span>Outwork</span>
                        <span>your</span>
                        <span className="tq-green">age.</span>
                    </h1>
                    <div className="tq-hud" aria-label="Sample protocol readout">
                        <div className="tq-hud-head"><span><i className="tq-live" /> Live protocol</span><span>Sample</span></div>
                        <div className="tq-dial">
                            <svg viewBox="0 0 120 120" aria-hidden="true">
                                <circle cx="60" cy="60" r="50" className="tq-dial-track" />
                                <circle cx="60" cy="60" r="50" className="tq-dial-fill" />
                            </svg>
                            <div><strong>W08</strong><small>of 12</small></div>
                        </div>
                        {READOUTS.map((r) => (
                            <div key={r.label} className="tq-readout">
                                <div><span>{r.label}</span><b>{r.value}</b></div>
                                <span className="tq-bar"><i style={{ width: `${r.pct}%` }} /></span>
                            </div>
                        ))}
                    </div>
                    <div className="tq-hero-foot">
                        <p>Clinician-led hormone and peptide protocols for people who train. Labs first. Numbers always. No guesswork.</p>
                        <Split href={href()}>Unlock your protocol</Split>
                    </div>
                </section>

                <div className="tq-bands" aria-hidden="true">
                    <div className="tq-band tq-band-green"><div>{band.map((w, i) => <span key={i}>{w} <b>///</b></span>)}</div></div>
                    <div className="tq-band tq-band-gray"><div>{band.map((w, i) => <span key={i}>{w} <b>+</b></span>)}</div></div>
                </div>

                <section className="tq-section tq-mission">
                    <Marks />
                    <span className="tq-label">[ Our mission ]</span>
                    <h2 className="tq-statement">No packages.<br />No guesswork.<br /><span className="tq-green">Just your numbers.</span></h2>
                    <p className="tq-mission-copy">Every member starts with a full panel and a clinician who reads it with you. If treatment fits, your protocol is built around your biology and your training, then tuned every cycle until it performs.</p>
                </section>

                <section id="missions" className="tq-section">
                    <div className="tq-section-head"><span className="tq-label">[ Pick your mission ]</span><span className="tq-label">04 programs</span></div>
                    <div className="tq-missions">
                        {MISSIONS.map((m) => (
                            <Link key={m.n} href={href(m.category)} className="tq-mission-row">
                                <span className="tq-mission-n">{m.n}</span>
                                <span className="tq-mission-name">{m.name}</span>
                                <span className="tq-mission-rx">{m.rx}<small>{m.cadence}</small></span>
                                <span className="tq-mission-price">From ${m.from}/mo</span>
                                <span className="tq-mission-go"><ArrowRight size={22} /></span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section id="protocol" className="tq-section">
                    <div className="tq-section-head"><span className="tq-label">[ The protocol ]</span><span className="tq-label">12-week cycle</span></div>
                    <h2 className="tq-h2">Twelve weeks. <span className="tq-green">Measured.</span></h2>
                    <ol className="tq-timeline">
                        {TIMELINE.map((step) => (
                            <li key={step.week}>
                                <span className="tq-node" />
                                <span className="tq-week">Week {step.week}</span>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="tq-stats">
                    {STATS.map(([n, label]) => (
                        <div key={label}><Marks /><strong>{n}</strong><span>{label}</span></div>
                    ))}
                </section>

                <section id="pricing" className="tq-section">
                    <div className="tq-section-head"><span className="tq-label">[ Membership ]</span><span className="tq-label">Cancel anytime</span></div>
                    <div className="tq-tiers">
                        <div className="tq-tier">
                            <span className="tq-label">Core</span>
                            <div className="tq-tier-price">$49<small>/mo</small></div>
                            <ul>
                                <li>50+ biomarker panel, twice a year</li>
                                <li>Clinician debrief on every result</li>
                                <li>Messaging with your care team</li>
                            </ul>
                            <Split href={href()}>Start core</Split>
                        </div>
                        <div className="tq-tier tq-tier-hot">
                            <span className="tq-label">Overdrive <b>Most chosen</b></span>
                            <div className="tq-tier-price">$129<small>/mo</small></div>
                            <ul>
                                <li>Everything in Core</li>
                                <li>Hormone and peptide protocol, if appropriate</li>
                                <li>Week-6 dose check-in and week-12 retest</li>
                                <li>Priority clinician response</li>
                            </ul>
                            <Split href={href("longevity")}>Go overdrive</Split>
                        </div>
                    </div>
                    <p className="tq-fine">Medication billed separately. Compounded medications are not FDA-approved. Prescriptions require a consultation with a licensed clinician, who decides whether treatment is appropriate. Prices and results are illustrative.</p>
                </section>

                <section className="tq-final">
                    <Marks />
                    <h2 className="tq-giant tq-giant-final"><span>Your</span><span className="tq-green">move.</span></h2>
                    <Split href={href()}>Start protocol</Split>
                </section>
            </div>
        </ConceptFrame>
    );
}
