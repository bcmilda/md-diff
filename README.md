# MD Diff v4.4

**Nástroj pro porovnání, analýzu, merge a správu Markdown souborů** — funguje kompletně offline v prohlížeči, bez serveru, bez instalace.

🔗 **Live verze:** [bcmilda.github.io/md-diff](https://bcmilda.github.io/md-diff)

---

## Přehled záložek

| Záložka | Ikona | Funkce |
|---------|-------|--------|
| Diff | ⇆ | Porovnání dvou md souborů side-by-side |
| AI pravidla | 📋 | Správa CLAUDE.md / pravidel pro AI |
| Progres | 📊 | Analytika obsahu, snapshoty, trend |
| Historie | 🕐 | Přehled všech provedených porovnání |
| AI Merge | 🤖 | Merge originál + patch pomocí Claude API |
| Prohlížeč | 📁 | Náhled více md souborů najednou |
| Projekty | 📂 | Správa projektů, sessions a souborů |
| Úložiště | 💾 | Lokální archiv souborů a výsledků merge |

---

## Funkce

### ⇆ Diff
- Side-by-side **renderovaný** Markdown diff (nadpisy, checkboxy, tabulky, kód)
- Přepínání Rendered / Raw pohled
- Word-level diff uvnitř změněných bloků
- Detekce přesunutých bloků
- **Automatické zarovnání výšek bloků** — levý a pravý panel drží sync i v rendered módu
- Navigace Shift+N / Shift+P (funguje všude kromě textových polí)
- Stats bar: podobnost %, přidáno / smazáno / upraveno / přesunuto

### 📋 AI pravidla
- Načti `CLAUDE.md` nebo jakýkoliv `.md` soubor s pravidly projektu
- Editovatelné přímo v nástroji, ukládá se lokálně
- Export zpět jako `.md`

### 📊 Progres dokumentu
- **Nahrání souborů přímo** — bez nutnosti dělat diff
- **Záložky souborů** — každý nahraný soubor dostane vlastní záložku
- **Automatické rozpoznání typu** podle názvu → navrhne regex pravidla:
  - `todo.md` → checkboxy, priority P1, kritické, konflikt
  - `bugs.md` → OPEN-xxx, CLOSED, FIX záznamy, reopen
  - `features.md` → implementováno, plánováno, WIP
  - `context.md` → sekce H2/H3, důležité, TODO inline
  - `architecture.md` → ADR záznamy, rozhodnutí, deprecated
  - `decisions.md` → schváleno, zamítnuto, otevřené
- Kliknutím na metriku zobrazíš matchující řádky (STARÉ vs NOVÉ)
- **Snapshoty** — fungují bez diffu, přímo z nahraných souborů
- **Trend analytiky:**
  - 📈 Řádky v čase
  - ⚡ Velocity — hotové úkoly za session
  - 🔥 Burndown — otevřené vs hotové
  - ✅ Completion rate % + průměrná délka úkolu
  - 📋 Průběh změn — metriky napříč snapshoty
- **Záloha všech dat** — JSON export před aktualizací nástroje

### 🕐 Historie
- Hierarchické zobrazení seskupené podle souboru
- Každý záznam: `vstup1 + patch → výsledek` barevně
- Metriky z pravidel ukládány automaticky
- Vyhledávání, přepínač seskupení, kliknutím obnoví diff

### 🤖 AI Merge
- **Jeden soubor:** originál + patch → Claude sloučí → výsledek
- **Multi-patch:** patch se sekcemi `## 📄 název.md` → automatické rozsekání
- **📂 Z projektu** — picker pro výběr ze Session nebo Úložiště
- Odhad tokenů + ceny (USD i Kč) před spuštěním
- Skutečná spotřeba po merge z API response
- Few-shot příklady pro styl merge
- **🧩 Block editor** — drag & drop pořadí sekcí před stažením
- Přepínač bloků: Nadpisy H3/H4 / Odstavce

### 📁 Prohlížeč souborů
- Neomezený počet souborů, deduplikace podle cesty
- Levý klik = levý panel, pravý klik = pravý panel
- Side-by-side renderovaný náhled, synchronizovaný scroll
- TOC z nadpisů, drag & drop nahrávání, vyhledávání

### 📂 Projekty *(zlatá záložka)*
- Hierarchie: **Projekt → Session → Soubory**
- Typy souborů: 📄 Aktuální / 🔧 Patch / ✅ Výsledek / 📦 Archiv
- **Ruční změna typu** přímo na kartě (dropdown)
- **⭐ Master soubory** — jeden "aktuální master" per název souboru napříč sessionemi
  - Lišta master souborů vždy viditelná v hlavičce projektu
  - Tlačítko **📊 Přehled** — tabulka s názvem, sessioní, řádky, popisem
  - Stažení přímo z přehledu
- **💾 Přenést do Úložiště** — přesune soubory session podle typu
- Popis souboru automaticky z první věty obsahu
- Export / Import projektu jako JSON

### 💾 Úložiště *(zelená záložka)*
- Tři podzáložky: 📄 Soubory / ✅ Výsledky merge / 🔧 Patche
- Poznámky k souborům, Export / Import jako JSON

---

## Multi-patch formát

Každá sekce patch souboru **musí začínat přesně:**

```markdown
## 📄 název_souboru.md
```

Příklad:

```markdown
# Patch Session 8

## 📄 decisions.md

### ADR-021 – Nové rozhodnutí
- Datum: 2026-05-01
- Rozhodnutí: ...

## 📄 bugs.md

### FIX-060 · Popis bugu
- Příčina: ...
```

> ⚠️ Jiné formáty (`# PATCH 1:`, `### soubor.md` apod.) nebudou rozpoznány.

---

## Záloha dat

Data jsou vázána na URL prohlížeče. GitHub Pages URL = data zůstanou po každé aktualizaci.

**Před aktualizací:** Progres → Trend → **💾 Záloha všech dat** (JSON se vším).

Lokálně: vždy stejný název souboru `md-diff.html`.

---

## Lokální spuštění

Stáhni `index.html` a otevři v prohlížeči. Bez serveru, bez instalace.

```bash
# Volitelně přes Python server:
python -m http.server 8080
# http://localhost:8080
```

---

## GitHub Pages deployment

1. Fork / clone repozitáře
2. **Settings → Pages → Source: GitHub Actions**
3. Klikni **Configure** u Static HTML → Commit
4. Live za 1–2 minuty na `https://[username].github.io/md-diff`

---

## Stack

- Čistý HTML/CSS/JS — jeden soubor, žádný build step, ~6000 řádků
- **IndexedDB:** `MDDiffStorage` (úložiště), `MDDiffProjects` (projekty)
- **localStorage:** snapshoty, historie, API klíč, pravidla
- **API:** Anthropic `claude-sonnet-4-20250514` — vlastní klíč nutný
- Marked.js pro Markdown rendering

---

## Changelog

| Verze | Hlavní změny |
|-------|-------------|
| **v4.4** | Záložky souborů v Progresu, Průběh změn v Trend, barevné záložky Projekty/Úložiště |
| **v4.3** | Snapshot bez diffu, ruční změna typu souboru, ⭐ Master lišta, tabulkový přehled |
| **v4.2** | Globální vizuální vylepšení, oprava Prog Diff tlačítka, verze v topbaru |
| **v4.1** | Nahrání souborů do Progresu, auto-rozpoznání typu md, pravidla podle názvu |
| **v4.0** | 📂 Z projektu picker v AI Merge, Přenést do Úložiště, oprava Storage tabs |
| **v3.9** | 📂 Projekty — Projekt → Session → Soubory, IndexedDB, export/import JSON |
| **v3.8** | 🧩 Block editor (drag & drop), automatické zarovnání výšek v rendered diff |
| **v3.7** | Tokeny v Kč, bezpečnější merge instrukce, oprava Shift+N/P v textarea |
| **v3.6** | Velocity, Burndown, Completion rate, záloha všech dat |
| **v3.5** | Progres záložky, snapshoty, hierarchická historie |
| **v3.4** | IndexedDB úložiště, poznámky, multi-patch splitter |
| **v3.3** | Prohlížeč souborů side-by-side, oprava code block bugů |
| **v3.2** | Redesign topbaru, barevné hlavičky OLD/NEW |
| **v3.0** | Renderovaný Markdown diff, AI Merge |

---

## Poznámky pro Claude

Při práci s tímto projektem:

- **Jeden soubor** — vše je v `index.html` (~6000 řádků), HTML + CSS + JS dohromady
- **Verzování** — verze v `<title>` řádek 6 a v `<h1>` topbar; vždy zvýšit o 0.01
- **Syntax check** — po JS změnách ověř syntaxi Node.js (`node --check`); časté jsou stray `{`
- **Multi-patch** — separátor `## 📄 název.md` je klíčový formát, neměnit
- **API model** — vždy `claude-sonnet-4-20250514`
- **Data URL** — `bcmilda.github.io/md-diff/` je produkční URL; lokální soubor = jiný origin = prázdné úložiště
- **Commit** — vždy na `dev` branch, formát zprávy `vX.XX - [popis]`
- **IndexedDB** — `MDDiffStorage` (soubory/výsledky/patche), `MDDiffProjects` (projekty/sessions/pfiles)
- **localStorage klíče** — `mddiff_api_key`, `mddiff_snapshots`, `mddiff_history`, `mddiff_prog_rules`, `mddiff_fewshot`, `mddiff_current_files`, `mddiff_merge_instr`
