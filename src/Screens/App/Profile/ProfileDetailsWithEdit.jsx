import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import Colors from '../../../Theme/Colors';
import Fonts ,{FontSize} from '../../../Theme/Fonts';
const ProfileDetailsWithEdit = ({title, subTitle, open, setOpen, icon, edit, setEdit, route}) => {
  return (
    <View>
            <View style={styles.container} >
                <View style={styles.listContainer}>
                    <Image source={icon} style={{ height: 20, width: 20 }} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text>{subTitle}</Text>
                    </View>
                </View>
                {/* {title === "Club Details" && (
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(!open)}>
                        <Entypo name={open ? "chevron-up" : "chevron-down"} size={Fonts.FontSize.fontSize30} color={Colors.text_grey} />
                    </TouchableOpacity>
                )}
                {title === "Work Details" && route === "DistrictProfiles" && (
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(!open)}>
                        <Entypo name={open ? "chevron-up" : "chevron-down"} size={Fonts.FontSize.fontSize30} color={Colors.text_grey} />
                    </TouchableOpacity>
                )}
                 {title === "Personal Details" && route === "DistrictProfiles" && (
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setOpen(!open)}>
                        <Entypo name={open ? "chevron-up" : "chevron-down"} size={Fonts.FontSize.fontSize30} color={Colors.text_grey} />
                    </TouchableOpacity>
                )} */}

                
                {/* {title !="Club Details" &&(
                <View style={{flexDirection:'row',alignItems:'center',width:'25%',justifyContent:'space-between'}}>
                  
                    <TouchableOpacity onPress={()=> setEdit(!edit)}>
                        <FontAwesome5 name="edit" size={Fonts.FontSize.fontSize26} color={Colors.text_grey}/>
                    </TouchableOpacity>
                    
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setOpen(!open)}>
                    <Entypo name={open ? "chevron-up" : "chevron-down"} size={30} color={Colors.text_grey} />
                </TouchableOpacity>
                </View>
                )} */}

            </View>
            <View style={styles.SepraterLine} />
        </View>
  )
}

export default ProfileDetailsWithEdit

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
    },
    SepraterLine: {
        backgroundColor: Colors.border_grey,
        height: 0.7,
    },
    listContainer: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsContainer: {
        marginLeft: 15,
        width: Dimensions.get('screen').width * 0.75,
    },
    title: {
        color: Colors.black,
        fontWeight: '500',
        fontSize: FontSize.fontSize16,
    }
})