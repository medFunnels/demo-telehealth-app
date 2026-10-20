// npm run configure: fill medfunnels.config.json with your workspace's ID and signing keys, using the credential
// in .env.local. Compare the keys with medFunnels → Integrations → Developer guide before you commit them.
import { readFileSync, writeFileSync } from "node:fs";

import { MedFunnelsClient } from "@medfunnels/sdk";

const CONFIG = "medfunnels.config.json";

for (const name of [".env.local", ".env"]) {
    let text = "";
    try {
        text = readFileSync(name, "utf8");
    } catch {
        continue;
    }
    for (const line of text.split(/\r?\n/)) {
        const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
        if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2").replace(/\s+#.*$/, "");
    }
}

const { MEDFUNNELS_CLIENT_ID: clientId, MEDFUNNELS_CLIENT_SECRET: clientSecret, MEDFUNNELS_API } = process.env;
if (!clientId || !clientSecret || clientId.includes("…") || clientSecret.includes("…")) {
    console.error("Set MEDFUNNELS_CLIENT_ID and MEDFUNNELS_CLIENT_SECRET in .env.local (copy .env.example first).");
    console.error("Paste the real values from medFunnels → Integrations → New credential, replacing mfc_… and mfs_….");
    process.exit(1);
}
const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const api = MEDFUNNELS_API || config.api;
let connection;
try {
    connection = await new MedFunnelsClient({ baseUrl: api, clientId, clientSecret }).testConnection();
} catch (error) {
    if (error?.status === 401) {
        console.error(`${api} didn't accept this credential (HTTP 401). Check that:`);
        console.error("  - MEDFUNNELS_CLIENT_ID and MEDFUNNELS_CLIENT_SECRET are the pair shown when you created the credential, and it isn't revoked;");
        console.error(`  - the credential was created on ${api}. For another medFunnels (e.g. a dev site), set MEDFUNNELS_API in .env.local.`);
    } else {
        console.error(`Couldn't connect to ${api}: ${error?.message ?? error}`);
    }
    process.exit(1);
}
config.api = api;
config.organizationId = connection.organization.id;
config.signingKeys = Object.fromEntries(connection.signingKeys.map((key) => [key.keyId, key.publicKey]));
writeFileSync(CONFIG, `${JSON.stringify(config, null, 2)}\n`);
console.log(`Connected to ${connection.organization.name} (${config.organizationId}) at ${api}.`);
console.log(`Wrote ${CONFIG}. Scopes on this credential: ${(connection.client?.scopes ?? []).join(", ") || "unknown"}.`);
if (config.analytics && connection.client?.scopes && !connection.client?.scopes.includes("analytics:write")) {
    console.log("Note: analytics is on, but this credential lacks analytics:write. Create one with it to see funnel data.");
}
