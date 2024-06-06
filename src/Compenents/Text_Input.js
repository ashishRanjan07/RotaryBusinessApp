import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'

export default function Text_Input({ entered_data, children, placeholder, secureTextEntry }) {

    const handleChange = (text) => {
        entered_data(text)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputStyle}
                onChangeText={handleChange}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    inputStyle: {
        letterSpacing: 0.7,
        backgroundColor: Colors.backGround_grey,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: Colors.border_grey,
        fontWeight: '500'
    },
})