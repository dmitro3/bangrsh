# Bangr – Hackathon Addendum (What to Add for Submission)

This addendum captures high-signal details typically expected by hackathon judges and sponsors that complement the core `BANGR_COMPLETE_PLAN.md`. Use this as a layer on top for the DoraHacks Prediction Markets Hackathon.

---

## 1) Judging Criteria Mapping (One-Page View)

- **Innovation/Novelty (30%)**
  - Twitter-native markets across all four public metrics; 24h auto-resolution; creator claim + rev-share loop.
- **Technical Execution (30%)**
  - BNB Chain deployment; AA gasless flow; deterministic “resolution transcript”; reentrancy-safe AMM; optimistic oracle with dispute window.
- **Product/UX (25%)**
  - Email-first, no-wallet demo path; clean create→trade→resolve loop; creator claim badge; mobile-friendly.
- **Viability/Business (15%)**
  - Clear 4–5% fee model; creator earnings; go-to-market via claim loop; cost-efficient data.

---

## 2) Chain & Infrastructure Details (BNB Chain First)

- **Network**: BNB Smart Chain Testnet (Chapel) for demo; note mainnet readiness.
- **RPC**: `https://bsc-testnet.publicnode.com` (or sponsor-provided endpoint).
- **Block time**: ~3s; finality assumptions: 2 blocks for UI confirmations.
- **Contracts (placeholders)**:
  - `MarketFactory`: `<addr_tbd_after_deploy>`
  - `PredictionMarket` (multiple instances): emitted via `MarketCreated`.
  - `Treasury`: `<addr_tbd_after_deploy>`
- **Accounts**:
  - Deployer EOA: `<eoa_tbd>`
  - AA Bundler/Paymaster: Biconomy sandbox keys; rate limits documented.
- **Faucets**: Link in README for test BNB.

---

## 3) Oracle & Dispute Protocol (Deterministic Transcript)

- **Source of truth (MVP)**: Apify actor fetch at T+24h.
- **Resolution flow**:
  1. Off-chain job fetches `like/retweet/reply/view` counts.
  2. Create a JSON transcript: `{ tweetId, metric, threshold, fetchedAtISO, value, apifyRunId, datasetId, actorVersion }`.
  3. Hash transcript (`keccak256`) and store hash on-chain in `resolve()` call; persist JSON in DB + S3/IPFS.
  4. Emit `MarketResolved(outcome, finalMetric, transcriptHash)`.
- **Optimistic window**:
  - For demo, show a 10–30 min challenge window switch (configurable) before claims UI enables.
  - Dispute path: privileged admin or designated challenger can flag → UI shows “Under Review” → manual adjudication → second transcript posted.
- **Fallbacks**:
  - If Apify fails after retries/backoff, allow manual resolution with transcript marked `manual`, plus judge-visible audit note.

---

## 4) Market Integrity & Anti-Manipulation

- **Controls**:
  - Position caps per user per market (e.g., $250 testnet cap for demo).
  - Velocity guard: freeze trading if metric jumps >Xσ within Y minutes; show “Cooling Off”.
  - Blacklist markets on deleted/suspended tweets (auto-cancel & refund policy below).
  - Bot heuristics: new accounts + max-size trades in first N minutes → flagged.
- **Policy**:
  - “Best final observed value” within window is used; if tweet deleted or author private → cancel & refund.

---

## 5) Security & Testing Plan (Judge-Facing)

- **Smart contracts**:
  - Use OpenZeppelin guards; no external calls during state mutation except transfers guarded by checks-effects-interactions.
  - Unit tests: AMM pricing invariants, fee accounting, resolve/claim gating.
  - Property tests (where time permits): conservation of value, fee bounds.
- **Backend**:
  - Idempotent jobs (resolution job keyed by marketId + windowEnd).
  - Signed admin actions with rotate-able keys.
- **Responsible Disclosure**:
  - SECURITY.md with contact and testnet-only scope.

---

## 6) Data Model & Subgraph (Concise Spec)

- **Tables**
  - `users(id, email?, wallet?, twitter_id?, smart_account)`
  - `markets(id, tweet_id, tweet_url, metric_type, threshold, creator, resolves_at, resolved, outcome, final_value, claimed_by?, verified, total_volume)`
  - `trades(id, user_id, market_id, is_yes, shares, price, tx_hash, created_at)`
  - `resolutions(id, market_id, transcript_hash, payload_json_uri, resolved_at, resolver)`
- **Subgraph events**
  - `MarketCreated(marketId, marketAddress, tweetId, metric, threshold, creator)`
  - `SharesPurchased(user, isYes, shares, cost)`
  - `SharesSold(user, isYes, shares, payout)`
  - `MarketResolved(outcome, finalMetric, transcriptHash)`

---

## 7) Public API (MVP)

