/*
# Update launcher data — single server, version 2, clean media

## Overview
Removes fake/test servers and keeps a single real server placeholder.
Clears media gallery (empty state in UI). Updates launcher version to 2.
Keeps fake news for display. Clears fake players and events for clean state.

## Changes
1. `servers` — DELETE all existing rows, INSERT a single placeholder server.
   The server uses the real project domain. Online status, player count, and
   ping are set to offline/zero as a placeholder — the frontend can later
   connect a real API or file to populate live status.
2. `media` — DELETE all rows so the Media page shows its empty state.
3. `players` — DELETE all rows so the leaderboard shows its empty state.
4. `events` — DELETE all rows so events shows its empty state.
5. `launcher_stats` — UPDATE version-related stats and online count to
   reflect a single server with no live data yet.

## Security
No security changes — existing RLS policies remain in place.

## Important Notes
1. This migration is safe to re-run.
2. The single server row is a placeholder — connect a real status API later.
*/
