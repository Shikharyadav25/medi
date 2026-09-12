# MEDI BUD — Your Health, Understood

A runnable Expo + Firebase MVP for an Indian-first, privacy-conscious AI health companion. The app includes a polished first-run flow, Firebase email authentication, personalized dashboard, water/mood/workout tracking surface, meal-image selection, contextual AI chat, community UI, profile/family privacy architecture, and a secure Gemini Cloud Functions layer.

> **Safety:** Medi Bud is not a medical device or doctor. AI replies always carry this notice: **“AI can make mistakes, so always double check important health information with a qualified healthcare professional.”** Emergency-pattern messages are intercepted server-side and directed to urgent human help.

## Quick start

```bash
cp .env.example .env
npm install
npm run start
```

Open the QR code with Expo Go (or press `i`/`a`). Without Firebase configuration, **Explore the secure demo** provides a clearly labeled local demo journey; AI and production persistence intentionally remain unavailable rather than pretending to be live.

## Firebase + Gemini setup

1. Create a Firebase project and enable **Email/Password** authentication, Firestore, Storage, and Cloud Functions.
2. Copy the Firebase *web app* configuration into `.env` using the `EXPO_PUBLIC_FIREBASE_*` variables in `.env.example`. Those identifiers are not secrets; Rules enforce access.
3. Install the Firebase CLI, authenticate, select the project, then install function dependencies:

```bash
cd functions && npm install && cd ..
firebase use --add
firebase functions:secrets:set GEMINI_API_KEY
firebase deploy --only firestore:rules,firestore:indexes,storage,functions
```

4. Enable Firebase App Check before production. Callable AI endpoints have `enforceAppCheck: true`; configure an appropriate Expo App Check provider before release.

### Required environment variables

| Variable | Location | Purpose |
| --- | --- | --- |
| `EXPO_PUBLIC_FIREBASE_API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID` | Expo `.env` | Firebase client initialization |
| `EXPO_PUBLIC_FUNCTIONS_REGION` | Expo `.env` | Callable Functions region (defaults to `asia-south1`) |
| `GEMINI_API_KEY` | **Firebase Secret Manager only** | Server-side Gemini access |

Never set `GEMINI_API_KEY` in Expo variables or commit it. The client only calls authenticated Callable Functions.

## Architecture

- `app/`: Expo Router route groups for auth, onboarding, and five main tabs.
- `services/firebase/`: Firebase initialization and owner-scoped repository functions.
- `services/api/ai.ts`: client boundary for secure callable endpoints; no model key exists in the app.
- `functions/src/index.ts`: input validation, App Check/auth enforcement, urgent symptom safety interceptor, Gemini service, and the **Health Context Engine**.
- `functions/src/index.ts#context`: combines Firestore profile, recent meals/hydration, reports, medications, plans, and scoped document retrieval before each AI request.
- `users/{uid}/vectorChunks`: a pluggable vector/RAG store interface. The MVP uses owner-filtered retrieval fallback; replace `retrieve()` with Firestore vector search / Vertex AI embeddings in production while retaining metadata filters `userId`, `documentId`, category, and date.

## Report pipeline

Upload originals only to `users/{uid}/reports/{reportId}` (PDF/JPG/PNG, size-limited by Storage Rules). A production processor should: validate type/size → OCR/Gemini document extraction → write structured `users/{uid}/reports/{reportId}` metadata → chunk text → embed and save owner-filtered `vectorChunks` → expose source IDs in Health AI. The schema and retrieval boundary are included; connect a Cloud Storage trigger/OCR provider appropriate to your compliance requirements before enabling report uploads.

## Data and security

Firestore keeps structured facts (profiles, meals, water, reports, medications, plans, family, conversations). Semantic text belongs in `vectorChunks`, never all health facts. `firestore.rules` uses owner checks for all private subcollections. Family links are explicit permission documents; they do **not** automatically grant health-data access. Community posts are intentionally limited to their author and include reporting hooks. Validate and sanitize community body text in a moderation Cloud Function before a public launch.

## Known MVP limitations / next work

- Report upload and OCR/vector indexing use the documented pipeline boundary but need your chosen OCR, embedding/vector provider, and Storage trigger connected.
- Voice transcription, PDF export, maps/location, notifications, full Hindi copy, and durable community reactions are planned extension points, not enabled in this initial secure MVP.
- The demo uses local AsyncStorage only and visibly does not simulate live AI or medical record processing.
- Complete penetration testing, consent/audit workflows, retention policy, moderation service, and clinical/compliance review are required before handling real health data.
