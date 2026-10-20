import Link from "next/link";

import { ArrowRight, Bolt, Chat, Check, Heart, Lock, Scale, Shield, Star, Stethoscope, Truck } from "../../components/icons";
import { ProductScene } from "../../components/ProductArt";
import { CATEGORIES, startHref } from "../../lib/catalog";

const TRUST = ["Licensed U.S. clinicians", "100% online", "U.S.-licensed pharmacies", "Free, discreet shipping", "Provider review in 24 hours", "HSA/FSA eligible"];

const ICONS = { sexual: Heart, weight: Scale, longevity: Bolt } as const;

const REVIEWS = [
    { name: "Marcus T.", place: "Denver, CO", text: "The whole visit took me five minutes on my phone. A clinician messaged me the same afternoon, and my order arrived two days later.", color: "#c4552b" },
    { name: "Priya S.", place: "Austin, TX", text: "No waiting room, no awkward conversation. The questions were clear and the follow-up from my provider was genuinely helpful.", color: "#7c6bc4" },
    { name: "Daniel R.", place: "Columbus, OH", text: "Pricing was exactly what the site said. When my dose changed, the price didn't. That's rare.", color: "#0e3b43" },
];

const WHY = [
    { icon: Stethoscope, title: "Real clinicians", text: "Every visit is reviewed by a licensed provider in your state." },
    { icon: Chat, title: "Messaging, anytime", text: "Questions about your plan? Your care team is a message away." },
    { icon: Truck, title: "Free, discreet delivery", text: "Plain packaging, shipped from a U.S.-licensed pharmacy." },
    { icon: Lock, title: "Private by design", text: "Your answers go only to your care team." },
];

const FAQ: Array<[string, string]> = [
    ["How does Tidewell work?", "Answer a short online visit about your health. A licensed clinician reviews it, usually within 24 hours. If treatment is right for you, it ships free from a U.S.-licensed pharmacy."],
    ["How much does it cost?", "Your visit is free. You only pay if a clinician prescribes treatment, with prices shown upfront and no hidden fees."],
    ["Do I need insurance?", "No. Plans are paid directly, so there are no claims or surprise bills. Most HSA and FSA cards are accepted."],
    ["What if I'm not approved?", "You aren't charged. Your clinician will explain why and may suggest other options or an in-person visit."],
    ["Can I cancel anytime?", "Yes. Pause or cancel your plan from your account at any time."],
    ["Is my information private?", "Yes. Your answers are shared only with your care team and used only for your care."],
];

