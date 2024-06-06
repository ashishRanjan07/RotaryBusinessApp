import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Theme/Colors'
import BusinessHeader from './BusinessHeader'
import BusinessImageComponent from './BusinessImageComponent'
import BusinessLowerView from './BusinessLowerView'
import { responsivePadding } from '../Responsive'
import { memberFullDetail } from '../../API_Services/auth_API'

const ViewOwner = ({route}) => {
  
  const [data, setData] = useState(route.params.data);
  // console.log(data,"Line 13")
  const [userData,setUserData] = useState(route.params.userData)
  // console.log(userData,"Line 15")
  const [uuid,setUuid] = useState(route?.params?.uuid);
  // console.log(uuid,"Line 17")

  useEffect(() => {
    // Update data when route.params.data changes
    setData(route.params?.data);
    setUserData(route.params?.userData)
    // getMemberFullDetails(uuid);
  }, [route.params.data,route.params.userData]);
  

  return (
    <>
    <View style={styles.mainContainer}>
    <SafeAreaView style={styles.safeAreaView}/>
    <StatusBar barStyle={"dark-content"} backgroundColor={Colors.blue}/>
    <BusinessHeader data={data}/>
    <BusinessImageComponent data={data} uuid={uuid} image={userData?.member?.member_image_url}/>
    <BusinessLowerView data={data} userData={userData} id={uuid}/>
    </View>
    </>
  )
}

export default ViewOwner

const styles = StyleSheet.create({
    safeAreaView:{
        backgroundColor:Colors.blue
      },
      main: {
        flex: 1,
        backgroundColor: Colors.white,
      },
      mainContainer:{
        flex:1,
        backgroundColor:Colors.blue
      },
      container: {
        backgroundColor: Colors.white,
      },
      separatorLine: {
        backgroundColor: Colors.border_grey,
        height: responsivePadding(0.7),
      },
})
