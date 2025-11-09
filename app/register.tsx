import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import EmailInput from '@/components/ui/EmailInput';
import PasswordInput from '@/components/ui/PasswordInput';
import { getUsernameFromEmail } from '@/components/ui/EmailUtils';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  /**
   * Validar nombre completo
   */
  const isValidFullName = fullName.trim().length >= 3;

  /**
   * Validar que las contraseñas coincidan
   */
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  /**
   * Validar formulario completo
   */
  const canRegister = isValidFullName && isEmailValid && isPasswordValid && passwordsMatch && acceptedTerms;

  /**
   * Handle registration
   */
  const handleRegister = () => {
    console.log('🔵 Register button pressed');
    
    // Validar nombre completo
    if (!isValidFullName) {
      Alert.alert(
        'Nombre Inválido',
        'Por favor ingresa tu nombre completo (mínimo 3 caracteres).'
      );
      return;
    }
    
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
    
    // Validar que las contraseñas coincidan
    if (!passwordsMatch) {
      Alert.alert(
        'Contraseñas no coinciden',
        'Las contraseñas ingresadas no son iguales.'
      );
      return;
    }
    
    // Validar términos y condiciones
    if (!acceptedTerms) {
      Alert.alert(
        'Términos y Condiciones',
        'Debes aceptar los términos y condiciones para continuar.'
      );
      return;
    }
    
    const username = getUsernameFromEmail(email);
    
    console.log('🟢 Registration successful!');
    console.log('👤 Username:', username);
    console.log('📧 Email:', email);
    console.log('🏷️  Full Name:', fullName);
    
    // Mostrar mensaje de éxito y navegar
    Alert.alert(
      '¡Cuenta Creada! 🎉',
      `Bienvenido ${fullName}! Tu cuenta ha sido creada exitosamente.`,
      [
        {
          text: 'Comenzar',
          onPress: () => router.replace(`/home?username=${username}`),
        },
      ]
    );
  };

  /**
   * Navegar de vuelta al login
   */
  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-slate-950">
      {/* Decorative circles */}
      <View className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-900/30" />
      <View className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-900/20" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-1 justify-center px-8 pt-16">
          {/* Back Button */}
          <TouchableOpacity 
            onPress={handleBackToLogin}
            className="mb-8"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <Text className="text-emerald-400 text-3xl mr-2">←</Text>
              <Text className="text-emerald-400 text-base font-semibold">Back to Login</Text>
            </View>
          </TouchableOpacity>

          {/* Logo & Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-full bg-emerald-500 items-center justify-center mb-4 shadow-lg">
              <Text className="text-3xl">🎵</Text>
            </View>
            <Text className="text-5xl font-bold text-white mb-2">Create Account</Text>
            <Text className="text-gray-400 text-base">Join Soundify today</Text>
          </View>

          {/* Full Name Input */}
          <View className="mb-4">
            <View className={`flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 ${
              fullName.length > 0 && !isValidFullName
                ? 'border-red-500'
                : fullName.length > 0 && isValidFullName
                ? 'border-emerald-500'
                : 'border-slate-700'
            }`}>
              <View className="mr-4">
                <Text className="text-2xl opacity-70">👤</Text>
              </View>
              <TextInput
                className="flex-1 text-white text-base py-4"
                placeholder="Full Name"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {isValidFullName && (
                <Text className="text-emerald-400 text-xl">✓</Text>
              )}
            </View>
            
            {fullName.length > 0 && !isValidFullName && (
              <View className="mt-2 px-2">
                <Text className="text-red-400 text-sm">• El nombre debe tener al menos 3 caracteres</Text>
              </View>
            )}
            
            {isValidFullName && (
              <View className="mt-2 px-2">
                <Text className="text-emerald-400 text-xs">✓ Nombre válido</Text>
              </View>
            )}
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <EmailInput
              value={email}
              onChangeText={setEmail}
              onValidationChange={setIsEmailValid}
              validateOnBlur={true}
            />
          </View>
          
          {/* Password Input */}
          <View className="mb-4">
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              onValidationChange={setIsPasswordValid}
              placeholder="Password"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-4">
            <View className={`flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 ${
              confirmPassword && !passwordsMatch
                ? 'border-red-500'
                : confirmPassword && passwordsMatch
                ? 'border-emerald-500'
                : 'border-slate-700'
            }`}>
              <View className="mr-4">
                <Text className="text-2xl opacity-70">🔒</Text>
              </View>
              <TextInput
                className="flex-1 text-white text-base py-4"
                placeholder="Confirm Password"
                placeholderTextColor="#94a3b8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2"
                activeOpacity={0.7}
              >
                <Text className="text-xl">
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
              
              {passwordsMatch && (
                <Text className="text-emerald-400 text-xl ml-2">✓</Text>
              )}
              {confirmPassword && !passwordsMatch && (
                <Text className="text-red-400 text-xl ml-2">⚠</Text>
              )}
            </View>
            
            {confirmPassword && !passwordsMatch && (
              <View className="mt-2 px-2">
                <Text className="text-red-400 text-sm">• Las contraseñas no coinciden</Text>
              </View>
            )}
            
            {passwordsMatch && (
              <View className="mt-2 px-2">
                <Text className="text-emerald-400 text-xs">✓ Las contraseñas coinciden</Text>
              </View>
            )}
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity 
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            className="flex-row items-start mb-6 mt-2"
            activeOpacity={0.7}
          >
            <View className={`w-6 h-6 rounded-md border-2 items-center justify-center mr-3 mt-0.5 ${
              acceptedTerms ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
            }`}>
              {acceptedTerms && (
                <Text className="text-white text-sm font-bold">✓</Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="text-gray-300 text-sm leading-5">
                I agree to the{' '}
                <Text className="text-emerald-400 font-semibold">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-emerald-400 font-semibold">Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity 
            onPress={handleRegister}
            activeOpacity={0.8}
            disabled={!canRegister}
            className={`rounded-2xl py-5 px-8 items-center justify-center mb-4 shadow-lg ${
              canRegister ? 'bg-emerald-500' : 'bg-emerald-500/50'
            }`}
          >
            <Text className="text-white text-lg font-bold tracking-wide">
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Form Status Indicator */}
          {!canRegister && (fullName || email || password || confirmPassword) && (
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4">
              <Text className="text-amber-400 text-xs text-center">
                {!isValidFullName && fullName
                  ? '• Complete your full name (minimum 3 characters)'
                  : !isEmailValid && email
                  ? '• Please enter a valid email'
                  : !isPasswordValid && password
                  ? '• Password must meet security requirements'
                  : !passwordsMatch && confirmPassword
                  ? '• Passwords must match'
                  : !acceptedTerms
                  ? '• Please accept the terms and conditions'
                  : '• Complete all fields to continue'}
              </Text>
            </View>
          )}

          {/* Already have account */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-400 text-base">Already have an account? </Text>
            <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
              <Text className="text-emerald-500 text-base font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="mt-8 mb-6">
            <View className="flex-row items-center">
              <View className="flex-1 h-px bg-slate-700" />
              <Text className="text-gray-400 text-sm mx-4">Or continue with</Text>
              <View className="flex-1 h-px bg-slate-700" />
            </View>
          </View>

          {/* Social Sign Up Options */}
          <View className="flex-row justify-between space-x-4 mb-8">
            <TouchableOpacity 
              className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl py-4 flex-1 items-center mr-2"
              activeOpacity={0.7}
              onPress={() => Alert.alert('Coming Soon', 'Google sign up will be available soon!')}
            >
              <Text className="text-3xl mb-2">🔵</Text>
              <Text className="text-gray-300 text-sm font-medium">Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl py-4 flex-1 items-center ml-2"
              activeOpacity={0.7}
              onPress={() => Alert.alert('Coming Soon', 'Apple sign up will be available soon!')}
            >
              <Text className="text-3xl mb-2">🍎</Text>
              <Text className="text-gray-300 text-sm font-medium">Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}