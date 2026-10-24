// The programs on the home page: every questionnaire `medfunnels pull` synced for this build.
import releases from "@/.medfunnels/releases.json";
import { medfunnels } from "@/medfunnels.server";

export interface Program {
    slug: string;
    /** Short name for cards, e.g. "Men's Sexual Health". */
    name: string;
    description: string;
    version: number;
    questions: number;
    minutes: number;
    /** A stable hue for this program's artwork. */
    hue: number;
}

const NOT_QUESTIONS = new Set(["statement", "end"]);

function shortName(title: string) {
    return title.replace(/\s+(questionnaire|assessment|intake|form)$/i, "").trim() || title;
}

function hueFor(slug: string) {
    let hash = 0;
    for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return [18, 160, 265, 340, 205, 95][hash % 6];
}

export function getProgram(slug: string): Program | null {
    const release = medfunnels.release(slug);
    if (!release) return null;
    const definition = release.definition as { title?: string; description?: string; pages: Array<{ questions: Array<{ kind: string }> }> };
    const questions = definition.pages.reduce((total, page) => total + page.questions.filter((question) => !NOT_QUESTIONS.has(question.kind)).length, 0);
    return {
        slug,
        name: shortName(definition.title || release.manifest.questionnaire.name || slug),
        description: definition.description || "A short online assessment, reviewed by a licensed clinician.",
        version: release.version,
        questions,
        minutes: Math.max(2, Math.ceil(questions / 6)),
        hue: hueFor(slug),
    };
}

export function listPrograms(): Program[] {
    const slugs = Object.keys((releases as { questionnaires?: Record<string, unknown> }).questionnaires ?? {}).sort();
    return slugs.map(getProgram).filter((program): program is Program => program !== null);
}
