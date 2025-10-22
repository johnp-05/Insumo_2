import { View, TextInput, Text, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { validateEmail } from '@/lib/schemas/LoginValidation';
import { getEmailErrorMessage } from '@/lib/constants/ErrorMessages';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  validateOnBlur?: boolean;
  showErrorImmediately?: boolean;
}

/**
 * EmailInput Component with Real-time Validation
 * 
 * This component demonstrates the complete validation workflow:
 * 1. User types → value updates
 * 2. On blur (or immediately) → validate against schema
 * 3. If invalid → show user-friendly error from constants
 * 4. Animate the error in/out for smooth UX
 */
const EmailInput = ({ 
  value, 
  onChangeText,
  onValidationChange,
  validateOnBlur = true,
  showErrorImmediately = false
}: EmailInputProps) => {
  // State to track validation status
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  
  // Animation for error message entrance
  const errorOpacity = useRef(new Animated.Value(0)).current;

  /**
   * Validate the email and update error state
   * 
   * This is where our schema (validation rules) and
   * constants (error messages) come together
   */
  const handleValidation = () => {
    const result = validateEmail(value);
    
    if (result.success) {
      setError(null);
      onValidationChange?.(true);
    } else {
      // Convert error code to user-friendly message
      const errorMessage = getEmailErrorMessage(result.error || '');
      setError(errorMessage);
      onValidationChange?.(false);
    }
  };

  /**
   * Animate error message appearance
   * 
   * Smooth animations make validation feel less jarring
   * and more professional
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
  }, [error]);

  /**
   * Handle blur event (when user leaves the field)
   * 
   * This is a common pattern: validate when the user
   * finishes entering data, not while they're typing
   */
  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      handleValidation();
    }
  };

  /**
   * Handle text change
   * 
   * If showErrorImmediately is true, validate as they type
   * Otherwise, just update the value
   */
  const handleTextChange = (text: string) => {
    onChangeText(text);
    
    // Clear error when user starts typing (if they've already seen an error)
    if (error && touched) {
      setError(null);
    }
    
    // Optionally validate immediately (useful for real-time feedback)
    if (showErrorImmediately && touched) {
      setTimeout(() => handleValidation(), 500); // Debounce by 500ms
    }
  };

  // Determine border color based on validation state
  const borderColor = error 
    ? 'border-red-500' 
    : touched && !error && value 
    ? 'border-emerald-500' 
    : 'border-slate-700';

  return (
    <View className="w-full">
      {/* Input Container */}
      <View className={`flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 ${borderColor} transition-colors`}>
        <View className="mr-4">
          <Text className="text-2xl opacity-70">📧</Text>
        </View>
        <TextInput
          className="flex-1 text-white text-base py-4"
          placeholder="Email or Username"
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
        
        {/* Validation Status Indicator */}
        {touched && !error && value && (
          <Text className="text-emerald-400 text-xl">✓</Text>
        )}
        {error && (
          <Text className="text-red-400 text-xl">⚠</Text>
        )}
      </View>

      {/* Error Message with Animation */}
      {error && (
        <Animated.View 
          style={{ opacity: errorOpacity }}
          className="mt-2 px-2"
        >
          <View className="flex-row items-center">
            <Text className="text-red-400 text-sm">• {error}</Text>
          </View>
        </Animated.View>
      )}

      {/* Helper Text (shown when no error) */}
      {!error && touched && value && (
        <View className="mt-2 px-2">
          <Text className="text-emerald-400 text-xs">
            Looks good!
          </Text>
        </View>
      )}
    </View>
  );
};

export default EmailInput;