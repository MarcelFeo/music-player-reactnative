import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'

export default class AudioList extends Component {
  static contextType = AudioContext;
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.context.audioFiles.map(item => (
            <Text  
              key={item.id}
              style={{
                padding: 10,
                borderBottomColor: 'red',
                borderBottomWidth: 2,
              }}
            >
              {item.filename}
            </Text>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
  }
})
