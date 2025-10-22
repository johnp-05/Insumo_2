import { z } from 'zod';

/**
 * OPCIÓN 1: Dominios populares que siempre permitimos
 * Estos son servicios reales y conocidos
 */
const POPULAR_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'protonmail.com',
  'aol.com',
  'mail.com',
  'zoho.com',
  'yandex.com',
];

/**
 * OPCIÓN 2: Dominios empresariales comunes
 * Muchas empresas usan estos proveedores
 */
const BUSINESS_DOMAIN_PATTERNS = [
  /\.edu$/,     // Universidades
  /\.gov$/,     // Gobierno
  /\.org$/,     // Organizaciones
  /\.net$/,     // Redes
  /\.io$/,      // Tech startups
  /\.co$/,      // Empresas
];

/**
 * Validar que el usuario (parte antes del @) tenga al menos 5 caracteres
 */
function hasValidUsername(email: string): boolean {
  const username = email.split('@')[0];
  return username ? username.length >= 5 : false;
}

/**
 * Validación inteligente de dominio
 * Combina lista blanca + validación de estructura
 */
function isValidEmailDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // ✅ PASO 1: ¿Es un dominio popular conocido?
  if (POPULAR_DOMAINS.includes(domain)) {
    return true;
  }

  // ✅ PASO 2: ¿Coincide con patrón empresarial?
  if (BUSINESS_DOMAIN_PATTERNS.some(pattern => pattern.test(domain))) {
    return true;
  }

  // ✅ PASO 3: Si no está en la lista, verificar estructura
  // Debe tener al menos un punto
  if (!domain.includes('.')) return false;

  const parts = domain.split('.');
  
  // Debe tener al menos 2 partes (ej: google.com)
  if (parts.length < 2) return false;

  // Cada parte debe tener al menos 2 caracteres
  if (parts.some(part => part.length < 2)) return false;

  // La extensión final debe ser válida (2-6 caracteres)
  const extension = parts[parts.length - 1];
  if (extension.length < 2 || extension.length > 6) return false;

  // ❌ FILTRO ANTI-SPAM: Detectar dominios sospechosos
  // Dominios con demasiadas consonantes seguidas son sospechosos
  if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(domain)) {
    return false;
  }

  // ❌ NUEVO: Rechazar letras repetidas excesivamente (zzzzz, aaaaa)
  if (/(.)\1{3,}/.test(domain)) {
    return false;
  }

  // Contar vocales vs consonantes
  const vowels = (domain.match(/[aeiou]/gi) || []).length;
  const totalLetters = (domain.match(/[a-z]/gi) || []).length;
  
  // Si tiene menos del 20% de vocales, probablemente es spam
  if (totalLetters > 10 && vowels / totalLetters < 0.2) {
    return false;
  }

  // Si pasó todas las validaciones, es aceptable
  return true;
}

/**
 * Email validation schema con validación inteligente
 */
export const emailSchema = z
  .string()
  .min(1, 'REQUIRED')
  .email('INVALID_FORMAT')
  .min(5, 'TOO_SHORT')
  .refine(hasValidUsername, {
    message: 'USERNAME_TOO_SHORT',
  })
  .refine(isValidEmailDomain, {
    message: 'INVALID_DOMAIN',
  });

/**
 * Password validation schema
 * 
 * Requisitos de seguridad:
 * 1. Mínimo 8 caracteres
 * 2. Al menos una letra mayúscula
 * 3. Al menos una letra minúscula
 * 4. Al menos un número
 * 5. Al menos un carácter especial (!@#$%^&*(),.?":{}|<>)
 */
export const passwordSchema = z
  .string()
  .min(1, 'REQUIRED')
  .min(8, 'TOO_SHORT')
  .regex(/[A-Z]/, 'NO_UPPERCASE')
  .regex(/[a-z]/, 'NO_LOWERCASE')
  .regex(/[0-9]/, 'NO_NUMBER')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'NO_SPECIAL');

/**
 * Complete login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * TypeScript type inference
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Helper function to validate email
 */
export function validateEmail(email: string): { 
  success: boolean; 
  error?: string;
} {
  try {
    emailSchema.parse(email);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0]?.message 
      };
    }
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
}

/**
 * Helper function to validate password
 */
export function validatePassword(password: string): { 
  success: boolean; 
  error?: string;
} {
  try {
    passwordSchema.parse(password);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0]?.message 
      };
    }
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
}

/**
 * Helper function to validate complete login form
 */
export function validateLoginForm(email: string, password: string): {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
} {
  try {
    loginSchema.parse({ email, password });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: { email?: string; password?: string } = {};
      
      error.errors.forEach((err) => {
        const field = err.path[0] as 'email' | 'password';
        if (field && !errors[field]) {
          errors[field] = err.message;
        }
      });
      
      return { success: false, errors };
    }
    return { success: false, errors: { email: 'UNKNOWN_ERROR' } };
  }
}

/**
 * 🧪 FUNCIÓN PARA TESTING
 * Útil para probar diferentes emails
 */
export function testEmail(email: string): void {
  const result = validateEmail(email);
  console.log(`📧 Testing: ${email}`);
  console.log(`✅ Valid: ${result.success}`);
  if (!result.success) {
    console.log(`❌ Error: ${result.error}`);
  }
  console.log('---');
}