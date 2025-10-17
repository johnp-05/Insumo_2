import "@/global.css";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('🔵 Login pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    console.log('🟢 Navigating to home...');
    router.push(`/home?username=${email}`);
  };

  const handleRegister = () => {
    console.log('🔵 Register pressed - disabled');
    // router.push('/register'); // Deshabilitado
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
          <Text className="text-5xl font-bold text-white mb-2">Spotify Clone</Text>
          <Text className="text-gray-400 text-base">Sign in to continue</Text>
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <View className="flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 border-slate-700">
            <View className="mr-4">
              <Text className="text-2xl opacity-70">📧</Text>
            </View>
            <TextInput
              className="flex-1 text-white text-base py-4"
              placeholder="Email o Username"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        
        {/* Password Input */}
        <View className="mb-4">
          <View className="flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 border-slate-700">
            <View className="mr-4">
              <Text className="text-2xl opacity-70">🔒</Text>
            </View>
            <TextInput
              className="flex-1 text-white text-base py-4"
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-6" activeOpacity={0.7}>
          <Text className="text-emerald-400 text-sm font-medium">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity 
          onPress={handleLogin}
          activeOpacity={0.8}
          className="bg-emerald-500 rounded-2xl py-5 px-8 items-center justify-center mb-4"
        >
          <Text className="text-white text-lg font-bold tracking-wide">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Register Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-400 text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister} activeOpacity={0.7} disabled={true}>
            <Text className="text-emerald-500 rounded-2xl text-base font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Error 405 Button */}
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