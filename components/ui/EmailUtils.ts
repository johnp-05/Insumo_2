/**
 * Extrae el nombre de usuario de un email
 */
export function getUsernameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }
  return email.split('@')[0];
}

/**
 * Capitaliza el primer carácter
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Obtiene un nombre amigable del email
 */
export function getFriendlyName(email: string): string {
  const username = getUsernameFromEmail(email);
  const nameWithSpaces = username.replace(/[._-]/g, ' ').trim();
  return nameWithSpaces.split(' ').map(word => capitalize(word)).join(' ');
}

/**
 * Obtiene el dominio de un email
 */
export function getDomainFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return '';
  }
  return email.split('@')[1] || '';
}

/**
 * Oculta parcialmente un email
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }
  
  const [username, domain] = email.split('@');
  
  if (username.length <= 4) {
    return `${username[0]}***@${domain}`;
  }
  
  const visibleChars = username.slice(0, 4);
  const masked = '*'.repeat(Math.min(username.length - 4, 4));
  
  return `${visibleChars}${masked}@${domain}`;
}