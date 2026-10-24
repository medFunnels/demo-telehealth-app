import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MedFunnelsQuestionnaire } from "@medfunnels/next/client";

import { QUESTIONNAIRE_THEME } from "@/lib/brand";
import { getProgram } from "@/lib/programs";
import { medfunnels } from "@/medfunnels.server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const program = getProgram((await params).slug);
    return { title: program ? `${program.name} visit` : "Your visit" };
}

export default async function VisitPage({ params }: Props) {
    const { slug } = await params;
    if (!getProgram(slug)) notFound();
    return (
        <div className="visit">
            {/* The questionnaire runs in a sandboxed frame served by this site (app/medfunnels/[slug]/frame).
                Answers go to this site's submit route, never to medFunnels. */}
            <MedFunnelsQuestionnaire
                questionnaire={medfunnels.questionnaire(slug)}
                redirectTo={`/start/${slug}/plans`}
                stopRedirectTo={`/start/${slug}/not-eligible`}
                theme={QUESTIONNAIRE_THEME}
                className="questionnaire"
            />
        </div>
    );
}
