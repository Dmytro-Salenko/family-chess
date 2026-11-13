# Family Chess

A small online chess app for two people. No accounts, no clocks, no ratings.

Live: https://family-chess-salenko.umbergiraffe8.chatgpt.site

## Play

1. Start a game (white).
2. Send the invitation using **WhatsApp** or **Почта**. The first person to accept gets black.
3. Tap a piece and a highlighted destination. Games save automatically and sync every two seconds.

Return in the same browser, or bookmark the game page to keep your private player link. Player links control that player's pieces: keep them private. Invitations are single-use. Clearing browser storage without keeping your player link loses access to your seat. On iPhone, use Safari → Share → Add to Home Screen.

Legal moves, castling, en passant, promotion choices, checkmate, stalemate, repetition and other draws are checked by chess.js on the server. Moves use optimistic concurrency so duplicate or simultaneous requests cannot overwrite a game. Keys are random and stored as SHA-256 digests. There are no public game listings, ads, analytics, or third-party chess services.

## Develop

Node 22.13+ is required.

```sh
npm ci
npm run db:generate # only after schema changes
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_medical_vertigo.sql
npm run dev
```

The local preview runs on port 5173. Hosted storage uses Cloudflare D1, provisioned through Sites. Production migrations are applied by Sites when publishing. Source schema: `db/schema.ts`; request handling: `app/api/game/route.ts`; client: `app/page.tsx`.

## Hosting and limitations

The included HTTPS host avoids a new domain purchase. An existing subdomain can be attached later if DNS access is available. The host's pricing and availability apply. There are no push notifications, chess clocks, spectator seats or account recovery. Polling resumes when the page is reopened. The public landing page is accessible to anyone; game records require an unguessable player key. This small family app has no dedicated anti-abuse/rate-limit service.

The GitHub repository contains source and schema only; no saved games, player keys, mailbox data or credentials.

During a game the board fills the available screen height, with a narrow status and invitation panel on desktop and compact controls below the board on iPhone. Invitations open WhatsApp or the default mail composer; the player sends the message themselves.
