export interface ContactPayload {
  nom: string;
  prenom: string;
  telephone: string;
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function validateContact(body: unknown): ValidationResult<ContactPayload> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Requête invalide." };
  }
  const b = body as Record<string, unknown>;
  const nom = typeof b.nom === "string" ? b.nom.trim() : "";
  const prenom = typeof b.prenom === "string" ? b.prenom.trim() : "";
  const telephone = typeof b.telephone === "string" ? b.telephone.trim() : "";

  if (!nom || nom.length > 80) {
    return { ok: false, error: "Le nom est requis (80 caractères max)." };
  }
  if (!prenom || prenom.length > 80) {
    return { ok: false, error: "Le prénom est requis (80 caractères max)." };
  }
  if (!telephone || telephone.length < 3 || telephone.length > 30) {
    return { ok: false, error: "Le numéro de téléphone est requis." };
  }

  return { ok: true, data: { nom, prenom, telephone } };
}

export function sanitizeOptionalText(value: unknown, max = 1000): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export function sanitizeRequiredText(
  value: unknown,
  max = 400
): { ok: true; data: string } | { ok: false } {
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (!trimmed) return { ok: false };
  return { ok: true, data: trimmed.length > max ? trimmed.slice(0, max) : trimmed };
}
