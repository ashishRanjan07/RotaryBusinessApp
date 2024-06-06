import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { FontSize } from '../../Theme/Fonts';
import Colors from '../../Theme/Colors';

export default function BGYButton({ title, handleAction, icon }) {
    return (
        <TouchableOpacity onPress={() => handleAction()} style={styles.container}>
            <MaterialIcons name={icon} size={25} color={Colors.white} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: FontSize.fontSize17
    },
    iconStyle: {
        paddingHorizontal: 7
    }
})