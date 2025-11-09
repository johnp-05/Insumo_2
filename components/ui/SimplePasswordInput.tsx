import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

interface SimplePasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  placeholder?: string;
}

/**
 * SimplePasswordInput - Para Login
 * 
 * Este componente NO valida requisitos de seguridad.
 * Solo verifica que el campo no esté vacío.
 * Perfecto para pantallas de login donde el usuario
 * ya tiene una cuenta creada.
 */
const SimplePasswordInput = ({ 
  value, 
  onChangeText,
  onValidationChange,
  placeholder = 'Password',
}: SimplePasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  
  // Validación simple: solo verificar que no esté vacío
  const isValid = value.length > 0;

  /**
   * Notificar cambios de validación
   * Notifica inmediatamente si hay contenido, no espera a touched
   */
  useEffect(() => {
    onValidationChange?.(isValid);
  }, [value, isValid, onValidationChange]);

  /**
   * Handle blur
   */
  const handleBlur = () => {
    setTouched(true);
    onValidationChange?.(isValid);
  };

  /**
   * Handle text change
   */
  const handleTextChange = (text: string) => {
    onChangeText(text);
  };

  // Determinar color del borde
  const borderColor = touched && !isValid
    ? 'border-red-500' 
    : touched && isValid
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
          autoComplete="password"
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
        
        {touched && isValid && (
          <Text className="text-emerald-400 text-xl ml-2">✓</Text>
        )}
        {touched && !isValid && (
          <Text className="text-red-400 text-xl ml-2">⚠</Text>
        )}
      </View>

      {touched && !isValid && (
        <View className="mt-2 px-2">
          <Text className="text-red-400 text-sm">• Please enter your password</Text>
        </View>
      )}
    </View>
  );
};

export default SimplePasswordInput;