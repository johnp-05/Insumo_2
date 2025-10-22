/**
 * Email validation error messages para validación estricta
 */
export const EMAIL_ERRORS = {
    REQUIRED: 'Email es requerido',
    INVALID_FORMAT: 'El formato del email no es válido',
    TOO_SHORT: 'El email es muy corto',
    USERNAME_TOO_SHORT: 'El nombre de usuario debe tener al menos 5 caracteres',
    SUSPICIOUS_DOMAIN: 'El dominio del email no parece válido',
    INVALID_DOMAIN: 'El dominio del email no parece válido',
    UNKNOWN_ERROR: 'Algo salió mal',
  } as const;
  
  /**
   * Password validation error messages
   */
  export const PASSWORD_ERRORS = {
    REQUIRED: 'La contraseña es requerida',
    TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
    NO_UPPERCASE: 'Debe incluir al menos una letra mayúscula',
    NO_LOWERCASE: 'Debe incluir al menos una letra minúscula',
    NO_NUMBER: 'Debe incluir al menos un número',
    NO_SPECIAL: 'Debe incluir un carácter especial (!@#$%^&*)',
    WEAK: 'La contraseña es muy débil',
    UNKNOWN_ERROR: 'Algo salió mal',
  } as const;
  
  /**
   * General authentication error messages
   */
  export const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
    NETWORK_ERROR: 'Error de red. Intenta nuevamente',
    SERVER_ERROR: 'Error del servidor. Intenta más tarde',
    ACCOUNT_LOCKED: 'Cuenta temporalmente bloqueada',
  } as const;
  
  /**
   * Helper function to get error message by code
   */
  export function getEmailErrorMessage(errorCode: string): string {
    return EMAIL_ERRORS[errorCode as keyof typeof EMAIL_ERRORS] 
      || EMAIL_ERRORS.UNKNOWN_ERROR;
  }
  
  /**
   * Helper function to get password error message by code
   */
  export function getPasswordErrorMessage(errorCode: string): string {
    return PASSWORD_ERRORS[errorCode as keyof typeof PASSWORD_ERRORS] 
      || PASSWORD_ERRORS.UNKNOWN_ERROR;
  }
  
  /**
   * Helper to check if an error code exists
   */
  export function isValidEmailError(code: string): boolean {
    return code in EMAIL_ERRORS;
  }
  
  /**
   * Helper to check if a password error code exists
   */
  export function isValidPasswordError(code: string): boolean {
    return code in PASSWORD_ERRORS;
  }