import { Alert, Text, View } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
      super(props);
      this.state = {
        audioFiles: [],
        permissionError: false,
        dataProvider: new DataProvider((r1, r2) => r1 !== r2),
        playbackObj: null,
        soundObj: null,
        currentAudio: {},
        isPlaying: false,
        currentAudioIndex: null,
        playbackPosition: null,
        playbackDuration: null,
      }
  }

  permissionAlert = () => {
    Alert.alert("Permissão necessária", "Este aplicativo precisa ler seus arquivos de música!", [{
        text: 'Permitir',
        onPress: () => this.getPermissions()
    },{
        text: 'Cancelar',
        onPress: () => this.permissionAlert()
    }])
  }

  getAudioFiles = async () => {
    const {dataProvider, audioFiles} = this.state
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });
    

    this.setState({
      ...this.state, 
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles, ...media.assets
      ]), 
      audioFiles: [
        ...audioFiles, ...media.assets
      ]
    })
  }

  getPermissions = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted) {
      this.getAudioFiles();
    }

    if(!permission.canAskAgain && !permission.granted) {
      this.setState({...this.state, permissionError: true});
    }

    if(!permission.granted && permission.canAskAgain) {
        const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
        if(status === 'denied' && canAskAgain) {
            this.permissionAlert();
        }

        if(status === 'granted') {
          this.permissionAlert();
        }

        if(status === 'denied' && !canAskAgain) {
          this.setState({...this.state, permissionError: true});
        }
    }
  }

  componentDidMount() {
      this.getPermissions()
  }

  updateState = (prevState, newState = {}) => {
    this.setState({...prevState, ...newState})
  }

  render() {
    const {
      audioFiles, 
      dataProvider, 
      permissionError, 
      playbackObj, 
      soundObj, 
      currentAudio, 
      isPlaying, 
      currentAudioIndex,
      playbackPosition,
      playbackDuration,
    } = this.state;

    if(permissionError) return <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Text style={{ 
          fontSize: 25,
          color: 'red',
          textAlign: 'center',
        }}
      >Você precisa aceitar a permissão</Text>
    </View>
    return (
      <AudioContext.Provider value={{ 
        audioFiles, 
        dataProvider, 
        playbackObj, 
        soundObj, 
        currentAudio,
        updateState: this.updateState,
        isPlaying,
        currentAudioIndex,
        playbackPosition,
        playbackDuration,
      }}>
        {this.props.children}
      </AudioContext.Provider>
    )
  }
}

export default AudioProvider