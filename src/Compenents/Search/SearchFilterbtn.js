import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../Theme/Colors';

export default function SearchFilterbtn({ search }) {

    const navigation = useNavigation();

    const handleChange = text => {
        search(text)
    }

    return (
        <View style={styles.searchcontainer}>

            <FontAwesome name="search" size={25} color={Colors.border_grey} style={styles.iconMargin} />

            <TextInput onChangeText={handleChange} style={styles.inputTextArea} placeholder={'Search'} />

            <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
                <Ionicons name="md-options-outline" size={25} color={Colors.border_grey} style={styles.iconMargin} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    searchcontainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.border_grey
    },
    inputTextArea: {
        flex: 1,
        paddingLeft: 10,
    },
    iconMargin: {
        margin: 10,
    }
})