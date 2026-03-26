import { execSync } from 'node:child_process';
import path from 'node:path';

const queuePath = path.posix.join('docs', 'seo', 'reindex-queue.csv');

const seoImpactMatchers = [
  /^src\/pages\/(en|fr)\//,
  /^src\/utils\/nonProductMetadata\.ts$/,
  /^src\/utils\/productMetadata\.ts$/,
  /^src\/layouts\/BaseLayout\.astro$/,
  /^src\/components\/navigation\/Header\.astro$/,
  /^src\/components\/navigation\/Footer\.astro$/,
  /^astro\.config\./,
  /^public\/_redirects$/,
];

const readChanged = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8' })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
};

const staged = readChanged('git diff --name-only --cached');
const changedFiles = staged.length > 0 ? staged : readChanged('git diff --name-only');

if (changedFiles.length === 0) {
  console.log('seo:queue:check - no changed files detected');
  process.exit(0);
}

const seoImpactFiles = changedFiles.filter((file) =>
  seoImpactMatchers.some((matcher) => matcher.test(file))
);
const queueTouched = changedFiles.includes(queuePath);

if (seoImpactFiles.length > 0 && !queueTouched) {
  console.error('seo:queue:check failed');
  console.error('SEO-impacting files changed, but reindex queue was not updated.');
  console.error('Changed SEO-impacting files:');
  seoImpactFiles.forEach((file) => console.error(`- ${file}`));
  console.error(`Update ${queuePath} and rerun npm run seo:queue:check`);
  process.exit(1);
}

console.log('seo:queue:check passed');
