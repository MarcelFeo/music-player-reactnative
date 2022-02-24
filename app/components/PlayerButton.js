import React from 'react'
import {AntDesign} from '@expo/vector-icons';
import color from '../misc/color';

export default function PlayerButton(props) {
    const { 
        iconType, 
        size = 40, 
        iconColor = color.FONT, 
        onPress,
    } = props;

  const getIconName = (type) => {
    switch (type) {
        case 'PLAY': 
          return 'pausecircle';
        case 'PAUSE':
          return 'play';
        case 'NEXT':
          return 'forward';
        case 'PREV':
          return 'banckward';
    }
  }

  return (
      <AntDesign 
        name={getIconName(iconType)}
        size={size}
        iconColor={iconColor}
        onPress={onPress}
        {...props}
        />
  )
}
