import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ArrowRight, Chat, Check, Stethoscope, Truck } from "@/components/icons";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "Wren · Bloom concept",
    description: "A soft, women's-health homepage concept for Wren, a fictional menopause, peptide and longevity clinic.",
};

// Wren is a fictional brand with its own face, separate from the rest of the demo.
const sans = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-wren" });

type Form = "patch" | "pill" | "cream" | "vial" | "spray" | "drop";

const TRUST = ["Free, discreet shipping", "Prices shown upfront", "Licensed women's health clinicians", "100% online", "Unlimited provider messaging"];

const GOALS: { verb: string; noun: string; tone: string; form: Form; category: Category["id"]; tag?: string }[] = [
    { verb: "Ease", noun: "perimenopause", tone: "#d9604a", form: "patch", category: "longevity", tag: "Popular" },
    { verb: "Relieve", noun: "menopause", tone: "#c0587a", form: "cream", category: "longevity" },
    { verb: "Sleep", noun: "deeper", tone: "#5b6fb0", form: "vial", category: "longevity" },
    { verb: "Restore", noun: "energy", tone: "#c98a1c", form: "spray", category: "longevity" },
    { verb: "Reset", noun: "metabolism", tone: "#4f8a5f", form: "pill", category: "weight" },
    { verb: "Rekindle", noun: "desire", tone: "#a2508f", form: "drop", category: "sexual" },
];

const SYMPTOMS = ["Hot flashes", "Night sweats", "Brain fog", "Restless sleep", "Low libido", "Mood swings", "Joint aches", "Weight changes"];

const COMPARE = [
    "No time off work",
    "Seen by a menopause-trained clinician",
    "Unlimited messaging with your provider",
    "Dose changes without a new appointment",
    "Treatment delivered to your door",
];

function FormArt({ form, tone }: { form: Form; tone: string }) {
    return (
        <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
            <ellipse cx="60" cy="108" rx="34" ry="5" fill="rgba(27,31,29,0.08)" />
            {form === "patch" && (<>
                <rect x="22" y="26" width="76" height="72" rx="22" fill="#f6ece4" stroke="rgba(27,31,29,0.08)" />
                <circle cx="60" cy="62" r="17" fill={tone} opacity="0.85" />
            </>)}
            {form === "cream" && (<>
                <rect x="38" y="20" width="44" height="66" rx="14" fill="#fff" stroke="rgba(27,31,29,0.08)" />
                <rect x="44" y="84" width="32" height="18" rx="5" fill={tone} />
                <path d="M46 44c8-6 20-6 28 0" stroke={tone} strokeWidth="3" fill="none" strokeLinecap="round" />
            </>)}
            {form === "vial" && (<>
                <rect x="44" y="16" width="32" height="16" rx="4" fill={tone} />
                <rect x="38" y="30" width="44" height="72" rx="14" fill="rgba(255,255,255,0.85)" stroke="rgba(27,31,29,0.1)" />
                <rect x="42" y="66" width="36" height="32" rx="10" fill={tone} opacity="0.3" />
            </>)}
            {form === "spray" && (<>
                <rect x="52" y="12" width="16" height="22" rx="6" fill="#fff" stroke="rgba(27,31,29,0.1)" />
                <rect x="40" y="32" width="40" height="70" rx="16" fill={tone} opacity="0.9" />
                <rect x="46" y="54" width="28" height="22" rx="6" fill="#fff" opacity="0.8" />
            </>)}
            {form === "pill" && (<>
                <rect x="26" y="50" width="68" height="30" rx="15" transform="rotate(-24 60 65)" fill={tone} />
                <rect x="26" y="50" width="34" height="30" rx="15" transform="rotate(-24 60 65)" fill="#e6f0d2" />
            </>)}
            {form === "drop" && (<>
                <path d="M60 18c14 22 26 36 26 52a26 26 0 01-52 0c0-16 12-30 26-52z" fill={tone} opacity="0.85" />
                <ellipse cx="50" cy="70" rx="6" ry="10" fill="#fff" opacity="0.5" />
            </>)}
        </svg>
    );
}

