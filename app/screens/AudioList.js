import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';

import { Audio } from 'expo-av';
import { play, pause, resume } from '../misc/audioController';

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

  handleAudioPress = async audio => {
    const {soundObj, playbackObj, currentAudio, updateState} = this.context;

    // playing
    if(soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri)

      return updateState(this.context, {currentAudio: audio,
        playbackObj: playbackObj, 
        soundObj: status,})
    }

    // pause 
    if(soundObj.isLoaded && soundObj.isPlaying) {
      const status = await pause(playbackObj);

      return updateState(this.context, {soundObj: status});
    }

    // resume 
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj);

      return updateState(this.context, {soundObj: status});
    }
  }

  rowRenderer = (type, item) => {
    return (
      <AudioListItem 
        title={item.filename} 
        duration={item.duration}
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
        {({dataProvider}) => {
          return (
            <View style={{ flex: 1 }}>
              <RecyclerListView 
                dataProvider={dataProvider} 
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
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
