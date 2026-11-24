# Prompt

One word for your Wi-Fi — the single best word to become the sponsor's network name. The entry is "Buffering": the spinning wheel every Wi-Fi user knows, a word that is funny because it is true and instantly readable on any network list. The generator (`main.ts`, Node, no dependencies) writes exactly that word to `output/entry.txt` with no trailing newline and validates the bytes it wrote, so the file is byte-identical to the intended word, one word only, letters only, within the length limit.
