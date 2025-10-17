import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

const menuItems = [
  { id: 1, title: 'Account Settings', emoji: '⚙️' },
  { id: 2, title: 'Notifications', emoji: '🔔' },
  { id: 3, title: 'Privacy & Security', emoji: '🔒' },
  { id: 4, title: 'Download Quality', emoji: '⬇️' },
  { id: 5, title: 'Help & Support', emoji: '❓' },
  { id: 6, title: 'About', emoji: 'ℹ️' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const username = params.username as string || 'user@email.com';

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-16 pb-6">
          <Text className="text-white text-4xl font-bold">Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="mx-6 mb-8">
          <View className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl p-8 items-center shadow-lg">
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-xl">
              <Text className="text-4xl">👤</Text>
            </View>
            <Text className="text-white text-2xl font-bold mb-2">Premium User</Text>
            <Text className="text-white/80 text-base">{username}</Text>
            
            <View className="flex-row mt-6 w-full justify-around">
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">127</Text>
                <Text className="text-white/80 text-sm">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">342</Text>
                <Text className="text-white/80 text-sm">Following</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">56</Text>
                <Text className="text-white/80 text-sm">Playlists</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Listening Stats */}
        <View className="px-6 mb-6">
          <Text className="text-white text-xl font-bold mb-4">This Month</Text>
          <View className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-gray-400 text-sm mb-1">Total Hours</Text>
                <Text className="text-white text-3xl font-bold">47.2</Text>
              </View>
              <Text className="text-4xl">🎧</Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <View>
                <Text className="text-gray-400 text-xs">Songs Played</Text>
                <Text className="text-white text-lg font-semibold">892</Text>
              </View>
              <View>
                <Text className="text-gray-400 text-xs">Top Genre</Text>
                <Text className="text-emerald-400 text-lg font-semibold">Pop</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mb-6">
          <Text className="text-white text-xl font-bold mb-4">Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Alert.alert('Coming Soon', `${item.title} will be available soon!`)}
              className="flex-row items-center bg-slate-800/50 rounded-2xl p-4 mb-3 border-2 border-slate-700"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 bg-slate-700 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">{item.emoji}</Text>
              </View>
              <Text className="flex-1 text-white text-base font-medium">{item.title}</Text>
              <Text className="text-gray-400 text-2xl">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-6 mb-8">
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
            <View className="bg-red-500/20 border-2 border-red-500 rounded-2xl py-5 px-8 items-center justify-center">
              <Text className="text-red-400 text-lg font-bold tracking-wide">Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="items-center mb-12">
          <Text className="text-gray-600 text-sm">Spotify Clone v1.0.0</Text>
          <Text className="text-gray-600 text-xs mt-1">Made with ❤️</Text>
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-slate-800 pb-8 pt-4">
        <View className="flex-row justify-around px-6">
          <TouchableOpacity 
            className="items-center" 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/home', params: { username } })}
          >
            <Text className="text-3xl mb-1 opacity-50">🏠</Text>
            <Text className="text-gray-400 text-xs font-semibold">Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center" 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/library', params: { username } })}
          >
            <Text className="text-3xl mb-1 opacity-50">📚</Text>
            <Text className="text-gray-400 text-xs font-semibold">Library</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center" activeOpacity={0.7}>
            <Text className="text-3xl mb-1">👤</Text>
            <Text className="text-emerald-400 text-xs font-semibold">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}