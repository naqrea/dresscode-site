import { NextResponse } from "next/server";
import { sendDiscordEmbed, truncateFieldValue } from "@/lib/discord";
import { sanitizeOptionalText, sanitizeRequiredText, validateContact } from "@/lib/validation";

export async function POST(request: Request) {
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL_RELOOKING || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[api/relooking] aucun webhook Discord configuré.");
    return NextResponse.json(
      { ok: false, error: "Le service de réservation est momentanément indisponible." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const contact = validateContact(body);
  if (!contact.ok) {
    return NextResponse.json({ ok: false, error: contact.error }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const objectif = sanitizeRequiredText(b.objectif, 400);
  if (!objectif.ok) {
    return NextResponse.json(
      { ok: false, error: "Merci de décrire l'objectif du relooking souhaité." },
      { status: 400 }
    );
  }

  const budget = sanitizeOptionalText(b.budget, 100);
  const informations = sanitizeOptionalText(b.informations);

  try {
    await sendDiscordEmbed(webhookUrl, {
      title: "✨ Nouvelle demande de relooking",
      fields: [
        {
          name: "CLIENT",
          value: `Nom : ${contact.data.nom}\nPrénom : ${contact.data.prenom}\nTéléphone : ${contact.data.telephone}`,
        },
        { name: "OBJECTIF", value: truncateFieldValue(objectif.data) },
        ...(budget ? [{ name: "BUDGET INDICATIF", value: truncateFieldValue(budget) }] : []),
        ...(informations
          ? [{ name: "INFORMATIONS COMPLÉMENTAIRES", value: truncateFieldValue(informations) }]
          : []),
      ],
      footer: "Demande envoyée depuis la page Relooking DRESSCODE",
    });
  } catch (error) {
    console.error("[api/relooking] échec envoi Discord", error);
    return NextResponse.json(
      { ok: false, error: "Impossible de transmettre la demande. Réessayez dans un instant." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
