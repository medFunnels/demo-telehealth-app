import type { Metadata } from "next";
import Link from "next/link";

import { Stethoscope } from "../../../../components/icons";

export const metadata: Metadata = { title: "Let's find the right care" };

export default function NotEligiblePage() {
    return (
        <div className="done">
            <span className="done-mark soft" aria-hidden="true"><Stethoscope size={30} /></span>
            <h1>Online treatment isn&apos;t the right fit</h1>
            <p className="done-lead">
                Based on your answers, we recommend seeing a clinician in person. You haven&apos;t been charged. If you think this is a mistake, message our care team.
            </p>
            <Link className="button button-large" href="/">Back to Tidewell</Link>
        </div>
    );
}
