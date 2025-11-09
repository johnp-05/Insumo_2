import "@/global.css";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import EmailInput from '@/components/ui/EmailInput';
import PasswordInput from '@/components/ui/PasswordInput';
import { getUsernameFromEmail } from '@/components/ui/EmailUtils';

import { validatePassword } from '@/lib/schemas/LoginValidation';
import { useEffect } from 'react';

// Luego, DENTRO del componente LoginScreen, agrega este useEffect al inicio:

useEffect(() => {
  // TEST DIRECTO DE LA CONTRASEÑA
  const testPassword = 'Code*4567';
  
  console.log('========== INICIO TEST ==========');
  console.log('Testing password:', testPassword);
  console.log('Length:', testPassword.length, '- Required: >= 8');
  console.log('Has uppercase:', /[A-Z]/.test(testPassword), '- Required: true');
  console.log('Has lowercase:', /[a-z]/.test(testPassword), '- Required: true');
  console.log('Has number:', /[0-9]/.test(testPassword), '- Required: true');
  console.log('Has special (any non-alphanumeric):', /[^A-Za-z0-9]/.test(testPassword), '- Required: true');
  
  const result = validatePassword(testPassword);
  console.log('Final validation result:', JSON.stringify(result, null, 2));
  console.log('========== FIN TEST ==========');
}, []);


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const router = useRouter();

  /**
   * Handle login with complete validation
   * 
   * Valida tanto email como contraseña antes de permitir login
   */
  const handleLogin = () => {
    console.log('🔵 Login pressed');
    console.log('Email:', email, '- Valid:', isEmailValid);
    console.log('Password:', password ? '***' : '(empty)', '- Valid:', isPasswordValid);
    
    // Validar email
    if (!isEmailValid) {
      Alert.alert(
        'Email Inválido', 
        'Por favor ingresa un email válido antes de continuar.'
      );
      return;
    }
    
    // Validar contraseña
    if (!isPasswordValid) {
      Alert.alert(
        'Contraseña Inválida',
        'Por favor ingresa una contraseña que cumpla los requisitos de seguridad.'
      );
      return;
    }
    
    // Extraer solo el nombre de usuario
    const username = getUsernameFromEmail(email);
    
    console.log('🟢 Validation passed, navigating to home...');
    console.log('👤 Username extracted:', username);
    router.push(`/home?username=${username}`);
  };

  const handleRegister = () => {
    console.log('🔵 Register pressed - disabled');
    // router.push('/register'); // Disabled for now
  };

  const handleError405 = () => {
    console.log('🔴 Navigating to Error 405...');
    router.push('/error405');
  };

  return (
    <View className="flex-1 bg-slate-950">
      {/* Decorative circles */}
      <View className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-purple-900/30" />
      <View className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-cyan-900/20" />
      
      <View className="flex-1 justify-center px-8">
        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-24 h-24 rounded-full bg-emerald-500 items-center justify-center mb-6">
            <Text className="text-3xl">🎵</Text>
          </View>
          <Text className="text-5xl font-bold text-white mb-2">Soundify</Text>
          <Text className="text-gray-400 text-base">Sign in to continue</Text>
        </View>

        {/* 
          Email Input with Validation
          
          Notice how we:
          1. Pass the value and onChangeText (controlled input)
          2. Get validation status via onValidationChange callback
          3. Enable blur validation (validates when user leaves field)
          
          The EmailInput handles all the validation logic internally,
          keeping this parent component clean and focused
        */}
        <View className="mb-4">
          <EmailInput
            value={email}
            onChangeText={setEmail}
            onValidationChange={setIsEmailValid}
            validateOnBlur={true}
          />
        </View>
        
        {/* 
          Password Input with Validation
          
          Now using the PasswordInput component with full validation,
          strength indicator, and show/hide functionality
        */}
       <View className="mb-4">
       <PasswordInput
          value={password}
          onChangeText={setPassword}
          onValidationChange={setIsPasswordValid}
          placeholder="Password"
        />
      </View>


        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-6" activeOpacity={0.7}>
          <Text className="text-emerald-400 text-sm font-medium">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity 
          onPress={handleLogin}
          activeOpacity={0.8}
          className={`rounded-2xl py-5 px-8 items-center justify-center mb-4 ${
            isEmailValid && isPasswordValid
              ? 'bg-emerald-500' 
              : 'bg-emerald-500/50'
          }`}
        >
          <Text className="text-white text-lg font-bold tracking-wide">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Form Status Indicator */}
        {!isEmailValid && email && (
          <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4">
            <Text className="text-amber-400 text-xs text-center">
              Please enter a valid email to continue
            </Text>
          </View>
        )}
        
        {isEmailValid && !isPasswordValid && password && (
          <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4">
            <Text className="text-amber-400 text-xs text-center">
              Please ensure your password meets security requirements
            </Text>
          </View>
        )}

        {/* Register Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-400 text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister} activeOpacity={0.7} disabled={true}>
            <Text className="text-emerald-500 rounded-2xl text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Error 405 Test Button */}
        <TouchableOpacity 
          onPress={handleError405}
          activeOpacity={0.8}
          className="bg-red-500/20 border-2 border-red-500 rounded-2xl py-4 px-8 items-center justify-center mt-6"
        >
          <Text className="text-red-400 text-base font-bold">
            🚫 Test Error 405
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}