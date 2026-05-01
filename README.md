# MD Diff v3.7

**Nástroj pro porovnání, analýzu a merge Markdown souborů** — funguje kompletně offline v prohlížeči, bez serveru.

🔗 **Live verze:** [bcmilda.github.io/md-diff](https://bcmilda.github.io/md-diff)

---

## Funkce

### ⇆ Diff
- Side-by-side rendered Markdown porovnání (nadpisy jako nadpisy, checkboxy jako checkboxy)
- Přepínání Rendered / Raw pohled
- Word-level diff uvnitř změněných bloků
- Detekce přesunutých bloků
- Navigace mezi změnami (Shift+N / Shift+P)
- Statistiky: podobnost %, přidáno/smazáno/upraveno/přesunuto

### 📋 AI pravidla
- Načti `CLAUDE.md` nebo jakýkoliv `.md` soubor s pravidly
- Editovatelné, ukládá se lokálně v prohlížeči
- Export zpět jako `.md`

### 📊 Progres dokumentu
- Vlastní regex pravidla pro počítání řádků (hotové, kritické, konflikty...)
- Kliknutím na kartu zobrazíš konkrétní matchující řádky (OLD vs NEW)
- **Snapshoty** — ulož stav po každé session pro sledování trendu
- **Trend analytiky:**
  - 📈 Řádky v čase (liniový graf)
  - ⚡ Velocity — hotové úkoly za session
  - 🔥 Burndown — otevřené vs hotové v čase
  - ✅ Completion rate % + průměrná délka úkolu
  - ☁️ Word cloud — nejčastější slova v dokumentu
- Export progress reportu jako `.md`

### 🕐 Historie
- Hierarchické zobrazení: seskupení podle souboru
- Každý záznam obsahuje metriky z pravidel (hotové, kritické...)
- Vyhledávání, filtrování
- Kliknutím obnoví celý diff

### 🤖 AI Merge
- **Jeden soubor:** originál + patch → Claude sloučí → výsledek v diff
- **Multi-patch:** jeden patch soubor pro více souborů → automatické rozsekání → merge postupně
- Odhad tokenů + ceny před spuštěním (v Kč i USD)
- Skutečná spotřeba po merge
- Few-shot příklady — nauč Claude svůj styl merge
- API klíč se ukládá lokálně

### 📁 Prohlížeč souborů
- Nahraj 10+ `.md` souborů najednou
- Side-by-side renderovaný náhled
- Levý klik = levý panel, pravý klik = pravý panel
- TOC (obsah dokumentu) z nadpisů, klikatelný
- Synchronizovaný scroll, Raw/Rendered přepínač
- Tlačítko → Diff pošle oba panely do porovnání

### 💾 Úložiště
- Uložení souborů, výsledků merge a patchů
- Poznámky k souborům ("Session 7")
- Export/Import celého úložiště jako JSON

---

## Záloha dat před aktualizací

Data (snapshoty, historie, API klíč) jsou uložena v prohlížeči pro konkrétní URL.
Pokud používáš **tuto GitHub Pages URL**, data zůstanou i po aktualizaci nástroje.

Pokud spouštíš lokálně jako soubor — vždy ukládej pod **stejným názvem** (`md-diff.html`), nebo použij:
**Progres → Trend → 💾 Záloha všech dat** před přejmenováním.

---

## Lokální spuštění

Stáhni `index.html` a otevři v prohlížeči. Žádný server ani instalace není potřeba.

```bash
# Nebo přes Python server pro lepší kompatibilitu:
python -m http.server 8080
# pak otevři http://localhost:8080
```

---

## GitHub Pages deployment

1. Fork nebo clone tohoto repozitáře
2. Jdi do Settings → Pages
3. Source: `main` branch, složka `/` (root)
4. Uložit → za pár minut je live na `https://[tvůj-username].github.io/md-diff`

Při každém `git push` se stránka automaticky aktualizuje (GitHub Actions).

---

## Použitý stack

- Čistý HTML/CSS/JavaScript — žádný framework, žádný build step
- IndexedDB pro lokální úložiště (limit ~500 MB)
- Anthropic API (claude-sonnet-4) pro AI Merge — vyžaduje vlastní API klíč
- [marked.js](https://marked.js.org/) pro Markdown rendering

---

## Verze

| Verze | Co přibylo |
|-------|-----------|
| v3.7 | Tokeny v Kč, bezpečnější merge instrukce |
| v3.6 | Velocity, Burndown, Completion, Word cloud, záloha dat |
| v3.5 | Progres záložky, snapshoty, hierarchická historie |
| v3.4 | IndexedDB úložiště, poznámky, multi-patch |
| v3.3 | Multi-patch splitter, Explorer záložka |
| v3.2 | Redesign topbaru, barevné hlavičky |
| v3.1 | Prohlížeč souborů side-by-side |
| v3.0 | Renderovaný Markdown diff, AI Merge |
