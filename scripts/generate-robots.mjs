import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteEnv = process.env.PUBLIC_SITE_ENV === 'production' ? 'production' : 'staging';

const robotsContent =
  siteEnv === 'production'
    ? `User-agent: *
Allow: /

Sitemap: https://www.portable-fire-pumps.com/sitemap-index.xml
`
    : `User-agent: *
Disallow: /
`;

const robotsPath = resolve(process.cwd(), 'public', 'robots.txt');
writeFileSync(robotsPath, robotsContent, 'utf8');

console.log(`Generated robots.txt for ${siteEnv} environment at ${robotsPath}`);
