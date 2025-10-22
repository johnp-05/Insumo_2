/**
 * Utilidades para trabajar con emails
 */

/**
 * Extrae el nombre de usuario de un email
 * 
 * @param email - El email completo
 * @returns El nombre antes del @
 * 
 * @example
 * getUsernameFromEmail('juan.perez@gmail.com') // 'juan.perez'
 * getUsernameFromEmail('admin@empresa.com') // 'admin'
 */
export function getUsernameFromEmail(email: string): string {
    if (!email || !email.includes('@')) {
      return email; // Si no es un email válido, devolver tal cual
    }
    
    return email.split('@')[0];
  }
  
  /**
   * Capitaliza el primer carácter de una cadena
   * 
   * @param text - Texto a capitalizar
   * @returns Texto con primera letra mayúscula
   * 
   * @example
   * capitalize('juan') // 'Juan'
   * capitalize('PEDRO') // 'Pedro'
   */
  export function capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  
  /**
   * Obtiene un nombre amigable del email
   * Extrae el username y lo capitaliza, reemplazando puntos/guiones por espacios
   * 
   * @param email - El email completo
   * @returns Nombre formateado de forma amigable
   * 
   * @example
   * getFriendlyName('juan.perez@gmail.com') // 'Juan Perez'
   * getFriendlyName('admin_user@empresa.com') // 'Admin User'
   * getFriendlyName('john@example.com') // 'John'
   */
  export function getFriendlyName(email: string): string {
    const username = getUsernameFromEmail(email);
    
    // Reemplazar puntos, guiones y guiones bajos por espacios
    const nameWithSpaces = username
      .replace(/[._-]/g, ' ')
      .trim();
    
    // Capitalizar cada palabra
    return nameWithSpaces
      .split(' ')
      .map(word => capitalize(word))
      .join(' ');
  }
  
  /**
   * Obtiene el dominio de un email
   * 
   * @param email - El email completo
   * @returns El dominio (después del @)
   * 
   * @example
   * getDomainFromEmail('user@gmail.com') // 'gmail.com'
   */
  export function getDomainFromEmail(email: string): string {
    if (!email || !email.includes('@')) {
      return '';
    }
    
    return email.split('@')[1] || '';
  }
  
  /**
   * Oculta parcialmente un email para privacidad
   * 
   * @param email - El email completo
   * @returns Email parcialmente oculto
   * 
   * @example
   * maskEmail('juanperez@gmail.com') // 'juan****@gmail.com'
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