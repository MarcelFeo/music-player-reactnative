import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import color from '../misc/color';

// icons 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const convertTime = minutes => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
  
      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }
  
      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }
  
      if (sec < 10) {
        return `${minute}:0${sec}`;
      }
  
      return `${minute}:${sec}`;
    }
};

const renderPlayPauseIcon = isPlaying => {
    if(isPlaying) return <AntDesign name="pause" size={30} color="#ff304f" />
    return <Entypo name="controller-play" size={30} color="#ff304f" />
}

export default function AudioListItem({ 
    title, 
    duration, 
    onOptionPress, 
    onAudioPress, 
    isPlaying,
    activeListItem
}) {
  return (
    <>  
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={onAudioPress}
            >
                <View style={styles.leftContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>
                            {activeListItem ? renderPlayPauseIcon(isPlaying) : <Text>♫</Text>}
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text 
                            numberOfLines={1} 
                            style={styles.title}
                        >
                            {title}
                        </Text>
                        <Text style={styles.time}>{convertTime(duration)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity 
                style={styles.rightContainer}
                onPress={onOptionPress} 
            >
                <Entypo 
                    name="dots-three-vertical" 
                    size={24} 
                    color={color.FONT_MEDIUM}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.separator}/>
    </>
  )
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
        marginTop: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        height: 50,
        backgroundColor: color.MODAL_BG,
        flexBasis: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color: color.FONT,
    },
    separator: {
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    time: {
        fontSize: 12,
        color: color.FONT_LIGHT,
    },
})