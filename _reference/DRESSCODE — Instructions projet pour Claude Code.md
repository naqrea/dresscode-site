# DRESSCODE — Instructions projet pour Claude Code

## 1. CONTEXTE DU PROJET

DRESSCODE est un projet de stylisme dans un environnement GTA RP.
Le site a pour objectif de présenter l'univers DRESSCODE et de permettre aux utilisateurs de :

- découvrir les tenues disponibles ;
- commander des tenues ;
- réserver un shooting photo ;
- réserver un relooking ;
- consulter les shootings réalisés.

Le site doit donner l'impression d'un **véritable site de mode / maison de stylisme haut de gamme**, tout en restant cohérent avec l'univers GTA RP et la charte graphique DRESSCODE.

Les documents PDF et logos fournis dans les pièces jointes constituent des **références visuelles importantes**. Il faut analyser leur contenu mais également leur direction artistique : typographies, proportions, espacements, compositions, couleurs, traitement des images, hiérarchie visuelle et ambiance générale.

Ne pas simplement reproduire les PDF : utiliser leur direction artistique pour construire une interface web cohérente, moderne et responsive.

---

# 2. STACK TECHNIQUE — CONTRAINTES NON NÉGOCIABLES

Le projet doit utiliser :

- Next.js
- React
- TypeScript
- Tailwind
- déploiement sur Vercel

## Contraintes importantes

Le site doit fonctionner **sans serveur backend dédié**.

Il doit pouvoir être déployé gratuitement sur Vercel.

Ne pas introduire inutilement :

- une base de données supplémentaire ;
- un serveur Node permanent ;
- une infrastructure externe payante ;
- un système d'authentification ;
- un CMS ;
- un système de paiement.

Toute dépendance ajoutée doit avoir une justification claire.

Privilégier les fonctionnalités natives de Next.js et React lorsque cela est possible.

Le site doit rester le plus léger et le plus simple possible en terme de code.

---

# 3. DESIGN SYSTEM

## Typographies

### Titres

Police :

**Baskervville**

Style :

**Medium**

Utilisation :

- grands titres ;
- titres de sections ;
- titres de pages ;
- éléments éditoriaux importants.

Les titres doivent généralement être en **MAJUSCULES**.

### Texte courant

Police :

**Inter**

Style :

**Regular**

Utilisation :

- paragraphes ;
- descriptions ;
- boutons ;
- filtres ;
- navigation ;
- informations produit ;
- formulaires.

### Police d'accent

Police :

**Allison**

Style :

**Regular**

Cette police doit être utilisée avec parcimonie pour apporter une dimension manuscrite / mode / éditoriale.

Ne pas l'utiliser pour les longs textes.

Elle peut notamment servir pour :

- petites signatures ;
- mots décoratifs ;
- accents graphiques ;
- éléments éditoriaux ;
- détails de composition.

---

# 4. PALETTE DE COULEURS

Utiliser exclusivement cette palette comme base du design system.

### Blanc

`#FFFFFF`

### Noir

`#000000`

### Couleur accent

`#6545F5`

Bleu / violet clair.

Utilisation :

- boutons importants ;
- liens ;
- éléments actifs ;
- hover ;
- accents graphiques ;
- éléments interactifs.

### Fond principal

`#1B0B47`

Bleu / violet très foncé.

Utilisation :

- arrière-plans principaux ;
- sections sombres ;
- header/footer si pertinent.

Ne pas créer arbitrairement de nouvelles couleurs sans nécessité.

Si une nuance supplémentaire est absolument nécessaire, elle doit être dérivée de la palette existante et rester très proche de celle-ci.

---

# 5. DIRECTION ARTISTIQUE

Le site doit avoir une identité :

- mode ;
- premium ;
- éditoriale ;
- élégante ;
- contemporaine ;
- légèrement artistique ;
- cohérente avec une maison de stylisme.

Éviter absolument l'apparence :

- d'un dashboard SaaS ;
- d'un template e-commerce générique ;
- d'un site corporate classique ;
- d'une interface trop chargée ;
- d'une interface ressemblant à une marketplace.

Le design doit donner une vraie sensation de **maison de stylisme / magazine de mode / boutique premium**.

Utiliser intelligemment :

- grands espaces ;
- typographie ;
- compositions asymétriques lorsque pertinent ;
- grandes images ;
- animations très légères ;
- transitions élégantes ;
- hiérarchie éditoriale.

Les animations doivent rester rapides et discrètes.

Ne jamais sacrifier les performances ou l'utilisabilité pour une animation.

---

# 6. LOGOS ET ASSETS FOURNIS

