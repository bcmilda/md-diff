# Jak nasadit MD Diff na GitHub Pages

## Krok 1 — Vytvoř repozitář na GitHubu

1. Jdi na github.com a přihlaš se
2. Klikni **+ New repository**
3. Název: `md-diff` (nebo cokoliv chceš)
4. Nastav jako **Public** (GitHub Pages je zdarma jen pro public)
5. **Nevybírej** "Add README" — to uděláme ručně
6. Klikni **Create repository**

---

## Krok 2 — Nahraj soubory

GitHub ti ukáže instrukce. Nejjednodušší způsob:

### Varianta A — přes web (bez gitu)

1. V novém repozitáři klikni **uploading an existing file**
2. Přetáhni tyto soubory:
   - `index.html` ← hlavní nástroj
   - `README.md`
   - složku `.github/` (celou)
3. Klikni **Commit changes**

### Varianta B — přes git (příkazová řádka)

```bash
cd cesta/ke/složce/s/soubory
git init
git add .
git commit -m "Initial deploy MD Diff v3.7"
git branch -M main
git remote add origin https://github.com/TVUJ-USERNAME/md-diff.git
git push -u origin main
```

---

## Krok 3 — Zapni GitHub Pages

1. Jdi do repozitáře → **Settings** (nahoře vpravo)
2. Levý menu → **Pages**
3. Pod **Source** vyber:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klikni **Save**

Za 1-2 minuty bude live na:
```
https://TVUJ-USERNAME.github.io/md-diff/
```

---

## Krok 4 — Budoucí aktualizace

Kdykoli nahraješ novou verzi `index.html` na GitHub, stránka se automaticky aktualizuje (GitHub Actions to zajistí).

```bash
# Příkazová řádka:
cp /cesta/k/md-diff-v3.7.html index.html
git add index.html
git commit -m "Update MD Diff v3.8"
git push
```

Nebo přes web: klikni na `index.html` v repozitáři → tužka (edit) → paste obsahu → Commit.

---

## Výhody GitHub Pages oproti lokálnímu souboru

| | Lokální soubor | GitHub Pages |
|---|---|---|
| Data po aktualizaci | ❌ zmizí (jiná URL) | ✅ zůstanou (stejná URL) |
| Přístup z mobilu | ❌ ne | ✅ ano |
| Sdílení s kolegy | ❌ ne | ✅ ano |
| Záloha kódu | ❌ ne | ✅ git history |
| Cena | zdarma | zdarma |

---

## Bezpečnost

- API klíč se ukládá jen v tvém prohlížeči (localStorage)
- GitHub Pages jsou veřejné — ale API klíč nikdo neuvidí
- Pokud chceš soukromý přístup, použij **Cloudflare Pages** s heslem (zdarma)
