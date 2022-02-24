import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';

import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/audioController';

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider( i => 'audio', (type, dim) => {
    switch(type) {
      case 'audio':
        dim.width = Dimensions.get('window').width;
        dim.height = 70;
        break;
        default:
        dim.width = 0;
        dim.height = 0;
    }
    
  });

  playbackStatusUpdate = playbackStatus => {
    if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.context.updateState(this.context, { 
      playbackPosition: playbackStatus.positionMillis,
      playbackDuration: playbackStatus.durationMillis,
    });
    }
  };

  handleAudioPress = async audio => {
    const {soundObj, playbackObj, currentAudio, updateState, audioFiles} = this.context;

    // playing
    if(soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri)

      updateState(this.context, {currentAudio: audio,
        playbackObj: playbackObj, 
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: audioFiles.indexOf(audio),
      });
      
      return playbackObj.setOnPlaybackStatusUpdate(this.playbackStatusUpdate);
    }

    // pause 
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);

      return updateState(this.context, {soundObj: status, isPlaying: false});
    }

    // resume 
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj);

      return updateState(this.context, {soundObj: status, isPlaying: true});
    }

    // another music
    if(soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);

      return updateState(this.context, 
        {currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: audioFiles.indexOf(audio),
      })
    }
  }

  rowRenderer = (type, item, index, extendState) => {
    return (
      <AudioListItem 
        title={item.filename} 
        duration={item.duration}
        isPlaying={extendState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
        onAudioPress={() => this.handleAudioPress(item)}
      />
    )
  }

  render() {
    return (
      <AudioContext.Consumer>
        {({dataProvider, isPlaying}) => {
          return (
            <View style={{ flex: 1 }}>
              <RecyclerListView 
                dataProvider={dataProvider} 
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{ isPlaying }}
              />
              <OptionModal 
                visible={this.state.optionModalVisible}
                onClose={() => this.setState({ ...this.state, optionModalVisible: false })}
                currentItem={this.currentItem}
                onPlaylistPress={() => console.log('playlist')}
                onAddPress={() => console.log('add')}
              />
            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}
