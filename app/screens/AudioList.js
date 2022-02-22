import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';

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

  rowRenderer = (type, item) => {
    return (
      <AudioListItem 
        title={item.filename} 
        duration={item.duration}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
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
