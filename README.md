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

## Notes de build (Next.js 16)

Ce projet a été scaffoldé avec Next.js 16. Les images provenant d'Airtable
(URLs arbitraires saisies par les stylistes) sont servies via `next/image`
en mode `unoptimized` plutôt que via `images.remotePatterns`, puisque leur
nom d'hôte n'est pas connu à l'avance. Les images locales (logo, galerie)
bénéficient de l'optimisation standard de Next.js.

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
