import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Error405Screen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-950 justify-center items-center px-8">
      {/* Error Icon */}
      <View className="w-32 h-32 bg-red-500/20 rounded-full items-center justify-center mb-8">
        <Text className="text-7xl">⚠️</Text>
      </View>

      {/* Error Code */}
      <Text className="text-red-500 text-8xl font-bold mb-4">405</Text>
      
      {/* Error Title */}
      <Text className="text-white text-3xl font-bold mb-3 text-center">
        Method Not Allowed
      </Text>
      
      {/* Error Description */}
      <Text className="text-gray-400 text-center text-base mb-8 leading-6">
        The request method is not supported for this resource.
        Please check your request and try again.
      </Text>

      {/* Additional Info */}
      <View className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700 mb-8 w-full">
        <Text className="text-gray-300 text-sm text-center">
          This error occurs when the HTTP method used is not allowed
          for the requested endpoint.
        </Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-emerald-500 rounded-2xl py-5 px-12 items-center justify-center mb-4 w-full"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-bold">Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/')}
        className="bg-slate-700 rounded-2xl py-5 px-12 items-center justify-center w-full"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-bold">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}