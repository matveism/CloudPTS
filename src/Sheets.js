const CSV_URL = "PASTE_YOUR_PUBLISHED_SHEET_CSV_URL_HERE";

/*
Required CSV headers (row1):
user_id,email,password_hash,pts_balance,reward_status,last_claim_at,role,api_key,offer_pts,ar,cashout_method,cashout_status
*/

function parseCSV(text) {
  const lines = text.trim().split("\n").filter(l => l.length);
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const cols = line.split(",").map(c => c.trim());
    const row = {};
    headers.forEach((h, i) => row[h] = cols[i] ?? "");
    // normalize types + defaults
    row.user_id = row.user_id || "";
    row.email = row.email || "";
    row.password_hash = row.password_hash || "";
    row.pts_balance = Number(row.pts_balance || 0);
    row.reward_status = row.reward_status || "PENDING";
    row.last_claim_at = row.last_claim_at || "";
    row.role = row.role || "user";
    row.api_key = row.api_key || "";
    row.offer_pts = Number(row.offer_pts || 0);
    row.ar = Number(row.ar || 0); // optional: will be recalculated on the fly
    row.cashout_method = row.cashout_method || "";
    row.cashout_status = row.cashout_status || "";
    return row;
  });
}

export async function fetchSheet() {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error("csvfetchfailed");
  const text = await res.text();
  return parseCSV(text);
}

// NOTE: This app reads the CSV and updates client-side state only.
// To persist changes, add an Apps Script Web App or backend to write updates.
