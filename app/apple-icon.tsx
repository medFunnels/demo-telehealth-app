import { ImageResponse } from "next/og";

// The home-screen icon for iPhone and iPad: the Tidewell wave mark on the brand color.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0e3b43" }}>
                <svg width="120" height="120" viewBox="0 0 32 32">
                    <path d="M5 13.5c2.6-2.6 5.2-2.6 7.8 0s5.2 2.6 7.8 0 4.3-2 5.7-.7M5 20c2.6-2.6 5.2-2.6 7.8 0s5.2 2.6 7.8 0 4.3-2 5.7-.7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
            </div>
        ),
        size,
    );
}
