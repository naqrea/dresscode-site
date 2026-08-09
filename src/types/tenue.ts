/**
 * Internal, client-safe representation of a `Tenues` record from Airtable.
 * Only fields relevant to the storefront are kept — internal fields
 * (references, employee ids, order counts...) are stripped in lib/airtable.ts
 * and never reach this type or the client bundle.
 */
export interface Tenue {
  id: string;
  nom: string;
  /** Numeric price when parseable, otherwise null (displayed as "Sur devis"). */
  prix: number | null;
  prixAffiche: string;
  collection: string | null;
  couleurs: string[];
  tags: string[];
  sexe: string | null;
  statut: string | null;
  disponible: boolean;
  /** Croquis is preferred over the studio photo when both are present. */
  image: string | null;
  imageSecondaire: string | null;
}

export interface TenueFiltres {
  collections: string[];
  couleurs: string[];
  tags: string[];
  sexes: string[];
}
