import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

const playlists = [
  { id: 1, name: 'My Favorites', tracks: 47, emoji: '❤️', color: 'bg-rose-600' },
  { id: 2, name: 'Workout Mix', tracks: 32, emoji: '💪', color: 'bg-orange-600' },
  { id: 3, name: 'Study Session', tracks: 28, emoji: '📖', color: 'bg-blue-600' },
  { id: 4, name: 'Party Time', tracks: 55, emoji: '🎉', color: 'bg-purple-600' },
  { id: 5, name: 'Relax & Chill', tracks: 41, emoji: '🧘', color: 'bg-green-600' },
  { id: 6, name: 'Road Trip', tracks: 38, emoji: '🚗', color: 'bg-yellow-600' },
];

export default function LibraryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const username = params.username as string || 'User';
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-16 pb-6">
          <Text className="text-white text-4xl font-bold mb-6">Your Library</Text>
          
          {/* Filters */}
          <View className="flex-row space-x-3">
            {['all', 'playlists', 'artists'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full ${
                  selectedFilter === filter ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <Text className={`font-semibold capitalize ${
                  selectedFilter === filter ? 'text-white' : 'text-gray-400'
                }`}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-around bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700">
            <View className="items-center">
              <Text className="text-3xl font-bold text-emerald-400">241</Text>
              <Text className="text-gray-400 text-sm mt-1">Songs</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-emerald-400">{playlists.length}</Text>
              <Text className="text-gray-400 text-sm mt-1">Playlists</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-emerald-400">42</Text>
              <Text className="text-gray-400 text-sm mt-1">Artists</Text>
            </View>
          </View>
        </View>

        {/* Playlists */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-2xl font-bold">Your Playlists</Text>
            <TouchableOpacity className="bg-emerald-500 rounded-full px-4 py-2">
              <Text className="text-white font-semibold">+ New</Text>
            </TouchableOpacity>
          </View>
          
          {playlists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              className="flex-row items-center bg-slate-800/50 rounded-2xl p-4 mb-3 border-2 border-slate-700"
              activeOpacity={0.7}
            >
              <View className={`${playlist.color} w-16 h-16 rounded-xl items-center justify-center mr-4 shadow-lg`}>
                <Text className="text-3xl">{playlist.emoji}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{playlist.name}</Text>
                <Text className="text-gray-400 text-sm">{playlist.tracks} tracks</Text>
              </View>
              <Text className="text-gray-400 text-2xl">›</Text>
            </TouchableOpacity>
          ))}
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
          
          <TouchableOpacity className="items-center" activeOpacity={0.7}>
            <Text className="text-3xl mb-1">📚</Text>
            <Text className="text-emerald-400 text-xs font-semibold">Library</Text>
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