// play
export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync(
            { uri: uri },
            { shouldPlay: true }
        ); 
    } catch (error) {
        console.log('error play => ' + error.message)
    }
}

// pause
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync({ shouldPlay: false }); 
    } catch (error) {
        console.log('error pause => ' + error.message)
    }
}

// resume
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync() 
    } catch (error) {
        console.log('error resume => ' + error.message)
    }
}

// another music