// The hero's "hormone rhythm": pill-shaped tracks with a marker riding a gentle wave.
const RHYTHM = Array.from({ length: 27 }, (_, i) => {
    const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 0.21) * 0.5;
    return { height: 26 + Math.round(Math.abs(wave) * 92), dot: Math.round(50 + wave * 30) };
});

export default function BloomPage() {
    const concept = getConcept("bloom");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));

    return (
        <ConceptFrame concept={concept} brand="Wren">
            <div className={`wr ${sans.variable}`}>
                <div className="wr-ticker" aria-label="Why Wren">
                    <div className="wr-ticker-track">
                        {[...TRUST, ...TRUST].map((item, i) => <span key={i} aria-hidden={i >= TRUST.length}><Check size={13} /> {item}</span>)}
                    </div>
                </div>
                <header className="wr-header">
                    <div className="wr-container wr-header-row">
                        <a href="#top" className="wr-logo">wren<span>.</span></a>
                        <nav className="wr-nav" aria-label="Wren">
                            <a href="#goals">Perimenopause</a>
                            <a href="#goals">Menopause</a>
                            <a href="#feel">Peptides</a>
                            <a href="#longevity">Longevity</a>
                            <a href="#compare">Why Wren</a>
                        </nav>
                        <span className="wr-account">Account</span>
                    </div>
                </header>

                <section id="top" className="wr-container wr-hero-wrap">
                    <div className="wr-hero">
                        <div className="wr-rhythm" aria-hidden="true">
                            {RHYTHM.map((bar, i) => (
                                <span key={i} style={{ height: bar.height, animationDelay: `${i * -0.18}s` }}>
                                    <i style={{ top: `${bar.dot}%` }} />
                                </span>
                            ))}
                        </div>
                        <div className="wr-hero-copy">
                            <span className="wr-chip">Perimenopause · Menopause · Beyond</span>
                            <h1 className="wr-h1">Care that changes<br />as you do</h1>
                            <p>Hormone therapy, peptides and longevity care from clinicians who specialize in midlife women&apos;s health.</p>
                            <div className="wr-actions">
                                <Link href={href("longevity")} className="wr-button wr-button-white">See if I&apos;m eligible</Link>
                                <a href="#feel" className="wr-button wr-button-glass">Learn more</a>
                            </div>
                        </div>
                        <p className="wr-hero-fine">Hormone therapies may be prescribed off-label for perimenopausal symptoms at a clinician&apos;s discretion. Prescription required.</p>
                    </div>
                </section>

                <section id="goals" className="wr-section">
                    <div className="wr-container">
                        <h2 className="wr-h2"><span>Your hormones,</span> finally understood</h2>
                        <p className="wr-sub">Personalized care starts here.</p>
                        <div className="wr-goals">
                            {GOALS.map((goal) => (
                                <Link key={goal.noun} href={href(goal.category)} className="wr-goal">
                                    <span className="wr-goal-title">{goal.verb} <span style={{ color: goal.tone }}>{goal.noun}</span></span>
                                    {goal.tag && <span className="wr-tag">{goal.tag}</span>}
                                    <ArrowRight size={16} className="wr-goal-arrow" />
                                    <FormArt form={goal.form} tone={goal.tone} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="feel" className="wr-container wr-split">
                    <div className="wr-split-art">
                        <div className="wr-orb" aria-hidden="true" />
                        <div className="wr-forms">
                            {([["patch", "Patch", "#d9604a"], ["pill", "Pill", "#4f8a5f"], ["cream", "Cream", "#c0587a"], ["vial", "Peptide", "#5b6fb0"]] as [Form, string, string][]).map(([form, label, tone]) => (
                                <div key={label} className="wr-form"><FormArt form={form} tone={tone} /><span>{label}</span></div>
                            ))}
                        </div>
                    </div>
                    <div className="wr-split-copy">
                        <h2 className="wr-h2">What you&apos;re feeling is real. <span>It&apos;s also treatable.</span></h2>
                        <p>When estrogen and progesterone shift, everything can feel out of sync. Your Wren clinician finds the format and dose that fit your body, then adjusts as you change.</p>
                        <ul className="wr-symptoms">{SYMPTOMS.map((s) => <li key={s}>{s}</li>)}</ul>
                        <div className="wr-actions">
                            <Link href={href("longevity")} className="wr-button">Get started</Link>
                            <Link href={href("longevity")} className="wr-button wr-button-outline">Is treatment right for me?</Link>
                        </div>
                        <p className="wr-fine">Not available in all states. Hormone replacement therapies are not FDA-approved for perimenopause but may be prescribed off-label at a clinician&apos;s discretion.</p>
                    </div>
                </section>

                <section id="longevity" className="wr-section">
                    <div className="wr-container wr-mosaic-row">
                        <div className="wr-mosaic-copy">
                            <span className="wr-lime">FSA &amp; HSA eligible</span>
                            <h2 className="wr-h2">Longevity care <span>that puts you first</span></h2>
                            <ul className="wr-checks">
                                <li><Check size={14} /> Peptides like Sermorelin for sleep and recovery</li>
                                <li><Check size={14} /> NAD+ for steady, everyday energy</li>
                                <li><Check size={14} /> Labs and check-ins included, 100% online</li>
                            </ul>
                            <div className="wr-actions">
                                <Link href={href("longevity")} className="wr-button">Get started</Link>
                                <Link href={href("longevity")} className="wr-button wr-button-outline">Explore peptides</Link>
                            </div>
                            <p className="wr-fine">Compounded drug products are not FDA-approved or evaluated for safety, effectiveness or quality. Prescription products require an online consultation.</p>
                        </div>
                        <div className="wr-mosaic" aria-hidden="true">
                            <div className="wr-tile wr-tile-lime"><FormArt form="vial" tone="#4f8a5f" /><span>Sermorelin</span></div>
                            <div className="wr-tile wr-tile-sky"><strong>24/7</strong><span>Messaging with your care team</span></div>
                            <div className="wr-tile wr-tile-blush"><strong>2×</strong><span>Lab check-ins a year</span></div>
                            <div className="wr-tile wr-tile-sand"><FormArt form="spray" tone="#c98a1c" /><span>NAD+</span></div>
                        </div>
                    </div>
                </section>

                <section className="wr-section wr-steps-section">
                    <div className="wr-container">
                        <h2 className="wr-h2">Cross “figure out my hormones” <span>off your list</span></h2>
                        <div className="wr-steps">
                            {[
                                { icon: Chat, title: "Tell us how you feel", text: "A short online intake about your symptoms, cycle and history." },
                                { icon: Stethoscope, title: "Meet your clinician", text: "A menopause-trained provider reviews it and recommends a plan." },
                                { icon: Truck, title: "Care, delivered", text: "If prescribed, treatment ships free. Refills arrive before you run out." },
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="wr-step"><span><Icon size={26} /></span><h3>{title}</h3><p>{text}</p></div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="compare" className="wr-compare-section">
                    <div className="wr-container">
                        <h2 className="wr-h2 wr-center">Online care that checks <span>every box</span></h2>
                        <table className="wr-compare">
                            <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">wren.</th><th scope="col">In-person</th></tr></thead>
                            <tbody>
                                {COMPARE.map((row) => (
                                    <tr key={row}>
                                        <th scope="row">{row}</th>
                                        <td><span className="wr-yes"><Check size={14} /><span className="sr-only">Yes</span></span></td>
                                        <td><span className="wr-no"><span className="sr-only">No</span></span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="wr-container wr-cta-wrap">
                    <div className="wr-cta">
                        <h2 className="wr-h2">Feel like you again, <span>on your terms</span></h2>
                        <Link href={href("longevity")} className="wr-button wr-button-white">Start your free visit <ArrowRight size={16} /></Link>
                    </div>
                </section>
            </div>
        </ConceptFrame>
    );
}
