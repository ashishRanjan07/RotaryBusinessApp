import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'

import ProfileDetailsOptions from '../../../Compenents/ProfileDetailsOptions'
import images from '../../../Theme/Images'
import Colors from '../../../Theme/Colors'
import { responsivePadding } from '../../../Compenents/Responsive'

export default function ClubDetails({ data }) {
    // console.log(data,"Line 9")
    const [open, setOpen] = useState(false)

    return (
        <View>
            <ProfileDetailsOptions
                icon={images.clubDetails}
                title="Club Details"
                subTitle="Click here to find club details"
                open={open}
                setOpen={(e) => setOpen(e)}
            />
            {open && (
                <View style={styles.container}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.header}>Club Name</Text>
                        <Text style={styles.content}>{data?.name}</Text>
                    </View>
                    <View style={styles.SepraterLine} />
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backGround_grey,
    },
    detailsContainer: {
        marginVertical: responsivePadding(10),
        marginHorizontal: responsivePadding(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    SepraterLine: {
        backgroundColor: Colors.border_grey,
        height: responsivePadding(0.7),
    },
    header: {
        width: Dimensions.get('screen').width * 0.45,
        color: Colors.black,
        fontWeight: '500',
    },
    content: {
        width: Dimensions.get('screen').width * 0.45,
        color:Colors.black
    }
})