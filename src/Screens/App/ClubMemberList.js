import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../../Theme/Colors';

import {clubMemberList, viewProfile} from '../../API_Services/auth_API';
import {FontSize} from '../../Theme/Fonts';
import {staticImageURL} from '../../API_Services/API_service';
import Search from '../../Compenents/Search/Search';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import Header from '../../Compenents/Header';

export default function ClubMemberList({route}) {
  const navigation = useNavigation();
  const {id, name} = route?.params;
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchMemberList() {
      try {
        const response = await clubMemberList(id);
        if (response?.success) {
          setList(response?.members);
          setFilteredData(response?.members);
        } else {
          Alert.alert(response?.errorMessage);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to load data. What would you like to do?',
          [
            {
              text: 'Refresh',
              onPress: () => {
                setIsLoading(true);
                fetchMemberList();
              },
            },
            {
              text: 'Go Back',
              onPress: () => navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchMemberList();
  }, [id]);

  const OpenNextScreen = async i => {
    navigation.navigate('Club Member Profile', {i});
    const data = {
      uuid: id,
    };
    const response = await viewProfile(data);
    console.log(response, 'Line 47');
  };

  const handleSearch = text => {
    setSearch(text);
    const filteredList = list
      .filter(item => {
        const fullName = constructFullNameForSearch(item).toLowerCase();
        return fullName.includes(text.toLowerCase());
      })
      .sort((a, b) => {
        const fullNameA = constructFullNameForSearch(a).toLowerCase();
        const fullNameB = constructFullNameForSearch(b).toLowerCase();
        return fullNameA.localeCompare(fullNameB);
      });
    setFilteredData(filteredList);
  };

  const constructFullNameForSearch = item => {
    let fullName = '';
    if (item.first_name) {
      fullName += item.first_name.trim();
    }
    if (item.middle_name) {
      if (fullName !== '') {
        fullName += ' ' + item.middle_name.trim();
      } else {
        fullName += item.middle_name.trim();
      }
    }
    if (item.last_name) {
      if (fullName !== '') {
        fullName += ' ' + item.last_name.trim();
      } else {
        fullName += item.last_name.trim();
      }
    }
    return fullName;
  };
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.indicator}
        />
        <Text
          style={{
            marginVertical: responsivePadding(10),
            fontSize: responsiveFontSize(16),
            color: Colors.black,
          }}>
          Loading Club Member List...
        </Text>
      </View>
    );
  }
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => OpenNextScreen(item)}>
         <View style={styles.listContainer}>
                  {item?.member_image_url ? (
                    <Image
                      source={{
                        uri: item?.member_image_url,
                      }}
                      style={styles.imageContainer}
                    />
                  ) : (
                    <Image
                      source={staticImageURL}
                      style={styles.imageContainer}
                    />
                  )}
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {`${item?.first_name ? item.first_name.trim() : ''} ${
                        item?.middle_name ? item.middle_name.trim() : ''
                      } ${item?.last_name ? item.last_name.trim() : ''}`}
                    </Text>
                  </View>
                  <FontAwesome
                    name="angle-right"
                    size={25}
                    color={Colors.text_grey}
                    style={{margin: 10}}
                  />
                </View>
                <View style={styles.separateLine} />
        </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container2}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{marginBottom: 10, backgroundColor: Colors.white}}>
        <Header title={`${name} club member list`} />
      </View>
      <View style={{width: '95%', alignSelf: 'center'}}>
          <Search search={handleSearch} />
        </View>
        <View style={[styles.separateLine,{marginBottom:0}]} />
      {filteredData.length=== 0 ? (
       <View style={styles.noContainer}>
       <Text style={styles.noResultText}>
         No result found,Please Search with different keyword.
       </Text>
     </View>
      ) :
      (
        <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{flex:1}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
    minHeight: Dimensions.get('screen').height,
  },
  separateLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
    marginVertical: responsivePadding(15),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  indicator: {
    padding: responsivePadding(12),
    backgroundColor: '#555',
    borderRadius: responsivePadding(12),
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsivePadding(10),
    flex: 1,
  },
  imageContainer: {
    backgroundColor: Colors.border_grey,
    height: Dimensions.get('screen').height * 0.08,
    width: Dimensions.get('screen').height * 0.08,
    borderRadius: responsivePadding(50),
  },
  titleContainer: {
    width: Dimensions.get('screen').width * 0.6,
  },
  title: {
    color: Colors.black,
    fontSize: FontSize.fontSize18,
    fontWeight: 'bold',
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
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  iconView: {width: '10%', marginStart: 10},
  headerText: {
    textAlign: 'center',
    fontSize: FontSize.fontSize22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  container2: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
