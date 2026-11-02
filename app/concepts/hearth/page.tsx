import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ArrowRight, Check } from "@/components/icons";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "Oriel · Hearth concept",
    description: "An editorial homepage concept for Oriel, a fictional hormone, peptide and longevity clinic.",
};

// Oriel is a fictional brand; its faces are separate from the rest of the demo on purpose.
const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400"], variable: "--font-oriel-serif" });
const text = Inter({ subsets: ["latin"], variable: "--font-oriel-sans" });

const CREDENTIALS = ["Board-certified clinicians", "Labs at 2,000+ locations", "U.S. licensed pharmacies", "HSA / FSA eligible"];

const INCLUDED = [
    "Hormone and metabolic panel, twice a year",
    "A clinician visit to review every result",
    "Biological age, tracked over time",
    "Personalized hormone and peptide protocol",
    "Unlimited messaging with your care team",
    "Dose changes at no extra cost",
    "Medication at pharmacy cost, never marked up",
];

const TREATMENTS: { tag: string; name: string; accent: string; text: string; from: number; category: Category["id"] }[] = [
    { tag: "Hormones", name: "Testosterone", accent: "therapy", text: "For low energy, drive and recovery, with labs before you start and at every adjustment.", from: 129, category: "longevity" },
    { tag: "Hormones", name: "Menopause", accent: "care", text: "Estradiol and progesterone, tuned with your clinician through perimenopause and beyond.", from: 99, category: "longevity" },
    { tag: "Peptides", name: "Sermorelin", accent: "", text: "A peptide that supports your body's own growth hormone, for deeper sleep and recovery.", from: 129, category: "longevity" },
    { tag: "Longevity", name: "NAD", accent: "+", text: "Injection or nasal spray to support cellular energy, focus and healthy aging.", from: 90, category: "longevity" },
];

const STORIES = [
    { tag: "Hormones", title: "Back to my old self", text: "Three years of being told my labs were “normal.” Oriel looked at the whole picture, and within two months I had my mornings back.", who: "Daniel, 48" },
    { tag: "Menopause", title: "Finally, someone listened", text: "My clinician explained every number and adjusted my plan twice in the first quarter. I sleep through the night again.", who: "Renée, 53" },
];

