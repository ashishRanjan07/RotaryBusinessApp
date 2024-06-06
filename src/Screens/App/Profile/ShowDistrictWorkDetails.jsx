import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import ProfileDetailsOptions from '../../../Compenents/ProfileDetailsOptions'
import images from '../../../Theme/Images'
import Colors from '../../../Theme/Colors'
import Fonts, { FontSize } from '../../../Theme/Fonts'

const ShowDistrictWorkDetails = ({ data }) => {
    // console.log(data, "Line9");
    const [open, setOpen] = useState(false)

    return (
        <View>
            <ProfileDetailsOptions
                icon={images.workDetails}
                title="Work Details"
                subTitle="All about your Corporate Status"
                open={open}
                setOpen={(e) => setOpen(e)}
                route="DistrictProfiles"
            />
            {
                open ?
                    <>
                        <View style={styles.container} key={data?.id}>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.header}>Business Name</Text>
                                <Text style={styles.content}>{data?.business_name}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.header}>Business Category</Text>
                                <Text style={styles.content}>{data?.business_category}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.header}>Business Address</Text>
                                <Text style={styles.content}>{data?.business_address}</Text>
                            </View>

                        </View>
                    </> :
                    null
            }
        </View>
    )
}

export default ShowDistrictWorkDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backGround_grey,
    },
    detailsContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        width: Dimensions.get('screen').width * 0.35,
        color: Colors.black,
        fontWeight: '500',
    },
    content: {
        width: Dimensions.get('screen').width * 0.45,
        color:Colors.black
    },
})