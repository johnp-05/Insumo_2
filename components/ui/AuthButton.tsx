import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const AuthButton = ({ title, onPress, variant = 'primary' }: AuthButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className={`${variant === 'primary' ? 'bg-emerald-500' : 'bg-slate-700'} rounded-2xl py-5 px-8 items-center justify-center shadow-lg active:opacity-90`}>
        <Text className="text-white text-lg font-bold tracking-wide">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AuthButton;