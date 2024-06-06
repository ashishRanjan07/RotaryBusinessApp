import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState,useContext } from 'react';

import Colors from '../../Theme/Colors';
import Search from '../../Compenents/Search/Search';
import { districtList } from '../../API_Services/auth_API';
import { FontSize } from '../../Theme/Fonts';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import { AuthContext } from '../../Constant/Context';

export default function District({ navigation }) {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {signOut} = useContext(AuthContext);

  const getDistrict = async () => {
    try {
      const response = await districtList();
      if (response?.success) {
        setList(response?.districts);
        setIsLoading(false);
      } else {
        // Alert.alert('District API Error', response?.errorMessage);
        signOut();
        setIsLoading(false);
      }
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDistrict(); // Fetch data when the component mounts

    // Add event listeners for blur and focus events
    const blurListener = navigation.addListener('blur', () => {
      setSearch('');
    });

    const focusListener = navigation.addListener('focus', () => {
      setSearch('');
      getDistrict(); // Fetch data again when the tab gains focus
    });

    // Cleanup the listeners
    return () => {
      blurListener();
      focusListener();
    };
  }, [navigation]);

  const handleDistrict = async (id, name) => {
    navigation.navigate('Club List', { districtId: id, districtName: name });
  };

  const handleSearch = text => {
    setSearch(text);
  };

  // Filter the list based on the search text
  const filteredList = list.filter(district =>
    district.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ backgroundColor: Colors.white }} />
      <View style={styles.container}>
        <Search search={handleSearch} />
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}>
          {filteredList.length === 0 ? (
            <View>
              {isLoading ? (
                <View style={styles.loader}>
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={styles.indicator}
                />
                <Text style={styles.loaderText}>Loading District list...</Text>
                </View>
              ) : (
                <View style={styles.noContainer}>
                  <Text style={styles.noResultText}>
                    No result found, Please search with a different keyword.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            filteredList.map(i => (
              <TouchableOpacity
                key={i.id}
                style={styles.distContainer}
                onPress={() => handleDistrict(i.id, i.name)}>
                <Image
                  source={require('../../Assets/Images/logosample.png')}
                  style={{ height: 80, width: 100 }}
                  resizeMode="cover"
                />
                <Text style={styles.title}>{i.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  distContainer: {
    height: Dimensions.get('screen').width * 0.32,
    width: Dimensions.get('screen').width * 0.26,
    margin: responsivePadding(10),
    borderWidth: responsivePadding(2),
    borderColor: Colors.backGround_grey,
    elevation: responsivePadding(10),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    width: '100%',
    color: Colors.black,
    textAlign: 'center',
    height: '25%',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: responsiveFontSize(20),
  },
  indicator: {
    alignSelf: 'center',
    marginTop: responsivePadding(20),
  },
  noResultText: {
    textAlign: 'center',
    fontSize: FontSize.fontSize16,
    color: Colors.black,
  },
  noContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader:{
    flexDirection:'column',
    gap:5,
    alignItems:'center',
  },
  loaderText:{
    fontSize:responsiveFontSize(16),
    color:Colors.black,
    fontWeight:'500'
  }
});
