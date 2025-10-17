import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

const albums = [
  { id: 1, title: 'Midnight Vibes', artist: 'DJ Shadow', emoji: '🌙', color: 'bg-purple-600' },
  { id: 2, title: 'Summer Hits', artist: 'Various Artists', emoji: '☀️', color: 'bg-orange-500' },
  { id: 3, title: 'Chill Sessions', artist: 'Lofi Beats', emoji: '🎧', color: 'bg-blue-600' },
  { id: 4, title: 'Rock Classics', artist: 'The Legends', emoji: '🎸', color: 'bg-red-600' },
  { id: 5, title: 'Jazz Cafe', artist: 'Smooth Jazz', emoji: '🎺', color: 'bg-amber-600' },
  { id: 6, title: 'Electronic Dreams', artist: 'Synth Wave', emoji: '⚡', color: 'bg-cyan-600' },
];

const recentPlays = [
  { id: 1, title: 'Starlight', artist: 'Night Riders', duration: '3:45' },
  { id: 2, title: 'Ocean Breeze', artist: 'Wave Makers', duration: '4:20' },
  { id: 3, title: 'City Lights', artist: 'Urban Pulse', duration: '3:12' },
];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const username = params.username as string || 'User';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          className="px-6 pt-16 pb-6"
          style={{ opacity: fadeAnim }}
        >
          <Text className="text-gray-400 text-base mb-2">{getGreeting()}</Text>
          <Text className="text-white text-4xl font-bold">{username}</Text>
        </Animated.View>

        {/* Recently Played */}
        <View className="px-6 mb-8">
          <Text className="text-white text-2xl font-bold mb-4">Recently Played</Text>
          {recentPlays.map((track) => (
            <TouchableOpacity
              key={track.id}
              className="flex-row items-center bg-slate-800/50 rounded-xl p-4 mb-3 border-2 border-slate-700"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 bg-emerald-500 rounded-lg items-center justify-center mr-4">
                <Text className="text-2xl">🎵</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-base font-semibold">{track.title}</Text>
                <Text className="text-gray-400 text-sm">{track.artist}</Text>
              </View>
              <Text className="text-gray-400 text-sm">{track.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Albums Grid */}
        <View className="px-6 mb-8">
          <Text className="text-white text-2xl font-bold mb-4">Popular Albums</Text>
          <View className="flex-row flex-wrap justify-between">
            {albums.map((album) => (
              <TouchableOpacity
                key={album.id}
                className="w-[48%] mb-4"
                activeOpacity={0.8}
              >
                <View className={`${album.color} rounded-2xl p-6 aspect-square items-center justify-center mb-2 shadow-lg`}>
                  <Text className="text-6xl">{album.emoji}</Text>
                </View>
                <Text className="text-white text-base font-semibold" numberOfLines={1}>
                  {album.title}
                </Text>
                <Text className="text-gray-400 text-sm" numberOfLines={1}>
                  {album.artist}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-slate-800 pb-8 pt-4">
        <View className="flex-row justify-around px-6">
          <TouchableOpacity className="items-center" activeOpacity={0.7}>
            <Text className="text-3xl mb-1">🏠</Text>
            <Text className="text-emerald-400 text-xs font-semibold">Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center" 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/library', params: { username } })}
          >
            <Text className="text-3xl mb-1 opacity-50">📚</Text>
            <Text className="text-gray-400 text-xs font-semibold">Library</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="items-center" 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/profile', params: { username } })}
          >
            <Text className="text-3xl mb-1 opacity-50">👤</Text>
            <Text className="text-gray-400 text-xs font-semibold">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}