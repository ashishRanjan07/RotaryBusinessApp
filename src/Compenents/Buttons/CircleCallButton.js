import { View, StyleSheet, Dimensions,Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Theme/Colors';

export default function CircleCallButton({data}) {
    return (
        <TouchableOpacity style={styles.container} onPress={()=>  Linking.openURL(`tel:+91${data?.member?.phone_number}`)}>
            <MaterialIcons name="call" size={30} color={Colors.white} style={{}} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: Colors.yellow,
        height: Dimensions.get('screen').width * 0.15,
        width: Dimensions.get('screen').width * 0.15,
        borderRadius: 100,
       alignContent:'center',
       alignItems:'center',
    },
})