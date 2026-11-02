import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { CONCEPTS } from "@/lib/concepts";

export const metadata: Metadata = {
    title: "Concepts",
    description: "Homepage concepts for the Tidewell demo telehealth site.",
};

export default function ConceptsPage() {
    return (
        <section className="section concepts">
            <div className="container">
                <div className="section-head">
                    <span className="product-category">Tidewell demo</span>
                    <h1>Concepts</h1>
                    <p className="lead">
                        Three homepages for a peptide, hormone and longevity clinic, each based on patterns from telehealth sites on Mobbin.
                        Same fictional clinic and intake flow, three different first impressions.
                    </p>
                </div>
                <div className="concept-grid">
                    {CONCEPTS.map((concept) => (
                        <div key={concept.slug} className={`concept-card tint-${concept.tint}`}>
                            <span className="concept-number">{concept.number}</span>
                            <h3>{concept.name}</h3>
                            <p>{concept.summary}</p>
                            <ul className="concept-refs">
                                {concept.references.map((ref) => (
                                    <li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer"><strong>{ref.site}</strong> · {ref.pattern}</a></li>
                                ))}
                            </ul>
                            <Link href={concept.href} className="concept-status">View homepage <ArrowRight size={16} /></Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
