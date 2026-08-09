import { NextResponse } from "next/server";
import { sendDiscordEmbed, truncateFieldValue } from "@/lib/discord";
import { sanitizeOptionalText, sanitizeRequiredText, validateContact } from "@/lib/validation";

export async function POST(request: Request) {
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL_SHOOTING || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[api/shooting] aucun webhook Discord configuré.");
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
  const theme = sanitizeRequiredText(b.theme, 300);
  if (!theme.ok) {
    return NextResponse.json(
      { ok: false, error: "Merci de décrire le thème du shooting souhaité." },
      { status: 400 }
    );
  }

  const dateSouhaitee = sanitizeOptionalText(b.dateSouhaitee, 200);
  const informations = sanitizeOptionalText(b.informations);

  try {
    await sendDiscordEmbed(webhookUrl, {
      title: "📸 Nouvelle demande de shooting",
      fields: [
        {
          name: "CLIENT",
          value: `Nom : ${contact.data.nom}\nPrénom : ${contact.data.prenom}\nTéléphone : ${contact.data.telephone}`,
        },
        { name: "THÈME SOUHAITÉ", value: truncateFieldValue(theme.data) },
        ...(dateSouhaitee
          ? [{ name: "DATE / CRÉNEAU SOUHAITÉ", value: truncateFieldValue(dateSouhaitee) }]
          : []),
        ...(informations
          ? [{ name: "INFORMATIONS COMPLÉMENTAIRES", value: truncateFieldValue(informations) }]
          : []),
      ],
      footer: "Demande envoyée depuis la page Shooting DRESSCODE",
    });
  } catch (error) {
    console.error("[api/shooting] échec envoi Discord", error);
    return NextResponse.json(
      { ok: false, error: "Impossible de transmettre la demande. Réessayez dans un instant." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
