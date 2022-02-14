import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import Playlist from '../screens/Playlist';

// icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name="AudioList" 
            component={AudioList} 
            options={{
                tabBarIcon: ({color, size}) => <Ionicons name="headset-sharp" size={size} color={color} />
            }} 
        />
        <Tab.Screen 
            name="Player" 
            component={Player} 
            options={{
                tabBarIcon: ({color, size}) => <Ionicons name="play" size={size} color={color} />
            }} 
        />
        <Tab.Screen 
            name="Playlist" 
            component={Playlist}
            options={{
                tabBarIcon: ({color, size}) => <MaterialIcons name="my-library-music" size={size} color={color} />
            }} 
        />
    </Tab.Navigator>
  )
}