import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Slider from '@react-native-community/slider';
import color from '../misc/color';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider'

export default function Player() {
  const context = useContext(AudioContext)

  const { playbackPosition, playbackDuration } = context;

  const calculateSeebBar = () => {
    if(playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.midBannerContainer}>
        <MaterialCommunityIcons 
          name="music-circle" 
          size={300} 
          color={context.isPlaying ? "#ff304f" : color.FONT_MEDIUM} 
        />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text 
          style={styles.audioTitle} 
          numberOfLines={1}
        >
          {context.currentAudio.filename}
        </Text>
        <Slider
          style={{width:350, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={color.FONT_LIGHT}
          maximumTrackTintColor={color.FONT_LIGHT}
          thumbTintColor={color.FONT}
          value={calculateSeebBar()}
        />
        <View style={styles.audioControllers}>
          <PlayerButton iconType='PREV' />
          <PlayerButton 
            style={{ marginHorizontal: 15 }} 
            iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
            onPress={() => console.log('playing')}
          />
          <PlayerButton iconType='NEXT' />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    audioTitle: {
      fontSize: 16,
      color: color.FONT_LIGHT,
      padding: 15,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    audioControllers: {
      width: 350, 
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 10,
    }
})