function Mark() {
    return (
        <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
                <linearGradient id="oriel-mark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d9784f" />
                    <stop offset="1" stopColor="#9c3f22" />
                </linearGradient>
            </defs>
            <path d="M4 30V16a12 12 0 0124 0v14z" fill="url(#oriel-mark)" />
            <path d="M8 22h16M8 26h16M10 18h12" stroke="#fcf8f1" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export default function HearthPage() {
    const concept = getConcept("hearth");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));

    return (
        <ConceptFrame concept={concept} brand="Oriel">
            <div className={`or ${display.variable} ${text.variable}`}>
                <header className="or-header">
                    <div className="or-container or-header-row">
                        <a href="#top" className="or-logo"><Mark /> Oriel</a>
                        <nav className="or-nav" aria-label="Oriel">
                            <a href="#how">How it works</a>
                            <a href="#treatments">Treatments</a>
                            <a href="#membership">Membership</a>
                            <a href="#stories">Stories</a>
                        </nav>
                        <div className="or-header-actions">
                            <span className="or-login">Log in</span>
                            <Link href={href()} className="or-button or-button-small">Start your visit</Link>
                        </div>
                    </div>
                </header>

                <section id="top" className="or-hero">
                    <div className="or-container or-hero-grid">
                        <div>
                            <h1 className="or-serif or-h1">Feel like yourself <em>for decades longer</em></h1>
                            <p className="or-lead">Hormone, peptide and longevity medicine led by clinicians and guided by your labs, not guesswork.</p>
                            <Link href={href()} className="or-button">Start your visit</Link>
                        </div>
                        <div className="or-hero-art" aria-label="Sample results">
                            <div className="or-glass or-glass-main">
                                <span className="or-glass-label">Biological age</span>
                                <strong className="or-serif">37.2</strong>
                                <span className="or-glass-sub">4.8 years younger than your calendar age</span>
                            </div>
                            <div className="or-glass-row">
                                <div className="or-glass"><span className="or-glass-label">Free testosterone</span><b>In range</b></div>
                                <div className="or-glass"><span className="or-glass-label">IGF-1</span><b>Improving</b></div>
                            </div>
                            <span className="or-sample">Sample results</span>
                        </div>
                    </div>
                </section>

                <div className="or-credentials">
                    <div className="or-container">{CREDENTIALS.map((item) => <span key={item} className="or-serif">{item}</span>)}</div>
                </div>

                <section id="membership" className="or-section">
                    <div className="or-container">
                        <div className="or-head">
                            <h2 className="or-serif or-h2">What could cost you <em><s>$12,000</s></em> is $1 a day</h2>
                            <p>Longevity care shouldn&apos;t depend on a concierge budget.</p>
                        </div>
                        <div className="or-plan">
                            <div className="or-plan-main">
                                <span className="or-tag"><Check size={14} /> HSA / FSA eligible</span>
                                <h3 className="or-serif">Oriel membership</h3>
                                <div className="or-price"><span className="or-serif">$1</span>/day</div>
                                <p>Billed annually at $365. Medication priced separately.</p>
                                <Link href={href()} className="or-button or-button-block">Join Oriel</Link>
                            </div>
                            <ul className="or-plan-list">
                                {INCLUDED.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="how" className="or-section">
                    <div className="or-container">
                        <div className="or-head">
                            <h2 className="or-serif or-h2">Better care is <em>simple</em></h2>
                        </div>
                        <div className="or-steps">
                            <div className="or-step">
                                <span className="or-step-n">01</span>
                                <h3 className="or-serif">Test your baseline</h3>
                                <p>One blood draw at a lab near you, often in under fifteen minutes.</p>
                                <div className="or-mini" aria-hidden="true">
                                    <div className="or-days">{[["Tue", 5], ["Wed", 6], ["Thu", 7], ["Fri", 8]].map(([d, n], i) => <span key={d} className={i === 2 ? "is-on" : ""}><small>{d}</small>{n}</span>)}</div>
                                    <div className="or-times">{["8:40", "9:00", "9:20"].map((t, i) => <span key={t} className={i === 1 ? "is-on" : ""}>{t}</span>)}</div>
                                </div>
                            </div>
                            <div className="or-step">
                                <span className="or-step-n">02</span>
                                <h3 className="or-serif">Meet your clinician</h3>
                                <p>A licensed provider walks you through every result and what it means for you.</p>
                                <div className="or-mini" aria-hidden="true">
                                    <svg viewBox="0 0 220 96" className="or-chart">
                                        <rect x="0" y="30" width="220" height="34" rx="6" fill="rgba(181,83,47,0.08)" />
                                        <text x="6" y="22" fontSize="8" fill="#8a7d72" letterSpacing="1">ABOVE RANGE</text>
                                        <text x="6" y="51" fontSize="8" fill="#b5532f" letterSpacing="1">IN RANGE</text>
                                        <text x="6" y="88" fontSize="8" fill="#8a7d72" letterSpacing="1">BELOW RANGE</text>
                                        <path d="M70 76 C 110 72, 130 56, 200 42" fill="none" stroke="#b5532f" strokeWidth="1.6" />
                                        <circle cx="70" cy="76" r="4" fill="#fcf8f1" stroke="#b5532f" strokeWidth="1.6" />
                                        <circle cx="200" cy="42" r="4" fill="#b5532f" />
                                    </svg>
                                </div>
                            </div>
                            <div className="or-step">
                                <span className="or-step-n">03</span>
                                <h3 className="or-serif">Follow your protocol</h3>
                                <p>If treatment is right for you, it ships to your door. Retest, then refine.</p>
                                <div className="or-mini or-protocol" aria-hidden="true">
                                    {[["Hormones", "Testosterone · weekly"], ["Peptides", "Sermorelin · nightly"], ["Longevity", "NAD+ · 3× a week"]].map(([k, v]) => (
                                        <div key={k}><span className="or-dot" /><div><b>{k}</b><small>{v}</small></div></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="or-center"><Link href={href()} className="or-button">Start your visit</Link></div>
                    </div>
                </section>

                <section id="treatments" className="or-section">
                    <div className="or-container">
                        <div className="or-head">
                            <h2 className="or-serif or-h2">Treatments, <em>prescribed with care</em></h2>
                            <p>Every prescription follows a clinician visit and your labs.</p>
                        </div>
                        <div className="or-treatments">
                            {TREATMENTS.map((item) => (
                                <Link key={item.name} href={href(item.category)} className="or-treatment">
                                    <span className="or-chip">{item.tag}</span>
                                    <h3 className="or-serif">{item.name}{item.accent && (item.accent === "+" ? <em>+</em> : <> <em>{item.accent}</em></>)}</h3>
                                    <p>{item.text}</p>
                                    <span className="or-treatment-foot">From ${item.from}/mo <ArrowRight size={16} /></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="stories" className="or-section">
                    <div className="or-container or-stories">
                        <div className="or-story-intro">
                            <h2 className="or-serif or-h2">&ldquo;I finally <em>feel like me</em> again&rdquo;</h2>
                            <p>Members come to Oriel after years of being told their labs look fine. Here&apos;s what changed when someone looked closer.</p>
                        </div>
                        {STORIES.map((story) => (
                            <figure key={story.title} className="or-story">
                                <span className="or-chip">{story.tag}</span>
                                <h3 className="or-serif">{story.title}</h3>
                                <blockquote>{story.text}</blockquote>
                                <figcaption>{story.who} · illustrative</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                <footer className="or-section or-footer-wrap">
                    <div className="or-container">
                        <div className="or-footer">
                            <div className="or-footer-top">
                                <a href="#top" className="or-logo or-logo-large"><Mark /> Oriel</a>
                                <div className="or-newsletter">
                                    <h3 className="or-serif">Get our guide to <em>aging well</em></h3>
                                    <p>Five short, clinician-written notes on hormones, sleep and recovery.</p>
                                    <div className="or-subscribe">
                                        <input type="email" placeholder="Email address" aria-label="Email address" />
                                        <button type="button">Subscribe</button>
                                    </div>
                                </div>
                            </div>
                            <div className="or-footer-cols">
                                <div><h4>Care</h4><a href="#treatments">Treatments</a><a href="#membership">Membership</a><a href="#how">How it works</a></div>
                                <div><h4>Company</h4><span>About</span><span>Clinicians</span><span>Careers</span></div>
                                <div><h4>Legal</h4><span>Privacy</span><span>Terms</span><span>Telehealth consent</span></div>
                            </div>
                        </div>
                        <p className="or-legal">
                            Compounded medications are not FDA-approved, and the FDA does not verify their safety, effectiveness or quality. Prescriptions
                            require a consultation with a licensed clinician, who decides whether treatment is appropriate. Biological age is an estimate,
                            not a diagnosis. Membership pricing and savings are illustrative.
                        </p>
                    </div>
                </footer>
            </div>
        </ConceptFrame>
    );
}