```http
GET /api/markets?metric=LIKES|RETWEETS|REPLIES|VIEWS&status=live|resolved
GET /api/markets/:id
POST /api/markets  { tweetUrl, metric, threshold }
POST /api/trades   { marketId, side: "YES"|"NO", shares }
POST /api/resolve  { marketId }   // admin/cron only
POST /api/markets/:id/claim  { twitterUserId }
```

- All writes are relayed via AA for gasless user experience in demo.

---

## 8) Observability & SRE Runbook

- **Dashboards**: Markets live, pending resolution, errors by stage, Apify latency, AA success rate.
- **Alerts**: Resolution job missed SLA; dispute opened; AA paymaster low balance; RPC error rate.
- **Playbooks**: Rerun resolution; cancel/refund; rotate keys; disable a metric type temporarily.

---

## 9) Compliance & Geo Strategy (MVP Framing)

- **Positioning**: Entertainment, skill-based prediction; testnet demonstration; no custody of fiat; crypto-only test funds in demo.
- **Geo**: Geofence high-risk jurisdictions in production; for demo, present toggle in UI and note policy in README/ToS.
- **KYC**: Not required for demo; production roadmap includes optional KYB for large creators.

---

## 10) Liquidity & AMM Parameters

- **Initial YES/NO shares**: 100/100 with `k = 10,000` (demo-friendly).
- **Fees**: 4% platform + 1% creator baked into pricing helpers.
- **Seed liquidity**: Platform seeds 0.05–0.1 BNB per market (testnet); configurable.
- **Guardrails**: Prevent pool depletion; minimum share depth; slippage warnings client-side.

---

## 11) Creator Program Details

- **Claim verification**: Twitter OAuth 2.0; match `tweet.user.id` with OAuth `sub`.
- **Split logic**: Default 1% to creator; 50/50 split with market creator upon claim; 2% if author self-creates.
- **Badges**: “Verified by @handle” adds visible trust; boosts ranking.

---

## 12) Analytics & KPIs (Judge View)

- Conversion to trade from paste-URL.
- Median volume per metric type.
- Time-to-resolution success rate.
- Creator claim rate and post-claim volume lift.

---

## 13) Sponsor Alignment Callouts

- **BNB Chain**: Low fees, fast finality; clean deployment + addresses in README.
- **Biconomy (AA)**: Email-first gasless; user-ops stats screenshot in deck.
- Optional: Indexing via The Graph; monitoring via Sentry/PostHog.

---

## 14) Demo Plan & Submission Artifacts

- **Live flow**: Email login → Paste tweet → Create views market → Buy YES → Fast-forward resolve → Claim winnings → Creator claim demo.
- **Artifacts**:
  - Repo with README (setup, deploy, contract addresses).
  - 2–3 min video hitting full loop + creator claim.
  - Slide deck: 12 slides (hook, problem, solution, 4 metrics, tech, economics, demo, ask).
  - Deployed testnet URL.

---

## 15) Risk & Incident Policies (User-Facing)

- **Tweet deleted/suspended**: Market canceled, escrow refunded automatically.
- **Data discrepancy**: Dispute flag; freeze claims; re-fetch; updated transcript posted.
- **Abuse**: Rate-limit; limit market creation per account; manual moderation hooks.

---

## 16) Timeline & Roles (Hackathon Week)

- Day 1–2: Contracts + backend + Apify integration.
- Day 3–4: Frontend + AA login + trading UI.
- Day 5: Resolution jobs + creator claims + payouts.
- Day 6: Polish, responsive, analytics, backup video.
- Day 7: Final deploy, submit page, rehearsal.

---

## 17) README Inserts (Copy-Paste Ready)

- **Environment**
  - `APIFY_API_TOKEN` – Apify key
  - `BICONOMY_BUNDLER_URL`, `BICONOMY_PAYMASTER_URL`
  - `NEXTAUTH_SECRET`, `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`
  - `RPC_URL` (BNB Testnet)
- **Deploy outputs**
  - `MarketFactory`: `<addr>`
  - `Treasury`: `<addr>`
  - Subgraph: `<url>`

---

## 18) Roadmap Deltas (Post-MVP Clarity)

- Replace scraping for likes/retweets/replies with official API when budget allows; maintain Apify only for views.
- Move from optimistic transcript to oracle network (Tellor/UMA) for finality.
- Expand to Instagram/TikTok once Twitter wedge is working.

---

## 19) Appendix: Resolution Transcript Example

```json
{
  "tweetId": "1876543210987654321",
  "metric": "VIEWS",
  "threshold": 10000000,
  "fetchedAtISO": "2025-11-02T18:30:00Z",
  "value": 12345678,
  "apifyRunId": "q1w2e3r4",
  "datasetId": "abcd1234",
  "actorVersion": "v2025-10-31",
  "resolver": "0xResolverEOA...",
  "marketId": 42
}
```

Hash with `keccak256(JSON.stringify(obj))` and include in on-chain event.

---

This addendum is designed for direct inclusion in your submission page and repo to answer typical judge questions without live back-and-forth.
