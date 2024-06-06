import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../Theme/Colors'
import { responsiveFontSize, responsivePadding } from './Responsive'

export default function AuthScreenTitle({ title, subTitle }) {
    return (
        <View style={styles.Container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        margin: responsivePadding(15),
    },
    titleText: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: responsiveFontSize(30),
        fontWeight: 'bold',
    },
    subTitleText: {
        color: Colors.black,
        textAlign: 'center',
        fontSize:responsiveFontSize(15),
        paddingVertical: responsivePadding(5),
        color: Colors.text_grey,
        marginBottom:responsivePadding(20)
    }
})