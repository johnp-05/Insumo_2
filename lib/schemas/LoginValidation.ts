import { z } from 'zod';

/**
 * OPCIÓN 1: Dominios populares que siempre permitimos
 */
const POPULAR_DOMAINS = [
  'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com',
  'live.com', 'msn.com', 'protonmail.com', 'aol.com', 'mail.com',
  'zoho.com', 'yandex.com',
];

/**
 * OPCIÓN 2: Dominios empresariales comunes
 */
const BUSINESS_DOMAIN_PATTERNS = [
  /\.edu$/, /\.gov$/, /\.org$/, /\.net$/, /\.io$/, /\.co$/,
];

function hasValidUsername(email: string): boolean {
  const username = email.split('@')[0];
  return username ? username.length >= 5 : false;
}

function isValidEmailDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  if (POPULAR_DOMAINS.includes(domain)) return true;
  if (BUSINESS_DOMAIN_PATTERNS.some(pattern => pattern.test(domain))) return true;
  if (!domain.includes('.')) return false;
  const parts = domain.split('.');
  if (parts.length < 2) return false;
  if (parts.some(part => part.length < 2)) return false;
  const extension = parts[parts.length - 1];
  if (extension.length < 2 || extension.length > 6) return false;
  if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(domain)) return false;
  if (/(.)\1{3,}/.test(domain)) return false;
  const vowels = (domain.match(/[aeiou]/gi) || []).length;
  const totalLetters = (domain.match(/[a-z]/gi) || []).length;
  if (totalLetters > 10 && vowels / totalLetters < 0.2) return false;
  return true;
}

export const emailSchema = z
  .string()
  .min(1, 'REQUIRED')
  .email('INVALID_FORMAT')
  .min(5, 'TOO_SHORT')
  .refine(hasValidUsername, { message: 'USERNAME_TOO_SHORT' })
  .refine(isValidEmailDomain, { message: 'INVALID_DOMAIN' });

/**
 * Password Schema - SIMPLIFICADO
 * 8+ caracteres, mayúscula, minúscula, número, carácter especial
 */
export const passwordSchema = z
  .string()
  .min(1, 'REQUIRED')
  .min(8, 'TOO_SHORT')
  .regex(/[A-Z]/, 'NO_UPPERCASE')
  .regex(/[a-z]/, 'NO_LOWERCASE')
  .regex(/[0-9]/, 'NO_NUMBER')
  .regex(/[^A-Za-z0-9]/, 'NO_SPECIAL');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function validateEmail(email: string): { success: boolean; error?: string } {
  try {
    emailSchema.parse(email);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message };
    }
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
}

export function validatePassword(password: string): { success: boolean; error?: string } {
  try {
    passwordSchema.parse(password);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message };
    }
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
}

export function validateLoginForm(email: string, password: string): {
  success: boolean;
  errors?: { email?: string; password?: string };
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