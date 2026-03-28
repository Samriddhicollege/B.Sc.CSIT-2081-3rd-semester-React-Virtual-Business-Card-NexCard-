/**
 * Escape special characters in vCard field values per RFC 6350
 */
function escapeVCardValue(value) {
  if (!value) return '';
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generate a vCard (.vcf) string from person data
 */
export function generateVCard(person) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCardValue(person.name || '')}`,
  ];

  if (person.title) lines.push(`TITLE:${escapeVCardValue(person.title)}`);
  if (person.company) lines.push(`ORG:${escapeVCardValue(person.company)}`);
  if (person.phone) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(person.phone)}`);
  if (person.email) lines.push(`EMAIL:${escapeVCardValue(person.email)}`);
  if (person.web) {
    const url = person.web.startsWith('http') ? person.web : `https://${person.web}`;
    lines.push(`URL:${escapeVCardValue(url)}`);
  }

  // Social links
  if (person.linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeVCardValue(person.linkedin)}`);
  if (person.github) lines.push(`X-SOCIALPROFILE;TYPE=github:${escapeVCardValue(person.github)}`);
  if (person.twitter) lines.push(`X-SOCIALPROFILE;TYPE=twitter:${escapeVCardValue(person.twitter)}`);
  if (person.instagram) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${escapeVCardValue(person.instagram)}`);

  if (person.note) lines.push(`NOTE:${escapeVCardValue(person.note)}`);

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

/**
 * Download a vCard file
 */
export function downloadVCard(person) {
  const vcf = generateVCard(person);
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(person.name || 'contact').replace(/\s+/g, '-').toLowerCase()}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
