# DRESSCODE

Site vitrine et boutique de la maison de stylisme DRESSCODE (projet GTA RP).
Next.js (App Router) + React + TypeScript + Tailwind CSS v4, déployable
gratuitement sur Vercel, sans backend permanent.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs (voir ci-dessous)
npm run dev
```

Le site est servi sur http://localhost:3000. Sans `AIRTABLE_TOKEN`, la
boutique s'affiche avec un état "en préparation" plutôt que de planter.
Sans webhook Discord, les formulaires renvoient une erreur explicite au lieu
d'échouer silencieusement.

## Variables d'environnement

Voir `.env.example`. À définir dans **Vercel → Project Settings →
Environment Variables** en production (jamais commitées).

| Variable | Obligatoire | Description |
| --- | --- | --- |
| `AIRTABLE_BASE_ID` | non (valeur par défaut incluse) | Base Airtable `Tenues`. |
| `AIRTABLE_TABLE_TENUES` | non (défaut `Tenues`) | Nom de la table. |
| `AIRTABLE_TOKEN` | oui | Token Airtable (lecture seule recommandé). Jamais exposé au client. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | recommandé | Cloud name Cloudinary. Active l'optimisation `f_auto,q_auto` des URLs Airtable et de galerie. |
| `NEXT_PUBLIC_CLOUDINARY_HERO_PUBLIC_ID` | non | Public ID Cloudinary du hero importé depuis `public/hero-image.png`. |
| `NEXT_PUBLIC_CLOUDINARY_LOGO_WHITE_PUBLIC_ID` | non | Public ID Cloudinary du logo blanc importé depuis `public/logo-white.png`. |
| `DISCORD_WEBHOOK_URL` | oui | Webhook du salon des commandes. |
| `DISCORD_WEBHOOK_URL_SHOOTING` | non | Webhook dédié aux demandes de shooting (sinon `DISCORD_WEBHOOK_URL`). |
| `DISCORD_WEBHOOK_URL_RELOOKING` | non | Webhook dédié aux demandes de relooking (sinon `DISCORD_WEBHOOK_URL`). |

Aucun secret n'est jamais lu dans un composant `"use client"` : l'accès à
Airtable (`src/lib/airtable.ts`) et à Discord (`src/lib/discord.ts`) est
exclusivement fait depuis des Server Components et des Route Handlers
(`src/app/api/*/route.ts`).

## Architecture des données

```
Airtable (Tenues)
   ↓ un seul fetch, côté serveur, mis en cache (30 min)
src/lib/airtable.ts   → normalise les champs, exclut les références internes
   ↓ props initiales
src/components/boutique/BoutiqueClient.tsx
   → recherche + filtres + tri, entièrement côté client (aucune requête
     Airtable supplémentaire quand l'utilisateur filtre/recherche/ouvre
     une fiche/ajoute au panier)
```

- Les champs internes (`reference_*`, `total_commandes`, `id_employe`…) ne
  sont ni demandés à Airtable, ni exposés au navigateur : seul le sous-
  ensemble nécessaire à la boutique est requêté (`fields[]` dans l'appel
  Airtable) puis transformé dans `Tenue` (`src/types/tenue.ts`).
- Le panier vit en `localStorage` (`src/components/cart/CartProvider.tsx`) :
  aucun compte utilisateur, aucun état serveur.
- Les commandes/réservations sont transmises à Discord via des Route
  Handlers (`/api/order`, `/api/shooting`, `/api/relooking`) qui gardent le
  webhook côté serveur et valident les champs avant envoi.

## Galerie

Aucune table Airtable n'a été fournie pour les shootings publiés : la
galerie lit un fichier statique éditable, `src/lib/galerie-data.ts` (le
format et un exemple y sont documentés). Tant qu'aucun shooting n'y est
ajouté, la page affiche un état "à venir" plutôt qu'un contenu inventé.

## Images et Cloudinary

Les URLs distantes provenant d'Airtable et de la galerie passent par
Cloudinary Fetch Delivery avec `f_auto,q_auto`, puis par `next/image`. Le
fallback `/api/img` reste disponible si `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
n'est pas défini.

Pour optimiser aussi les assets statiques, importez `hero-image.png` et
`logo-white.png` dans Cloudinary puis renseignez leurs public IDs dans les
variables correspondantes. Sans ces IDs, le site conserve les fichiers de
`public/` et fonctionne normalement.

## Scripts

```bash
npm run dev     # serveur de développement
npm run build   # build de production (régénère aussi les types de route)
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Dossier `_reference/`

Contient les documents fournis pour le projet (brief, structure Airtable,
logos sources). Ce dossier n'est pas utilisé par l'application — les
logos exploités par le site vivent dans `public/`.
