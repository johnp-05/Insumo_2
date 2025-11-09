import { View, TextInput, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { validatePassword } from '@/lib/schemas/LoginValidation';
import { getPasswordErrorMessage } from '@/lib/constants/ErrorMessages';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  validateOnBlur?: boolean;
  showErrorImmediately?: boolean;
  placeholder?: string;
}

/**
 * PasswordInput Component con Validación Robusta
 * 
 * Características:
 * - Validación de requisitos de seguridad
 * - Mostrar/ocultar contraseña
 * - Indicadores visuales de fortaleza
 * - Mensajes de error amigables
 */
const PasswordInput = ({ 
  value, 
  onChangeText,
  onValidationChange,
  validateOnBlur = true,
  showErrorImmediately = false,
  placeholder = 'Contraseña',
}: PasswordInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const errorOpacity = useRef(new Animated.Value(0)).current;

  /**
   * Validar la contraseña
   */
  const handleValidation = useCallback(() => {
    if (!value) return;
    
    // 🔍 DEBUG: Ver qué está pasando
    console.log('🔍 Validating password:', value);
    console.log('🔍 Length:', value.length);
    console.log('🔍 Has uppercase:', /[A-Z]/.test(value));
    console.log('🔍 Has lowercase:', /[a-z]/.test(value));
    console.log('🔍 Has number:', /[0-9]/.test(value));
    console.log('🔍 Has special char:', /[^A-Za-z0-9]/.test(value));
    
    const result = validatePassword(value);
    console.log('🔍 Validation result:', result);
    
    if (result.success) {
      setError(null);
      onValidationChange?.(true);
      console.log('🔍 ✅ Password is VALID');
    } else {
      const errorMessage = getPasswordErrorMessage(result.error || '');
      setError(errorMessage);
      onValidationChange?.(false);
      console.log('🔍 ❌ Password is INVALID:', errorMessage);
    }
  }, [value, onValidationChange]);

  /**
   * Calcular fortaleza de la contraseña
   * Retorna: 'weak', 'medium', 'strong'
   */
  const getPasswordStrength = (): 'weak' | 'medium' | 'strong' => {
    if (!value) return 'weak';
    
    let strength = 0;
    
    // Criterios de fortaleza
    if (value.length >= 8) strength++;
    if (value.length >= 12) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  };

  /**
   * Obtener color según fortaleza
   */
  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-emerald-500';
    }
  };

  /**
   * Obtener texto de fortaleza
   */
  const getStrengthText = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 'weak': return 'Débil';
      case 'medium': return 'Media';
      case 'strong': return 'Fuerte';
    }
  };

  /**
   * Animar error
   */
  useEffect(() => {
    if (error) {
      Animated.timing(errorOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [error, errorOpacity]);

  /**
   * Validar automáticamente cuando cambia el valor (si ya fue touched)
   */
  useEffect(() => {
    if (touched && value) {
      const timer = setTimeout(() => {
        handleValidation();
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (touched && !value) {
      onValidationChange?.(false);
    }
  }, [value, touched, handleValidation, onValidationChange]);

  /**
   * Handle blur
   */
  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur && value) {
      handleValidation();
    }
  };

  /**
   * Handle text change
   */
  const handleTextChange = (text: string) => {
    onChangeText(text);
    
    if (error && touched) {
      setError(null);
    }
  };

  // Determinar color del borde
  const borderColor = error 
    ? 'border-red-500' 
    : touched && !error && value 
    ? 'border-emerald-500' 
    : 'border-slate-700';

  return (
    <View className="w-full">
      <View className={`flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 ${borderColor}`}>
        <View className="mr-4">
          <Text className="text-2xl opacity-70">🔒</Text>
        </View>
        <TextInput
          className="flex-1 text-white text-base py-4"
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          className="ml-2"
          activeOpacity={0.7}
        >
          <Text className="text-xl">
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
        
        {touched && !error && value && (
          <Text className="text-emerald-400 text-xl ml-2">✓</Text>
        )}
        {error && (
          <Text className="text-red-400 text-xl ml-2">⚠</Text>
        )}
      </View>

      {value && touched && !error ? (
        <View className="mt-2 px-2">
          <View className="flex-row items-center">
            <Text className="text-gray-400 text-xs mr-2">Fortaleza:</Text>
            <View className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <View 
                className={`h-full ${getStrengthColor()}`}
                style={{ 
                  width: getPasswordStrength() === 'weak' ? '33%' : 
                         getPasswordStrength() === 'medium' ? '66%' : '100%' 
                }}
              />
            </View>
            <Text className={`text-xs ml-2 ${
              getPasswordStrength() === 'weak' ? 'text-red-400' :
              getPasswordStrength() === 'medium' ? 'text-yellow-400' :
              'text-emerald-400'
            }`}>
              {getStrengthText()}
            </Text>
          </View>
        </View>
      ) : null}

      {error ? (
        <Animated.View 
          style={{ opacity: errorOpacity }}
          className="mt-2 px-2"
        >
          <Text className="text-red-400 text-sm">• {error}</Text>
        </Animated.View>
      ) : null}

      {value && !error && touched ? (
        <View className="mt-2 px-2">
          <Text className="text-emerald-400 text-xs">
            ✓ Cumple con todos los requisitos
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PasswordInput;