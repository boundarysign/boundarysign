## Goals

1. Fix grammar, spelling, and capitalization issues across the site.
2. Restructure homepage content so each sign has its own clearly-labeled section.
3. Move the 36-state compliance list out of the generic "State Compliance" section and tie it to the T-Post Sign only.
4. Add a dedicated **T-Post Sign** page with the full story: features, compliance, why it's innovative.

---

## 1. Grammar & Copy Fixes

Targeted edits, no rewrites:

- **SignShowcase.tsx** — "rectangualr" → "rectangular"; "aswell as" → "as well as"; "installment" → "installation"; rewrite the barbwire tagline to "Rectangular format. Built to install anywhere."
- **BuiltForSection.tsx** — "compliancy" → "compliance"; normalize "INSTALL & FORGET" to "Install & Forget" to match sibling card titles.
- **StateCompliance.tsx** — "your states regulations" → "your state's regulations".
- **SignFeatures.tsx** — normalize "STATE COMPLIANCE" to "State Compliance"; replace "Check below to see more information" with a clearer line.
- **FounderStory.tsx** — "idaho pitch" → "Idaho Pitch"; "Collegiate pitch competitions" → "collegiate pitch competitions".
- **BlogPost.tsx** CTA — drop the inaccurate "UV-stable inks" mention; reword around cut-out letters + heavy-gauge aluminum.
- **SiteFooter.tsx** — tighten the tagline so it doesn't lean on "therefore" / "these parties".
- **NotFound.tsx** — match brand voice ("This page doesn't exist." instead of "Oops!").

About / Team page bodies live in the database, so I'll leave those alone unless you want them edited too.

---

## 2. Homepage Restructure — Split by Product

Today, `SignShowcase` shows both signs in a single grid, and `SignFeatures` + `StateCompliance` describe only the T-post sign without saying so.

New homepage flow:

```text
Hero
↓
T-POST SIGN (section)
  - Showcase card  (current T-post entry from SignShowcase)
  - Feature tiles  (the current SignFeatures content)
  - "Compliant in 36 states" + state grid
  - CTA → /t-post-sign  (full page)
↓
BARBWIRE SQUARE SIGN (section)
  - Showcase card (current barbwire entry)
  - "Coming soon" treatment + 49-state claim kept where it is
↓
Built For The Land (generic)
Founder Story
Blog Preview
Contact
```

Concretely:
- Rename `SignShowcase.tsx` → `TPostSignSection.tsx` (T-post card + features + compliance grid all in one).
- Create `BarbwireSignSection.tsx` for the second product.
- Delete the standalone `StateCompliance` and `SignFeatures` sections from `Index.tsx` (their content now lives inside the T-Post section).
- Update `Index.tsx` to render the new sections.

---

## 3. New Page: `/t-post-sign`

A dedicated marketing page for the flagship product with these sections:

- Hero: name, tagline, hero photo, "Shop" CTA
- Why It's Different — cut-out letters, heavy-gauge aluminum, slide-on mount system (T/C/U/round posts + wood)
- How It Installs — short numbered steps
- Built To Last — weather, fade, vandalism resistance (reusing existing tile copy)
- Compliant In 36 States — full state grid moved here, with a note explaining the list applies specifically to this sign
- FAQ-style closer + CTA back to the shop / contact

Wiring:
- New file: `src/pages/TPostSign.tsx`
- New route in `src/App.tsx`: `<Route path="/t-post-sign" element={<TPostSign />} />`
- Add a nav link in `SiteHeader.tsx` ("T-Post Sign") so people can reach it.
- Add an entry to `public/sitemap.xml`.

---

## Out of Scope

- Supabase-stored About / Team copy — needs database edits, ask before touching.
- Shopify product descriptions — live in Shopify admin, not in code.
- Any visual redesign beyond what's needed to split sections cleanly; the existing styling/tokens stay.

---

## Technical Details

- All new copy uses semantic Tailwind tokens already defined; no new colors.
- The state list array currently in `StateCompliance.tsx` will be moved into a small shared module (`src/data/tPostCompliantStates.ts`) so both the homepage section and the new T-Post Sign page can render it without duplication.
- `StateCompliance.tsx` will be removed once its content is relocated; references in `Index.tsx` removed in the same change.
- Sitemap entry added with `<priority>0.8</priority>` and today's `<lastmod>`.