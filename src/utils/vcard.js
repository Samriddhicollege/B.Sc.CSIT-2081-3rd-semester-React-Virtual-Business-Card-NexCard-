/**
 * Generate a vCard (.vcf) string from person data
 */
export function generateVCard(person) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${person.name || ''}`,
  ];

  if (person.title) lines.push(`TITLE:${person.title}`);
  if (person.company) lines.push(`ORG:${person.company}`);
  if (person.phone) lines.push(`TEL;TYPE=CELL:${person.phone}`);
  if (person.email) lines.push(`EMAIL:${person.email}`);
  if (person.web) {
    const url = person.web.startsWith('http') ? person.web : `https://${person.web}`;
    lines.push(`URL:${url}`);
  }

  // Social links
  if (person.linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${person.linkedin}`);
  if (person.github) lines.push(`X-SOCIALPROFILE;TYPE=github:${person.github}`);
  if (person.twitter) lines.push(`X-SOCIALPROFILE;TYPE=twitter:${person.twitter}`);
  if (person.instagram) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${person.instagram}`);

  if (person.note) lines.push(`NOTE:${person.note}`);

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