Deux logos DRESSCODE sont fournis :

- logo blanc sur fond transparent ;
- logo noir sur fond transparent.

Utiliser le logo approprié en fonction du contraste avec le background.

Ne pas modifier, déformer ou recolorer le logo.

Les PDF fournis doivent servir de références visuelles pour la direction artistique.

Les croquis de styliste fournis pour les vêtements doivent être utilisés comme images des articles lorsque disponibles.

---

# 7. STRUCTURE DU SITE

Le site comporte au minimum les pages suivantes :

## `/`

### Accueil

La page d'accueil doit présenter immédiatement les trois grandes activités de DRESSCODE :

1. Acheter une tenue
2. Réserver un shooting
3. Réserver un relooking

La page doit également présenter l'univers DRESSCODE et orienter rapidement l'utilisateur vers ces trois services.

Créer une landing page visuellement forte.

---

# 8. PAGE BOUTIQUE

Route :

`/boutique`

Cette page est une priorité du projet.

Elle doit fonctionner comme un **véritable e-shop**, sans système de paiement.

## Données

Les informations des vêtements doivent provenir de la base Airtable fournie.

La structure de la table est définie dans :

`tenues_structure.json`

Ce fichier doit être considéré comme la source de vérité pour comprendre les champs disponibles.

IMPORTANT :

Ne pas afficher les références internes des vêtements au client.

Les références Airtable sont des données internes.

---

## Catalogue

Chaque tenue doit présenter au minimum, selon les données disponibles :

- croquis / image ;
- nom ;
- prix si disponible ;
- collection ;
- couleur ;
- tags ;
- sexe / catégorie ;
- autres informations pertinentes présentes dans Airtable.

L'interface doit rester élégante et ne pas afficher toutes les informations de manière excessive.

---

# 9. FILTRES BOUTIQUE

La boutique doit permettre de filtrer les tenues par :

- collection ;
- couleur ;
- tags ;
- sexe.

Les filtres doivent être faciles à utiliser sur mobile.

Ils doivent être pensés spécifiquement pour une largeur d'écran très réduite.

Éviter les filtres occupant une grande partie permanente de l'écran.

Sur mobile, privilégier par exemple :

- panneau de filtres ;
- drawer ;
- bottom sheet ;
- ou autre interface compacte.

---

# 10. RECHERCHE

La boutique doit proposer une recherche de tenue par **nom**.

La recherche doit :

- être rapide ;
- être intuitive ;
- fonctionner sur mobile ;
- ne pas provoquer inutilement des requêtes Airtable.

Lorsque cela est possible, effectuer la recherche côté client sur les données déjà chargées.

---

# 11. PANIER

Le site doit posséder un panier.

Le panier doit permettre de :

- ajouter une tenue ;
- supprimer une tenue ;
- modifier la quantité ;
- consulter les tenues sélectionnées ;
- voir le récapitulatif de la commande.

Il n'y aura **aucun paiement en ligne**.

Le panier doit rester disponible pendant la navigation.

Utiliser de préférence `localStorage` pour conserver le panier côté navigateur.

Ne pas créer de système de compte utilisateur.

---

# 12. FINALISATION DE COMMANDE

Au lieu d'un paiement, l'utilisateur remplit un formulaire.

### Champs obligatoires

- Nom
- Prénom
- Numéro de téléphone

### Champ optionnel

- Informations complémentaires

Le formulaire doit également récapituler clairement :

- les tenues commandées ;
- les quantités ;
- les informations utiles ;
- le total si un prix est disponible.

Avant validation, l'utilisateur doit pouvoir vérifier sa commande.

---

# 13. DISCORD — COMMANDES

Après validation du formulaire, la commande doit être transmise sur Discord dans le salon dédié aux commandes.

Le message Discord doit reprendre :

- nom ;
- prénom ;
- numéro de téléphone ;
- informations complémentaires ;
- liste complète des tenues commandées ;
- quantités ;
- prix si disponible ;
- total si disponible.

Le message doit être lisible et structuré.

Exemple conceptuel :

```text
🛍️ NOUVELLE COMMANDE

CLIENT
Nom : ...
Prénom : ...
Téléphone : ...

TENUES
• Tenue 1 × 2
• Tenue 2 × 1
• Tenue 3 × 1

TOTAL : ...

INFORMATIONS COMPLÉMENTAIRES
...
```

IMPORTANT :

Le navigateur ne doit jamais exposer directement un secret Discord.

Si une requête Discord nécessite un secret, ne jamais mettre ce secret dans le code client.

