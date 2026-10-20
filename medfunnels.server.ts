import { createMedFunnels } from "@medfunnels/next/server";

import releases from "./.medfunnels/releases.json";
import config from "./medfunnels.config.json";

// Server-only. Releases come from `medfunnels pull` (run before every dev server and build) and are re-verified
// before they're served.
export const medfunnels = createMedFunnels({ config, releases });
