import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AudioList() {
  return (
    <View style={styles.container}>
      <Text>AudioList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
})
