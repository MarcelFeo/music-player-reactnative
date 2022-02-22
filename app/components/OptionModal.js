import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import color from '../misc/color';

export default function OptionModal({ visible, onClose, currentItem, onPlaylistPress, onAddPress }) {
  return (
    <>
        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.modal}>
                <Text 
                    style={styles.title}
                    numberOfLines={1}
                >{currentItem.filename}</Text>
                <View style={styles.optionContainer}>
                    <TouchableWithoutFeedback
                        onPress={onPlaylistPress}
                    >
                        <Text style={styles.option}>Play</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={onAddPress}
                    >
                        <Text style={styles.option}>Adicionar na playlist</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={onClose}
            >
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>
        </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG,
    }
})