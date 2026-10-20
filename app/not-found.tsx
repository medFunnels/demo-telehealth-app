import Link from "next/link";

import { Logo } from "../components/Logo";

export default function NotFound() {
    return (
        <div className="done not-found">
            <Logo />
            <h1>Page not found</h1>
            <p className="done-lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
            <Link className="button button-large" href="/">Back to Tidewell</Link>
        </div>
    );
}
