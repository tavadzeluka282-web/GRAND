const fs = require('fs');
const text = fs.readFileSync('/tmp/bundle.js', 'utf8');

// Search for Georgian text
const geoRegex = /[\u10D0-\u10FA][\u10D0-\u10FA\s0-9,.:;!?"'\(\)\-—]{3,80}/g;
const matches = text.match(geoRegex) || [];
const unique = Array.from(new Set(matches.map(s => s.trim()))).filter(s => s.length > 8);
console.log('Total Georgian strings:', unique.length);
console.log('\n--- Sample Georgian Strings ---');
console.log(unique.slice(0, 40).join('\n'));

// Search for object definitions or mock profiles
console.log('\n--- Searching for Profiles / Users ---');
const profileMatches = text.match(/{[^{}]*name:[^{}]*age:[^{}]*}/g) || [];
console.log('Profile objects found:', profileMatches.length);
if (profileMatches.length > 0) {
  console.log(profileMatches.slice(0, 5));
}

// Search for section headings / navigation tabs
console.log('\n--- Searching for Navigation / Tabs / State ---');
const keywords = ['GoldAge', 'Google', 'ქორწინებ', 'გაცნობ', 'პროფილი', 'შეტყობინებ', 'რეგისტრაცია', 'ავტორიზაცია', 'ძებნა'];
keywords.forEach(kw => {
  const count = (text.match(new RegExp(kw, 'g')) || []).length;
  console.log(`${kw}: ${count} occurrences`);
});
