/**
 * Server-only helper to post structured embeds to a Discord webhook.
 * Never import this file from a "use client" component: webhook URLs are
 * secrets and must stay in server environment variables.
 */

const DRESSCODE_ACCENT = 0x6545f5;

export interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  title: string;
  fields: DiscordEmbedField[];
  footer?: string;
}

export async function sendDiscordEmbed(
  webhookUrl: string,
  embed: DiscordEmbed
): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "DRESSCODE",
      embeds: [
        {
          title: embed.title,
          color: DRESSCODE_ACCENT,
          fields: embed.fields,
          timestamp: new Date().toISOString(),
          footer: embed.footer ? { text: embed.footer } : undefined,
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Discord webhook a répondu ${res.status}: ${body}`);
  }
}

/** Discord embed field values are capped at 1024 characters. */
export function truncateFieldValue(value: string, max = 1024): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

/**
 * Groups lines into chunks that each fit under Discord's 1024-char field
 * limit, so a long order list becomes several "TENUES" fields instead of
 * one truncated one.
 */
export function chunkLines(lines: string[], max = 1024): string[] {
  const chunks: string[] = [];
  let current = "";
  for (const line of lines) {
    const candidate = current ? `${current}\n${line}` : line;
    if (candidate.length > max) {
      if (current) chunks.push(current);
      current = line.length > max ? truncateFieldValue(line, max) : line;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks.length ? chunks : [""];
}
