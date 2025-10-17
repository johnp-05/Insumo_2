import { View, TextInput, Text, TextInputProps } from 'react-native';
import React from 'react';

interface AuthInputProps extends TextInputProps {
  icon: 'person' | 'lock' | 'email';
}

const AuthInput = ({ icon, placeholder, ...props }: AuthInputProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'person':
        return '👤';
      case 'lock':
        return '🔒';
      case 'email':
        return '📧';
      default:
        return '•';
    }
  };

  return (
    <View className="flex-row items-center bg-slate-800/50 rounded-2xl px-5 py-1 border-2 border-slate-700">
      <View className="mr-4">
        <Text className="text-2xl opacity-70">{getIcon()}</Text>
      </View>
      <TextInput
        className="flex-1 text-white text-base py-4"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default AuthInput;