Comme le projet doit rester sans backend dédié, privilégier une solution compatible Vercel permettant de conserver les secrets côté serveur, par exemple une **Vercel Serverless Function / Next.js Route Handler**.

Le frontend ne doit jamais contenir :

- webhook Discord ;
- token Discord ;
- secret API ;
- clé privée.

---

# 14. AIRTABLE — CONTRAINTE MAJEURE

Airtable est utilisé comme source de données pour les tenues.

Base ID :

`appvH78hHfA6UlvzU`

Table :

`Tenues`

Structure :

`tenues_structure.json`

## OBJECTIF PRIORITAIRE

**Limiter au MAXIMUM les requêtes Airtable.**

Le projet doit être conçu en considérant la limite du plan gratuit Airtable.

Ne pas effectuer une requête Airtable à chaque :

- recherche ;
- filtre ;
- ouverture d'une fiche ;
- ajout au panier ;
- changement de quantité.

---

# 15. STRATÉGIE AIRTABLE

Privilégier une récupération globale des données puis une manipulation côté client.

Architecture souhaitée :

```text
Airtable
   ↓
Next.js server-side / build-time lorsque possible
   ↓
Données des tenues
   ↓
Frontend React
   ↓
Recherche + filtres + tri côté client
```

Les filtres et recherches doivent fonctionner sur les données déjà récupérées.

Éviter les requêtes répétées.

Si un cache est nécessaire, utiliser les mécanismes de cache de Next.js/Vercel.

Ne pas implémenter de polling.

Ne pas rafraîchir automatiquement Airtable inutilement.

Ne pas faire de requête pour chaque composant.

---

# 16. GALERIE

Route :

`/galerie`

La galerie présente les photos des shootings réalisés.

Les photos doivent être organisées **par shooting**.

Chaque shooting peut présenter :

- nom ;
- date si disponible ;
- description si disponible ;
- galerie de photos.

La page doit être très visuelle.

Privilégier une présentation éditoriale / magazine plutôt qu'une simple grille uniforme.

Les images doivent être optimisées pour le web.

Utiliser les fonctionnalités d'optimisation d'images de Next.js lorsque pertinentes.

---

# 17. RÉSERVATION SHOOTING

Créer une page dédiée à la réservation d'un shooting.

Le parcours doit être simple et adapté au téléphone.

Le formulaire pourra demander les informations nécessaires au projet.

Ne pas créer de système de compte.

Si la réservation nécessite une transmission externe, garder une architecture compatible avec Vercel et éviter toute infrastructure serveur permanente.

---

# 18. RELOOKING

Créer une page dédiée au service de relooking.

Présenter le service de manière éditoriale et premium.

Permettre à l'utilisateur de demander / réserver un relooking via un formulaire adapté.

---

# 19. RESPONSIVE — PRIORITÉ ABSOLUE

Le site doit être parfaitement responsive.

La boutique est particulièrement importante car elle sera principalement utilisée **en jeu sur le téléphone GTA RP**.

Résolution cible maximale :

**480 × 831 px**

Le design doit donc être pensé **mobile-first**.

Ne pas simplement créer un desktop puis le réduire.

Concevoir d'abord l'expérience mobile.

Tester au minimum :

- 320px ;
- 360px ;
- 390px ;
- 414px ;
- 480px ;
- desktop.

À 480px de largeur, aucune interface ne doit :

- déborder horizontalement ;
- nécessiter de zoom ;
- avoir des boutons trop petits ;
- présenter des textes coupés ;
- rendre les filtres difficiles à utiliser.

Les zones tactiles doivent être suffisamment grandes.

La navigation mobile doit être particulièrement soignée.

---

# 20. PERFORMANCE

Le site doit être léger et rapide.

Priorités :

1. limiter les requêtes Airtable ;
2. optimiser les images ;
3. éviter les dépendances inutiles ;
4. limiter le JavaScript côté client ;
5. utiliser Server Components lorsque pertinent ;
6. éviter les re-renders inutiles ;
7. lazy-loader les éléments lourds lorsque pertinent.

Ne pas installer une librairie simplement pour résoudre un problème pouvant être résolu avec React/CSS natif.

---

# 21. ACCESSIBILITÉ

Respecter au minimum :

- contrastes suffisants ;
- navigation clavier ;
- labels de formulaires ;
- boutons accessibles ;
- `alt` sur les images ;
- états hover/focus ;
- structure sémantique correcte.

L'esthétique ne doit pas se faire au détriment de l'accessibilité.

---

# 22. UX

L'utilisateur doit toujours comprendre :

