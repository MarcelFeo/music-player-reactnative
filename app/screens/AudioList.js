import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';

export default class AudioList extends Component {
  static contextType = AudioContext;

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
    console.log(item);
    return <AudioListItem 
        title={item.filename} 
        duration={item.duration}
      />
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
            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}
