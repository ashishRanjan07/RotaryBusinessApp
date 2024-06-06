import {View, StyleSheet, TouchableOpacity, Text, FlatList, SafeAreaView, StatusBar} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Colors from '../../Theme/Colors';
import {
  clubMemberList,
  getAllBusinessListClubId,
} from '../../API_Services/auth_API';
import MyClubMemberList from './MyClub/MyClubMemberList';
import {GET_USER_DETAILS} from '../../API_Services/API_service';
import BusinessList from './BusinessList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import {AuthContext} from '../../Constant/Context';

export default function MyClub() {
  const [view, setView] = useState('Member');
  const [myClubMemberData, setClubMemberData] = useState([]);
  const [myClubBusinessData, setClubBusinessData] = useState([]);
  const [id, setId] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const {signOut} = useContext(AuthContext);

  const list = [
    {id: '1', title: 'Member'},
    {id: '2', title: 'Business'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      if (id) {
        getMemberByCLub_id();
        getBusinessByClub_id();
      }
    };
    fetchData();
  }, [id]);

  const getData = async () => {
    try {
      const userData = await GET_USER_DETAILS();
      // console.log(userData?.club_id, 'Line 21');
      setId(userData.club_id);
    } catch (error) {
      console.log(error, 'Line 49');
    }
  };

  // Fetch Member data by id
  const getMemberByCLub_id = async () => {
    try {
      const response = await clubMemberList(id);
      if (response?.success) {
        // console.log(response,"Line 58")
        setClubMemberData(response?.members);
      }
    } catch (error) {
      console.log(error, 'Line 61');
    }
  };

  const getBusinessByClub_id = async () => {
    try {
      // console.log(id,"Line 67")
      const response = await getAllBusinessListClubId(id);
      if (response?.success) {
        setClubBusinessData(response?.business);
      }
    } catch (error) {
      console.log(error, 'Line 73');
    }
  };

  const hnadleModale = item => {
    setView(item);
    setModalVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.touch}
        onPress={() => hnadleModale(item.title)}>
        <Text style={styles.modelText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
   <SafeAreaView style={{backgroundColor:Colors.white}}/>
   <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"}/>
    <View
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* Selctor Tab */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.ModalTouch}>
        <Text style={{color: Colors.black}}>{view}</Text>
        <FontAwesome
          name="sort"
          size={responsiveFontSize(18)}
          color={Colors.text_grey}
        />
      </TouchableOpacity>
      <View style={styles.SepraterLine} />

      {view === 'Member' ? (
        <MyClubMemberList list={myClubMemberData} />
      ) : view === 'Business' ? (
        <BusinessList list={myClubBusinessData} />
      ) : null}
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modelContainer}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
  },
  modelContainer: {
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
    justifyContent: 'center',
    borderRadius: responsivePadding(10),
    width: '100%',
    borderWidth: responsivePadding(2),
  },
  modelText: {
    fontSize: responsiveFontSize(18),
    marginVertical: responsivePadding(5),
    color: Colors.black,
    fontWeight: '600',
  },
  ModalTouch: {
    height: responsivePadding(50),
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
  touch: {
    padding: responsivePadding(5),
    width: '100%',
    marginBottom: responsivePadding(5),
    alignItems: 'center',
  },
});
