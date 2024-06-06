import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../Theme/Colors'
import { FontSize } from '../../Theme/Fonts'
import { responsiveFontSize, responsivePadding } from '../Responsive';

export default function AuthButton({ title, handleAction }) {
    return (
        <TouchableOpacity onPress={() => handleAction()}>
            <LinearGradient
                colors={['#F7A81C', '#EC5611']}
                style={styles.container}
            >
                <Text style={styles.textStyle}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: responsivePadding(20),
        marginVertical: responsivePadding(10),
        padding: responsivePadding(15),
        borderRadius: responsivePadding(10),
    },
    textStyle: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
        fontSize: responsiveFontSize(17)
    }
})