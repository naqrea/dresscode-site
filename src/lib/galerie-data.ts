import type { PhotoShooting } from "@/types/galerie";

/**
 * No Airtable table (or any other data source) for shootings was provided
 * in the project instructions — only the `Tenues` table is specified as a
 * source of truth. Per §28 ("ne pas inventer les champs Airtable"), this
 * gallery is left as real, static, editable content instead of fabricating
 * a data source or fake past shootings.
 *
 * To publish a shooting, add an entry below. Photos can point to local
 * files in /public/galerie/... or to external URLs.
 *
 * Example:
 * {
 *   id: "campagne-ete",
 *   nom: "Campagne Été",
 *   date: "Été 2026",
 *   description: "Un shooting pensé autour du littoral, en collaboration avec N.O.V.A.K.",
 *   photos: [{ src: "/galerie/campagne-ete/01.jpg", alt: "Mannequin en tenue Dresscode, campagne Été" }],
 * },
 */
export const shootings: PhotoShooting[] = [];
