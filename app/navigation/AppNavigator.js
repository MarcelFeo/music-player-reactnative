import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';

// icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#ff304f',
        }}
    >
        <Tab.Screen 
            name="Músicas"
            component={AudioList} 
            options={{
                tabBarIcon: ({size, focused}) => <Ionicons name="headset-sharp" size={size} color={focused ? '#ff304f' : '#222'} />
            }} 
        />
        <Tab.Screen 
            name="Player" 
            component={Player} 
            options={{
                tabBarIcon: ({size, focused}) => <Ionicons name="play" size={size} color={focused ? '#ff304f' : '#222'} />
            }} 
        />
        <Tab.Screen 
            name= "Playlist"
            component={PlayList}
            options={{
                tabBarIcon: ({size, focused}) => <MaterialIcons name="my-library-music" size={size} color={focused ? '#ff304f' : '#222'} />
            }} 
        />
    </Tab.Navigator>
  )
}