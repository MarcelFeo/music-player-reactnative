import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageAudioForNextOpening = async (audio, index) => {
   await AsyncStorage.setItem('previousAudio', JSON.stringify({audio, index}))
}
