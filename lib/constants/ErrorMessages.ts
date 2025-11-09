/**
 * EMAIL ERRORS
 */
export const EMAIL_ERRORS = {
  REQUIRED: 'El email es requerido',
  INVALID_FORMAT: 'El formato del email no es válido',
  TOO_SHORT: 'El email es muy corto',
  USERNAME_TOO_SHORT: 'El nombre de usuario debe tener al menos 5 caracteres',
  INVALID_DOMAIN: 'El dominio del email no parece válido',
  UNKNOWN_ERROR: 'Algo salió mal',
} as const;

/**
 * PASSWORD ERRORS
 */
export const PASSWORD_ERRORS = {
  REQUIRED: 'La contraseña es requerida',
  TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
  NO_UPPERCASE: 'Debe incluir al menos una letra mayúscula',
  NO_LOWERCASE: 'Debe incluir al menos una letra minúscula',
  NO_NUMBER: 'Debe incluir al menos un número',
  NO_SPECIAL: 'Debe incluir un carácter especial (!@#$%^&*-_+=)',
  WEAK: 'La contraseña es muy débil',
  UNKNOWN_ERROR: 'Algo salió mal',
} as const;

/**
 * AUTH ERRORS
 */
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
  NETWORK_ERROR: 'Error de red. Intenta nuevamente',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde',
  ACCOUNT_LOCKED: 'Cuenta temporalmente bloqueada',
} as const;

/**
 * GET EMAIL ERROR MESSAGE
 */
export function getEmailErrorMessage(errorCode: string): string {
  return EMAIL_ERRORS[errorCode as keyof typeof EMAIL_ERRORS] 
    || EMAIL_ERRORS.UNKNOWN_ERROR;
}

/**
 * GET PASSWORD ERROR MESSAGE
 */
export function getPasswordErrorMessage(errorCode: string): string {
  return PASSWORD_ERRORS[errorCode as keyof typeof PASSWORD_ERRORS] 
    || PASSWORD_ERRORS.UNKNOWN_ERROR;
}

/**
 * CHECK IF VALID EMAIL ERROR
 */
export function isValidEmailError(code: string): boolean {
  return code in EMAIL_ERRORS;
}

/**
 * CHECK IF VALID PASSWORD ERROR
 */
export function isValidPasswordError(code: string): boolean {
  return code in PASSWORD_ERRORS;
}