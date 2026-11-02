import type { Metadata } from "next";
import Link from "next/link";

import { ConceptFrame } from "@/components/ConceptFrame";
import { ArrowRight, Chat, Check, Search, Stethoscope, Truck } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Bottle, Vial } from "@/components/ProductArt";
import { CATEGORIES, startHref, type Category } from "@/lib/catalog";
import { getConcept } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "Formulary · Homepage concept",
    description: "A bright, product-led homepage concept for a hormone, peptide and longevity clinic.",
};

type Art = { kind: "vial" | "bottle"; cap: string; fill: string; name: string };

const WORDS = [
    { word: "Testosterone", color: "#2f6fa3" },
    { word: "Energy", color: "#c4552b" },
    { word: "Recovery", color: "#1c7a55" },
    { word: "Menopause care", color: "#7c4f9e" },
];

const GOALS: { verb: string; noun: string; color: string; art: Art; category: Category["id"]; popular?: boolean }[] = [
    { verb: "Boost", noun: "testosterone", color: "#2f6fa3", art: { kind: "vial", cap: "#2f6fa3", fill: "#d6e5f2", name: "Testosterone" }, category: "longevity", popular: true },
    { verb: "Balance", noun: "hormones", color: "#7c4f9e", art: { kind: "bottle", cap: "#7c4f9e", fill: "#ffffff", name: "Estradiol" }, category: "longevity" },
    { verb: "Recover with", noun: "peptides", color: "#1c7a55", art: { kind: "vial", cap: "#1c7a55", fill: "#d4eee2", name: "Sermorelin" }, category: "longevity" },
    { verb: "Restore", noun: "energy", color: "#c4552b", art: { kind: "vial", cap: "#c4552b", fill: "#f6dccf", name: "NAD+" }, category: "longevity" },
    { verb: "Lose", noun: "weight", color: "#b7791f", art: { kind: "vial", cap: "#b7791f", fill: "#f7e7c6", name: "Semaglutide" }, category: "weight" },
    { verb: "Get your", noun: "spark back", color: "#0e3b43", art: { kind: "bottle", cap: "#0e3b43", fill: "#ffffff", name: "Tadalafil" }, category: "sexual" },
];

const POPULAR: { name: string; detail: string; price: number; badge?: string; art: Art; category: Category["id"] }[] = [
    { name: "Sermorelin", detail: "Peptide injection for sleep and recovery", price: 129, badge: "Popular", art: GOALS[2].art, category: "longevity" },
    { name: "NAD+", detail: "Injection or nasal spray for daily energy", price: 90, art: GOALS[3].art, category: "longevity" },
    { name: "Testosterone cypionate", detail: "Weekly injection, labs included", price: 149, badge: "Labs included", art: GOALS[0].art, category: "longevity" },
    { name: "Estradiol + progesterone", detail: "Menopause hormone therapy", price: 99, art: GOALS[1].art, category: "longevity" },
];

const STEPS = [
    { icon: Search, title: "Online intake", text: "Answer questions about your health history and goals. It takes about five minutes." },
    { icon: Stethoscope, title: "Clinician review", text: "A licensed provider reviews your answers and orders labs if you need them." },
    { icon: Truck, title: "Fast delivery", text: "If prescribed, your treatment ships free and discreetly from a U.S. pharmacy." },
    { icon: Chat, title: "Ongoing support", text: "Message your care team anytime for follow-ups, refills and dose changes." },
];

const TRUST = ["Licensed U.S. clinicians", "Free, discreet shipping", "Prices shown upfront", "U.S. compounding pharmacies", "100% online"];

function ProductArt({ art, size = 96 }: { art: Art; size?: number }) {
    return art.kind === "vial" ? (
        <svg viewBox="0 0 100 224" height={size} aria-hidden="true"><Vial cap={art.cap} liquid={art.fill} name={art.name} /></svg>
    ) : (
        <svg viewBox="0 0 140 238" height={size} aria-hidden="true"><Bottle cap={art.cap} body={art.fill} name={art.name} /></svg>
    );
}

export default function FormularyPage() {
    const concept = getConcept("formulary");
    const href = (id?: Category["id"]) => startHref(CATEGORIES.find((category) => category.id === id));

    return (
        <ConceptFrame concept={concept}>
            <div className="fm-trust" aria-label="Why Tidewell">
                <div className="container">{TRUST.map((item) => <span key={item}><Check size={14} /> {item}</span>)}</div>
            </div>
            <header className="fm-header">
                <div className="container fm-header-row">
                    <Logo />
                    <div className="fm-header-actions">
                        <span className="fm-login">Log in</span>
                        <Link href={href()} className="fm-button fm-button-small">Get started</Link>
                    </div>
                </div>
            </header>

            <section className="fm-hero">
                <div className="container">
                    <h1 className="fm-h1">
                        <span className="fm-rotator" aria-hidden="true">
                            {/* The first word repeats at the end so the loop wraps without a jump. */}
                            <span className="fm-rotator-track">
                                {[...WORDS, WORDS[0]].map((item, i) => <span key={i} style={{ color: item.color }}>{item.word}</span>)}
                            </span>
                        </span>
                        <span className="sr-only">Testosterone, energy, recovery and menopause care, </span>
                        <span>personalized to you</span>
                    </h1>
                    <p className="fm-sub">Hormones and peptides prescribed online by licensed clinicians.</p>
                    <div className="fm-goals">
                        {GOALS.map((goal) => (
                            <Link key={goal.noun} href={href(goal.category)} className="fm-goal">
                                <span className="fm-goal-title">{goal.verb} <span style={{ color: goal.color }}>{goal.noun}</span></span>
                                {goal.popular && <span className="fm-badge">Popular</span>}
                                <ProductArt art={goal.art} size={110} />
                                <ArrowRight size={16} className="fm-goal-arrow" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="fm-section">
                <div className="container">
                    <div className="fm-section-head">
                        <h2 className="fm-h2">Popular treatments</h2>
                        <Link href={href()} className="fm-button">Find my treatment</Link>
                    </div>
                    <div className="fm-products">
                        {POPULAR.map((product) => (
                            <div key={product.name} className="fm-product">
                                <div className="fm-product-top">
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p>{product.detail}</p>
                                    </div>
                                    {product.badge && <span className="fm-badge">{product.badge}</span>}
                                </div>
                                <div className="fm-product-art"><ProductArt art={product.art} size={150} /></div>
                                <span className="fm-price">From <strong>${product.price}</strong>/mo¹</span>
                                <div className="fm-product-actions">
                                    <Link href={href(product.category)} className="fm-button fm-button-small">Get started</Link>
                                    <span className="fm-button fm-button-small fm-button-ghost">Learn more</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="fm-footnotes">
                        <p>Compounded products have not been approved by the FDA. The FDA does not verify the safety, effectiveness or quality of compounded drugs.</p>
                        <p>Prescription products require an online consultation with a licensed clinician, who decides whether a prescription is appropriate.</p>
                        <p>1. Illustrative pricing for a demo. Actual price depends on product, dose and plan length.</p>
                    </div>
                </div>
            </section>

            <section className="fm-section fm-how">
                <div className="container">
                    <div className="fm-section-head">
                        <h2 className="fm-h2">How it works</h2>
                        <Link href={href()} className="fm-button">Get started today</Link>
                    </div>
                    <div className="fm-steps">
                        {STEPS.map(({ icon: Icon, title, text }) => (
                            <div key={title}>
                                <span className="fm-step-icon"><Icon size={22} /></span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ConceptFrame>
    );
}
