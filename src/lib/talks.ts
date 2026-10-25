import fs from 'node:fs';
import path from 'node:path';

export interface Talk {
  title: string;
  description: string;
  date: Date | null;
  venue: string;
  href: string;
  featured: boolean;
  sample: boolean;
  notes: boolean;
  paperTitle: string;
  paperUrl: string;
  paperId: string;
}

const SLIDES_DIR = path.join(process.cwd(), 'public', 'slides');

function readHtmlFiles(dir: string, base = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...readHtmlFiles(full, rel));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      found.push(rel);
    }
  }
  return found;
}

function metaContent(html: string, name: string): string {
  const pattern = new RegExp(
    `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*>`,
    'i',
  );
  const match = html.match(pattern);
  return (match?.[1] || match?.[2] || '').trim();
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return new Date(`${value}T12:00:00Z`);
}

function isTrue(value: string): boolean {
  return /^(1|true|yes)$/i.test(value.trim());
}

export function getTalks(): Talk[] {
  return readHtmlFiles(SLIDES_DIR)
    .map((rel) => {
      const html = fs.readFileSync(path.join(SLIDES_DIR, rel), 'utf8');
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = (titleMatch?.[1] || rel.replace(/\.html$/, '')).trim();
      const dateValue = metaContent(html, 'talk-date');
      return {
        title,
        description: metaContent(html, 'description'),
        date: parseDate(dateValue),
        venue: metaContent(html, 'talk-venue'),
        href: `/slides/${rel}`,
        featured: isTrue(metaContent(html, 'talk-featured')),
        sample: isTrue(metaContent(html, 'talk-sample')),
        notes: isTrue(metaContent(html, 'talk-notes')),
        paperTitle: metaContent(html, 'talk-paper'),
        paperUrl: metaContent(html, 'talk-paper-url'),
        paperId: metaContent(html, 'talk-paper-id'),
      };
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0);
    });
}