export default function HomePage() {
    return (
        <>
            <div className="trust-strip" aria-label="Why Tidewell">
                <div className="trust-track">
                    {[...TRUST, ...TRUST].map((item, index) => (
                        <span key={index} aria-hidden={index >= TRUST.length}><Check size={15} /> {item}</span>
                    ))}
                </div>
            </div>

            <section className="hero">
                <div className="container hero-grid">
                    <div className="hero-copy">
                        <h1>Online care that fits your life.</h1>
                        <p className="lead">Connect with a licensed clinician from home. Personalized treatment, shipped free to your door.</p>
                        <div className="actions">
                            <Link className="button button-large" href={startHref()}>See if you qualify <ArrowRight size={18} /></Link>
                            <Link className="button button-ghost button-large" href="#treatments">Browse treatments</Link>
                        </div>
                        <div className="rating">
                            <div className="avatars" aria-hidden="true">
                                {["#c4552b", "#7c6bc4", "#0e3b43", "#c9862e"].map((color, index) => <span key={color} style={{ background: color }}>{"MPDA"[index]}</span>)}
                            </div>
                            <div>
                                <div className="stars" aria-label="Rated 4.8 out of 5">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={15} />)}<strong>4.8</strong></div>
                                <span>from 2,400+ patients</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-art">
                        <ProductScene kind="hero" />
                        <div className="hero-chip"><Truck size={18} /> Free 2-day shipping</div>
                    </div>
                </div>
            </section>

            <section id="treatments" className="section">
                <div className="container">
                    <div className="section-head">
                        <h2>Find your treatment</h2>
                        <p className="lead">Prescribed online by licensed clinicians. Prices shown upfront.</p>
                    </div>
                    <div className="category-grid">
                        {CATEGORIES.map((category) => {
                            const Icon = ICONS[category.id];
                            return (
                                <Link key={category.id} id={category.id} href={startHref(category)} className={`category-card tint-${category.tint}`}>
                                    <div className="category-copy">
                                        <span className="category-icon"><Icon size={18} /></span>
                                        <h3>{category.name}</h3>
                                        <p>{category.tagline}</p>
                                        <span className="from">From <strong>${category.from}</strong>/month</span>
                                    </div>
                                    <ProductScene kind={category.id} />
                                    <span className="category-cta">Get started <ArrowRight size={16} /></span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="section section-soft">
                <div className="container">
                    <div className="section-head">
                        <h2>Popular treatments</h2>
                        <p className="lead">Generic and compounded options, dosed for you by a clinician.</p>
                    </div>
                    <div className="product-grid">
                        {CATEGORIES.flatMap((category) => category.treatments.map((treatment) => (
                            <article key={treatment.name} className="product-card">
                                <div className="product-top">
                                    <span className="rx">Rx</span>
                                    {treatment.badge ? <span className="badge">{treatment.badge}</span> : null}
                                </div>
                                <span className="product-category">{category.name}</span>
                                <h3>{treatment.name}</h3>
                                <p>{treatment.detail}</p>
                                <div className="product-bottom">
                                    <span className="price">From <strong>${treatment.price}</strong>/mo</span>
                                    <Link href={startHref(category)} className="button button-small">Get started</Link>
                                </div>
                            </article>
                        )))}
                    </div>
                </div>
            </section>

            <section className="stats-band">
                <div className="container stats-grid">
                    <div><strong>4.8/5</strong><span>Average patient rating</span></div>
                    <div><strong>&lt;24 hrs</strong><span>Typical provider review</span></div>
                    <div><strong>$0</strong><span>Visit fee</span></div>
                    <div><strong>50</strong><span>States served</span></div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head center">
                        <h2>Results that speak for themselves</h2>
                        <p className="lead">What patients say about care with Tidewell.</p>
                    </div>
                    <div className="review-grid">
                        {REVIEWS.map((review) => (
                            <figure key={review.name} className="review">
                                <div className="stars">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={16} />)}</div>
                                <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
                                <figcaption>
                                    <span className="avatar" style={{ background: review.color }}>{review.name[0]}</span>
                                    <span><strong>{review.name}</strong>{review.place} · Verified patient</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <p className="fineprint center">Illustrative reviews for a fictional clinic. Individual results vary.</p>
                </div>
            </section>

            <section className="section section-soft">
                <div className="container why-grid">
                    <div className="section-head">
                        <h2>Care that knows your name</h2>
                        <p className="lead">Treatment is only part of it. Tidewell stays with you, from your first visit to every refill.</p>
                        <div className="actions">
                            <Link className="button button-large" href={startHref()}>Start your free visit <ArrowRight size={18} /></Link>
                        </div>
                    </div>
                    <div className="why-list">
                        {WHY.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="why">
                                <span className="why-icon"><Icon size={20} /></span>
                                <div><h3>{title}</h3><p>{text}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="section">
                <div className="container faq-grid">
                    <div className="section-head">
                        <h2>Your questions, answered</h2>
                        <p className="lead">Can&apos;t find what you need? Our care team is here to help.</p>
                    </div>
                    <div className="faq">
                        {FAQ.map(([question, answer]) => (
                            <details key={question}>
                                <summary>{question}<span className="faq-icon" aria-hidden="true" /></summary>
                                <p>{answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="container cta-inner">
                    <Shield size={28} />
                    <h2>Ready to feel like yourself again?</h2>
                    <p>Your visit takes about 5 minutes. No insurance needed · HSA/FSA eligible · Cancel anytime.</p>
                    <Link className="button button-light button-large" href={startHref()}>See if you qualify <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    );
}
