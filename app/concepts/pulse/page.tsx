import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ConceptTabs } from "@/components/ConceptTabs";
import { ArrowRight, Bolt, Chart, Chat, Check, Close, Heart, Pill, Shield, Sparkle, Stethoscope } from "@/components/icons";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "ember · Pulse concept",
    description: "A bright, product-led longevity homepage concept for ember, a fictional hormone and peptide clinic.",
};

// ember is a fictional brand with its own faces, separate from the rest of the demo.
const sans = Geist({ subsets: ["latin"], variable: "--font-ember" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-ember-mono" });

type Status = "optimal" | "normal" | "out";

const SYSTEMS: [string, Status][] = [
    ["Summary", "optimal"], ["Hormones", "out"], ["Heart", "optimal"], ["Metabolic", "normal"],
    ["Thyroid", "optimal"], ["Recovery", "normal"], ["Inflammation", "out"], ["Liver", "optimal"], ["Energy", "normal"],
];

const MARKERS: { name: string; value: string; status: Status; trend: number[] }[] = [
    { name: "Free testosterone", value: "6.1 ng/dL", status: "out", trend: [30, 34, 40, 62] },
    { name: "Estradiol", value: "28 pg/mL", status: "optimal", trend: [52, 55, 58, 60] },
    { name: "IGF-1", value: "142 ng/mL", status: "normal", trend: [40, 44, 50, 56] },
    { name: "SHBG", value: "38 nmol/L", status: "optimal", trend: [58, 56, 60, 61] },
    { name: "hs-CRP", value: "2.4 mg/L", status: "out", trend: [70, 64, 50, 44] },
];

const PANEL = ["Male hormones", "Female hormones", "Thyroid", "Metabolic", "Heart", "Inflammation", "Recovery", "Liver", "Kidney", "Nutrients", "Blood", "Aging"];

const INCLUDED: { title: string; items: { icon: typeof Bolt; name: string; text: string }[] }[] = [
    { title: "Diagnostics & data", items: [
        { icon: Heart, name: "50+ biomarker panel", text: "Hormones, metabolism, inflammation and more" },
        { icon: Chart, name: "Your health dashboard", text: "Every result, tracked and explained" },
        { icon: Sparkle, name: "Biological age", text: "Retested every six months" },
    ] },
    { title: "Guidance", items: [
        { icon: Stethoscope, name: "Clinician review", text: "A 1:1 visit to walk through your labs" },
        { icon: Bolt, name: "Personal protocol", text: "Updates as your numbers change" },
        { icon: Chat, name: "Care concierge", text: "Message your team any time" },
    ] },
    { title: "Treatment", items: [
        { icon: Pill, name: "Hormone therapy", text: "TRT, estradiol and progesterone" },
        { icon: Sparkle, name: "Peptides", text: "Sermorelin and more, if appropriate" },
        { icon: Shield, name: "Longevity care", text: "NAD+ and metabolic support" },
    ] },
];

const COMPARE: [string, string | boolean, string | boolean][] = [
    ["Biomarkers tested", "50+", "12 to 20"],
    ["Follow-up testing", true, true],
    ["Hormone panel included", true, false],
    ["Biological age", true, false],
    ["Clinician who reads every result", true, false],
    ["Hormone and peptide prescriptions", true, false],
    ["Unlimited messaging with your care team", true, false],
];

const FAQ: Array<[string, string]> = [
    ["What does membership include?", "Two 50+ biomarker panels a year, a clinician visit to review each one, your dashboard and biological age, a personal protocol and unlimited messaging. Prescriptions are billed separately at pharmacy cost."],
    ["Which treatments can ember prescribe?", "Depending on your labs and history, your clinician may prescribe testosterone therapy, estradiol and progesterone, peptides such as Sermorelin, NAD+ or metabolic support. Nothing is prescribed without a visit."],
    ["Where do I get my blood drawn?", "At a partner lab near you, usually in about fifteen minutes, or with an at-home phlebotomist for an extra fee."],
    ["What if I already feel healthy?", "That's the best time to set a baseline. Many hormone and metabolic changes show up in labs years before you feel them."],
];

const FOOTER = [
    { title: "ember", links: ["How it works", "What's included", "Membership"] },
    { title: "Treatments", links: ["Testosterone", "Menopause care", "Peptides", "NAD+"] },
    { title: "Company", links: ["Our why", "Clinicians", "Careers"] },
    { title: "Legal", links: ["Terms", "Privacy", "Telehealth consent"] },
];

const dot = (status: Status) => `ep-status ep-status-${status}`;

function Spark({ trend, status }: { trend: number[]; status: Status }) {
    const points = trend.map((y, i) => `${8 + i * 26},${76 - y}`).join(" ");
    return (
        <svg viewBox="0 0 96 64" className="ep-spark" aria-hidden="true">
            <rect x="0" y="16" width="96" height="22" rx="4" className="ep-spark-band" />
            <polyline points={points} fill="none" className="ep-spark-line" />
            {trend.map((y, i) => <circle key={i} cx={8 + i * 26} cy={76 - y} r="3.2" className={`ep-spark-dot ep-fill-${i === trend.length - 1 ? status : "normal"}`} />)}
        </svg>
    );
}

function Twin() {
    return (
        <div className="ep-device" aria-label="Sample health dashboard">
            <div className="ep-screen ep-twin">
                <div className="ep-screen-bar"><b>ember</b><span>Home</span><span className="is-on">Data</span><span>Protocol</span><span>Care</span></div>
                <ul className="ep-systems">
                    {SYSTEMS.map(([name, status], i) => <li key={name} className={i === 1 ? "is-on" : ""}><span className={dot(status)} />{name}</li>)}
                </ul>
                <div className="ep-figure">
                    <svg viewBox="0 0 120 260" aria-hidden="true">
                        <defs>
                            <radialGradient id="ep-glow"><stop offset="0" stopColor="#ff6a2b" stopOpacity="0.85" /><stop offset="1" stopColor="#ff6a2b" stopOpacity="0" /></radialGradient>
                            <linearGradient id="ep-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f2f0" /><stop offset="1" stopColor="#dcdcd8" /></linearGradient>
                        </defs>
                        <circle cx="60" cy="26" r="16" fill="url(#ep-body)" />
                        <path d="M38 50h44c10 0 16 8 17 18l6 62c1 6-8 8-10 2l-8-50-2 60 4 92c0 7-10 8-12 1l-11-86h-12l-11 86c-2 7-12 6-12-1l4-92-2-60-8 50c-2 6-11 4-10-2l6-62c1-10 7-18 17-18z" fill="url(#ep-body)" />
                        <ellipse cx="60" cy="150" rx="30" ry="22" fill="url(#ep-glow)" />
                    </svg>
                </div>
                <div className="ep-detail">
                    <div className="ep-detail-head"><b>Hormones</b><span className="ep-pill ep-pill-out">2 to review</span></div>
                    {MARKERS.slice(0, 4).map((marker) => (
                        <div key={marker.name} className="ep-row">
                            <div><b>{marker.name}</b><small><span className={dot(marker.status)} />{marker.status === "out" ? "Out of range" : marker.status === "optimal" ? "Optimal" : "Normal"} · {marker.value}</small></div>
                            <Spark trend={marker.trend} status={marker.status} />
                        </div>
                    ))}
                </div>
            </div>
            <span className="ep-sample">Sample data</span>
        </div>
    );
}

export default function PulsePage() {
    const concept = getConcept("pulse");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));

    const tabs = [
        { label: "50+ Labs", title: "One draw. Your whole picture.", text: "Hormones, thyroid, metabolism, inflammation and more, from a single fifteen-minute lab visit.", screen: (
            <div className="ep-screen ep-grid-screen">{PANEL.slice(0, 9).map((name, i) => <div key={name}><span className={dot(i % 4 === 1 ? "out" : i % 3 === 0 ? "optimal" : "normal")} />{name}<small>{4 + ((i * 3) % 7)} markers</small></div>)}</div>
        ) },
        { label: "Dashboard", title: "Every result, in one place", text: "Your numbers, trends and what changed since last time, explained in plain language.", screen: (
            <div className="ep-screen ep-list-screen">{MARKERS.map((m) => <div key={m.name} className="ep-row"><div><b>{m.name}</b><small><span className={dot(m.status)} />{m.value}</small></div><Spark trend={m.trend} status={m.status} /></div>)}</div>
        ) },
        { label: "Biological age", title: "How fast you're really aging", text: "An estimate from your labs, retested every six months so you can see your protocol working.", screen: (
            <div className="ep-screen ep-age-screen"><span className="ep-mono">Biological age</span><strong>36.4</strong><p><b>5.1 years younger</b> than your calendar age</p>
                <svg viewBox="0 0 300 80" aria-hidden="true"><path d="M0 60 C 60 58, 90 40, 150 36 S 240 20, 300 14" fill="none" stroke="#ff5a1f" strokeWidth="2.5" /><path d="M0 60 C 60 58, 90 40, 150 36 S 240 20, 300 14 V80 H0z" fill="rgba(255,90,31,0.08)" /></svg></div>
        ) },
        { label: "Protocol", title: "A plan built on your numbers", text: "If treatment fits, your clinician prescribes and adjusts at each retest. Lifestyle steps come with it.", screen: (
            <div className="ep-screen ep-list-screen">{[["Testosterone cypionate", "Weekly · targets free T", "Rx"], ["Sermorelin", "Nightly · supports IGF-1", "Rx"], ["NAD+", "3× a week · energy", "Rx"], ["Walk after meals", "Daily · metabolic", "Habit"], ["Omega-3", "Daily · hs-CRP", "Supplement"]].map(([n, d, t]) => <div key={n} className="ep-row"><div><b>{n}</b><small>{d}</small></div><span className="ep-pill">{t}</span></div>)}</div>
        ) },
        { label: "Concierge", title: "A care team on call", text: "Questions about a result or a dose? Message your team and hear back the same day.", screen: (
            <div className="ep-screen ep-chat-screen"><p className="ep-bubble">My energy dipped this week. Should I change anything?</p><p className="ep-bubble ep-bubble-them">Thanks for flagging it. Your last panel looks steady, so let&apos;s keep your dose and recheck free T at week 12. Sleep has a big effect here too.</p><p className="ep-bubble">Makes sense, thank you!</p></div>
        ) },
    ].map((tab) => ({
        label: tab.label,
        panel: (
            <div className="ep-tab">
                <h3>{tab.title}</h3>
                <p>{tab.text}</p>
                <div className="ep-device ep-device-wide">{tab.screen}<span className="ep-sample">Sample data</span></div>
            </div>
        ),
    }));

    return (
        <ConceptFrame concept={concept} brand="ember">
            <div className={`ep ${sans.variable} ${mono.variable}`}>
                <div className="ep-nav-wrap">
                    <header className="ep-nav">
                        <nav aria-label="ember">
                            <a href="#how">How it works</a>
                            <a href="#included">What&apos;s included</a>
                            <a href="#faq">FAQ</a>
                        </nav>
                        <a href="#top" className="ep-wordmark">ember</a>
                        <div className="ep-nav-actions">
                            <span>Log in</span>
                            <Link href={href()} className="ep-button ep-button-small">Start testing</Link>
                        </div>
                    </header>
                </div>

                <section id="top" className="ep-hero">
                    <div className="ep-container ep-hero-grid">
                        <div>
                            <span className="ep-mono">Hormones · Peptides · Longevity</span>
                            <h1 className="ep-h1">Your body,<br />decoded.</h1>
                            <p className="ep-lead">50+ biomarkers twice a year, a clinician who reads every one, and a hormone and peptide protocol built on your numbers.</p>
                            <p className="ep-price-line">All for $399 a year.</p>
                            <Link href={href()} className="ep-button">Start testing <ArrowRight size={16} /></Link>
                        </div>
                        <Twin />
                    </div>
                </section>

                <div className="ep-rule" aria-hidden="true" />

                <section id="how" className="ep-section">
                    <div className="ep-container">
                        <div className="ep-head">
                            <span className="ep-mono">How it works</span>
                            <h2 className="ep-h2">Clarity at every step</h2>
                        </div>
                        <ConceptTabs tabs={tabs} className="ep-tabs" />
                    </div>
                </section>

                <section className="ep-section">
                    <div className="ep-container">
                        <div className="ep-lab">
                            <h2 className="ep-h2">The ember lab panel</h2>
                            <p>Chosen by our clinical team to show how your hormones, metabolism and recovery are really doing.</p>
                            <ul className="ep-chips">{PANEL.map((name) => <li key={name}>{name}</li>)}</ul>
                            <div className="ep-barcode" aria-hidden="true" />
                        </div>
                    </div>
                </section>

                <section id="pricing" className="ep-section">
                    <div className="ep-container ep-pricing">
                        <div className="ep-card-stage">
                            <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
                                <filter id="ep-marble"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="3" seed="7" /><feDisplacementMap in="SourceGraphic" scale="70" /></filter>
                            </svg>
                            <div className="ep-member-card">
                                <div className="ep-marble" aria-hidden="true" />
                                <b>ember</b>
                                <span>membership</span>
                                <div className="ep-member-price"><strong>$33</strong>/month<small>Billed annually at $399</small></div>
                            </div>
                        </div>
                        <div>
                            <span className="ep-muted">What could cost you $15,000 is $399</span>
                            <h2 className="ep-h2">ember membership</h2>
                            <p className="ep-lead">Two full panels a year, clinician reviews and a protocol that evolves with you. Prescriptions at pharmacy cost.</p>
                            <ul className="ep-checks">
                                {["Two 50+ biomarker panels a year", "1:1 clinician review of every result", "Biological age, tracked over time", "Hormone and peptide protocol, if appropriate"].map((item) => <li key={item}><Check size={16} /> {item}</li>)}
                            </ul>
                            <div className="ep-big-price"><sup>$</sup>33<span>/month · billed annually</span></div>
                            <Link href={href()} className="ep-button ep-button-block">Start testing <ArrowRight size={16} /></Link>
                            <div className="ep-assure"><span><Check size={14} /> Cancel anytime</span><span><Check size={14} /> HSA/FSA eligible</span><span><Check size={14} /> Results within a week</span></div>
                        </div>
                    </div>
                </section>

                <section id="included" className="ep-section">
                    <div className="ep-container">
                        <div className="ep-head">
                            <h2 className="ep-h2">What&apos;s included in your membership</h2>
                            <p>Testing, a plan that actually works, and a team to keep it on track.</p>
                        </div>
                        <div className="ep-included">
                            {INCLUDED.map((col) => (
                                <div key={col.title}>
                                    <h3>{col.title}</h3>
                                    {col.items.map(({ icon: Icon, name, text }) => (
                                        <div key={name} className="ep-inc-item"><span><Icon size={16} /></span><div><b>{name}</b><small>{text}</small></div></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="ep-section">
                    <div className="ep-container">
                        <table className="ep-compare">
                            <thead><tr><th scope="col">Compare</th><th scope="col" className="ep-compare-us">ember</th><th scope="col">Typical annual physical</th></tr></thead>
                            <tbody>
                                {COMPARE.map(([row, us, them]) => (
                                    <tr key={row}>
                                        <th scope="row">{row}</th>
                                        {[us, them].map((cell, i) => (
                                            <td key={i}>{typeof cell === "string" ? cell : cell
                                                ? <span className="ep-yes"><Check size={16} /><span className="sr-only">Yes</span></span>
                                                : <span className="ep-no"><Close size={15} /><span className="sr-only">No</span></span>}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="faq" className="ep-section">
                    <div className="ep-container ep-faq">
                        <h2 className="ep-h3">Membership<sup>{FAQ.length}</sup></h2>
                        <div>
                            {FAQ.map(([q, a], i) => (
                                <details key={q} open={i === 0}>
                                    <summary>{q}<span aria-hidden="true" /></summary>
                                    <p>{a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="ep-footer">
                    <div className="ep-container">
                        <div className="ep-giant" aria-hidden="true">ember</div>
                        <div className="ep-footer-cols">
                            {FOOTER.map(({ title, links }) => (
                                <div key={title}><h4>{title}</h4>{links.map((link) => <span key={link}>{link}</span>)}</div>
                            ))}
                        </div>
                        <p className="ep-legal">Compounded medications are not FDA-approved. Biological age is an estimate, not a diagnosis. Prescriptions require a consultation with a licensed clinician. Prices and savings are illustrative.</p>
                    </div>
                </footer>
            </div>
        </ConceptFrame>
    );
}