- où il se trouve ;
- ce qu'il peut faire ;
- comment revenir en arrière ;
- ce qu'il a ajouté à son panier ;
- comment finaliser sa commande.

Les états suivants doivent être prévus :

- chargement ;
- erreur ;
- aucun résultat ;
- panier vide ;
- formulaire invalide ;
- commande envoyée ;
- problème lors de l'envoi.

Ne jamais laisser un utilisateur devant une interface vide sans explication.

---

# 23. ARCHITECTURE DU CODE

Le code doit être :

- propre ;
- modulaire ;
- lisible ;
- typé avec TypeScript ;
- facilement maintenable.

Créer des composants réutilisables.

Exemples possibles :

```text
components/
  Header
  Footer
  Button
  OutfitCard
  OutfitGrid
  Filters
  SearchBar
  Cart
  CartItem
  OrderForm
  Gallery
  ShootingCard
```

L'architecture exacte peut être adaptée au projet.

Éviter les composants monolithiques de plusieurs centaines de lignes.

---

# 24. DONNÉES ET TYPES

Créer des types TypeScript correspondant à la structure Airtable.

Ne pas utiliser `any` sauf nécessité exceptionnelle.

Les données Airtable doivent être transformées dans un modèle interne propre si nécessaire.

Le frontend ne doit pas dépendre directement de la structure brute Airtable partout dans l'application.

---

# 25. SÉCURITÉ

Ne jamais exposer dans le navigateur :

- token Airtable ayant des permissions sensibles ;
- webhook Discord ;
- secrets ;
- clés privées.

Toutes les variables secrètes doivent être stockées dans les variables d'environnement Vercel.

Exemple :

```env
AIRTABLE_BASE_ID=...
AIRTABLE_TOKEN=...
AIRTABLE_TABLE_TENUES=Tenues
DISCORD_WEBHOOK_URL=...
```

Le `AIRTABLE_BASE_ID` peut être public, mais le token Airtable ne doit jamais être exposé au client.

---

# 26. CE QU'IL NE FAUT PAS FAIRE

Ne pas :

- ajouter un système de login ;
- ajouter un paiement ;
- ajouter une base de données supplémentaire sans raison ;
- créer un backend permanent ;
- exposer des secrets côté client ;
- multiplier les requêtes Airtable ;
- interroger Airtable à chaque interaction utilisateur ;
- utiliser un template e-commerce générique ;
- créer une interface ressemblant à un dashboard ;
- surcharger l'interface avec des animations ;
- sacrifier le mobile au profit du desktop ;
- afficher les références internes Airtable ;
- ajouter des fonctionnalités non demandées sans justification.

---

# 27. ORDRE DE PRIORITÉ

En cas de conflit entre plusieurs choix, respecter cet ordre :

1. Fonctionnalité
2. Expérience mobile
3. Performance
4. Sécurité
5. Identité visuelle DRESSCODE
6. Accessibilité
7. Expérience desktop
8. Effets décoratifs

---

# 28. AVANT DE CODER

Avant d'implémenter les pages :

1. analyser `tenues_structure.json` ;
2. analyser les PDF fournis ;
3. analyser les logos ;
4. identifier les champs Airtable réellement disponibles ;
5. définir les types TypeScript ;
6. définir l'architecture des données ;
7. définir la stratégie de récupération/cache Airtable ;
8. définir l'architecture de transmission Discord ;
9. définir le design system ;
10. puis seulement commencer l'implémentation.

Ne pas inventer les champs Airtable.

Si une information nécessaire n'existe pas dans la structure fournie, l'indiquer clairement avant de construire une logique dépendant de cette information.

---

# 29. APPROCHE DE DÉVELOPPEMENT

Construire le projet progressivement.

Après chaque fonctionnalité importante :

- vérifier TypeScript ;
- vérifier le build ;
- vérifier les erreurs console ;
- vérifier le responsive ;
- vérifier qu'aucune requête Airtable inutile n'a été introduite.

Le projet doit rester déployable sur Vercel à chaque étape importante.

---

# 30. OBJECTIF FINAL

Le résultat doit être un site DRESSCODE qui donne l'impression d'une **véritable maison de stylisme premium**, avec une forte identité visuelle, une boutique agréable à utiliser sur téléphone, une galerie éditoriale et des parcours de réservation simples.

La boutique est la fonctionnalité centrale.

Elle doit être aussi agréable à utiliser sur un écran de **480 × 831 px** que sur desktop.

L'objectif n'est pas seulement de faire fonctionner les fonctionnalités : le site doit avoir une vraie **direction artistique DRESSCODE** et ne jamais donner l'impression d'être un simple CRUD connecté à Airtable.
