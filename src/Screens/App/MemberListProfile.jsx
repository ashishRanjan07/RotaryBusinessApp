import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Theme/Colors'
import ClubMemberHeader from '../../Compenents/Club/ClubMemberHeader'
import ClubImageComponents from '../../Compenents/Club/ClubImageComponents'
import ClubLowerView from '../../Compenents/Club/ClubLowerView'

const MemberListProfile = ({route, navigation}) => {
  const {item} = route.params;
  // console.log(item,"Line 14")
  const [memberData, setMemberData] = useState(item);
  const [businessData, setBusinessData] = useState(
    item?.member_business_details,
  );
  const [clubData, setClubData] = useState(item?.club);
  
  useEffect(() => {
    setMemberData(item); // Update memberData when item changes
  }, [item]);
  return (
    <View style={styles.mainContainer}>
    <SafeAreaView style={styles.safeAreaView}/>
    <StatusBar barStyle={"dark-content"} backgroundColor={Colors.blue}/>
    <ClubMemberHeader memberData={memberData}/>
    <ClubImageComponents memberData={memberData} />
    <ClubLowerView memberData={memberData} />
    </View>
  )
}

export default MemberListProfile

const styles = StyleSheet.create({
  safeAreaView:{
    backgroundColor:Colors.blue
  },
  mainContainer:{
    flex:1,
    backgroundColor:Colors.blue
  },
})