import fs from 'fs/promises';
import path from 'path';

export async function loadTemplate(
  filename: string,
  variables: Record<string, string>
) {
  const filePath = path.join(
    process.cwd(),
    'emails',
    filename
  );

  let html = await fs.readFile(filePath, 'utf8');

  Object.entries(variables).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value);
  });

  return html;
}