import { Text, StyleSheet, ScrollView, Dimensions, View, TextInput } from 'react-native'
import React, { useState } from 'react'

import Colors from '../../../Theme/Colors'
import { FontSize } from '../../../Theme/Fonts'
import Text_Input from '../../../Compenents/Text_Input'
import AuthButton from '../../../Compenents/Buttons/AuthButton'

export default function EditProfile() {
    const [clubname, setClubName] = useState("");
    const [schoolname, setSchoolName] = useState("");
    const [schoolEmail, setSchoolEmail] = useState("");
    const [education, setEducation] = useState("");
    const [educationSchool, setEducationSchool] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");


    const handleSave = () => {
        console.warn("Handle Save Profile Updated!")
        console.log("Clube Details: - ", clubname);
        console.log("Work Details : - ", schoolname, schoolEmail, education, educationSchool, schoolAddress);
        console.log("Personal Details: - ", name, email, mobile, gender, address)
    }

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

            <Text style={styles.title}>Club Details</Text>

            {/* Club Name */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setClubName(text)}
                    placeholder="Club Name"
                    keyboardType='default'
                    value={clubname}
                />
            </View>

            {/* <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Club Name"
            /> */}

            <Text style={styles.title}>Work Details</Text>

            {/* SchoolName */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setSchoolName(text)}
                    placeholder="Radiant Public School"
                    keyboardType='default'
                    value={schoolname}
                />
            </View>
            {/* Club Name */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setSchoolEmail(text)}
                    placeholder="Radiantschoolgzb@gmail.com"
                    keyboardType='default'
                    value={schoolEmail}
                />
            </View>
            {/* Education */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setEducation(text)}
                    placeholder="Education"
                    keyboardType='default'
                    value={education}
                />
            </View>
            {/* Education School */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setEducationSchool(text)}
                    placeholder="Education School"
                    keyboardType='default'
                    value={educationSchool}
                />
            </View>
            {/* School Address */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setSchoolAddress(text)}
                    placeholder="Block B, RK Puram, Govindpur..."
                    keyboardType='default'
                    value={schoolAddress}
                />
            </View>

            {/* <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Radiant Public School"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Radiantschoolgzb@gmail.com"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Education"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Education School"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Block B, RK Puram, Govindpur..."
            /> */}

            <Text style={styles.title}>Personal Details</Text>

            {/* Name*/}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setName(text)}
                    placeholder="Vineet Tyagi"
                    keyboardType='default'
                    value={name}
                />
            </View>
            {/* Email */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setEmail(text)}
                    placeholder="vinay34@gmail.com"
                    keyboardType='email-address'
                    value={email}
                />
            </View>
            {/* Mobile number*/}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setMobile(text)}
                    placeholder="8977664567"
                    keyboardType='number-pad'
                    value={mobile}
                />
            </View>
            {/*  Gender */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setGender(text)}
                    placeholder="Male"
                    keyboardType='default'
                    value={gender}
                />
            </View>
            {/* School Address */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setAddress(text)}
                    placeholder="Block B, RK Puram, Govindpur..."
                    keyboardType='default'
                    value={address}
                />
            </View>

            {/* <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Vineet Tyagi"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="vinay34@gmail.com"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="8977664567"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Male"
            />
            <Text_Input
                entered_data={(e) => console.warn(e)}
                placeholder="Block B, RK Puram, Govindpur..."
            /> */}

            <AuthButton
                title="Save"
                handleAction={() => handleSave()}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        minHeight: Dimensions.get('screen').height,
        paddingVertical: 20,
    },
    title: {
        color: Colors.black,
        fontSize: FontSize.fontSize18,
        fontWeight: '500',
        marginHorizontal: 20
    },
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