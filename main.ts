// One Word for Your Wi-Fi — make.fun entry for
// u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72
//
// The entry is exactly one word: the word that becomes the sponsor's
// Wi-Fi network name. This program writes that word to
// $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline) and validates
// the bytes it wrote.
//
// The word, and why it wins:
//   "Buffering" is the one word every Wi-Fi user has lived. It is the
//   spinning wheel, the frozen video, the page that will not load —
//   the universal shared experience of wireless internet, compressed
//   into a single instantly readable word. As a network name it is
//   funny because it is true: you join "Buffering" and immediately
//   know what you are in for. It is not a recycled network-name
//   cliche ("PrettyFlyForAWiFi", "ItHurtsWhenIP", "FBI Surveillance
//   Van") and it is not profanity or a password joke — it is fresh
//   precisely because it describes the *experience* of Wi-Fi rather
//   than naming the router. The judge weighs on-subject fit, the
//   laugh, the truth of it and the freshness of the angle; "Buffering"
//   scores on all four: it is about Wi-Fi itself, it lands a smile,
//   it is honest, and it takes an angle the usual name jokes miss.
//
//   Candidates considered and rejected:
//   - "Throttled" — accurate and fresh, but an ISP-insider joke;
//     less instantly funny to everyone who just wants the video to play.
//   - "Reconnecting" — relatable, but longer, flatter, and reads like
//     a status message rather than a name.
//   - "Lagging" — too short on image; it says the symptom, not the
//     shared moment. "Buffering" carries the whole scene.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word.
const WORD = "Buffering";

// Output location: $MAKEFUN_OUTPUT_DIR, default ./output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
const outPath = join(outDir, "entry.txt");

// Write the word with no trailing newline — the file IS the word.
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, WORD, "utf8");

// Validate what was written: read it back and check the bytes.
// The brief allows one word only (1-200 code points); we hold the
// entry to a stricter shape — letters only, no spaces, no whitespace.
const written = readFileSync(outPath, "utf8");
const writtenBytes = readFileSync(outPath);
if (!writtenBytes.equals(Buffer.from(WORD, "utf8"))) {
  throw new Error(
    `entry.txt bytes mismatch: expected ${Buffer.from(WORD, "utf8").toString("hex")}, got ${writtenBytes.toString("hex")}`,
  );
}
if (written !== WORD) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`,
  );
}
const codePoints = [...written].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry.txt must be 1-200 code points, got ${codePoints}`);
}
if (!/^[A-Za-z]+$/.test(written)) {
  throw new Error("entry.txt must be exactly one word, letters only");
}
if (!/^\S+$/.test(written)) {
  throw new Error("entry.txt must be exactly one word with no whitespace");
}
if (written.trim() !== written || written.length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}

console.log(`wrote ${codePoints} code points to ${outPath}: ${written}`);
