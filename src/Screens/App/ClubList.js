import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {getClubByDistrictID} from '../../API_Services/auth_API';
import {useNavigation} from '@react-navigation/native';
import Search from '../../Compenents/Search/Search';
import {staticImageURL} from '../../API_Services/API_service';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import Header from '../../Compenents/Header';

export default function ClubList({route}) {
  const {districtId, districtName} = route.params;
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let id = route?.params?.districtId;
    // console.log(id, 'Line 21');
    getCLubList(id);
  }, []);

  const getCLubList = async id => {
    try {
      const response = await getClubByDistrictID(id);
      if (response?.success) {
        if (response?.clubs !== 'No clubs(s) found.') {
          setList(response?.clubs);
        } else {
          Alert.alert(
            `${response?.clubs}`,
            'No clubs are associated with this district.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setIsLoading(false);
                  navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
        }
      }
    } catch (error) {
      // console.warn(error);
      navigation.goBack();
    } finally {
      // Set loading to false regardless of success or failure
      setIsLoading(false);
    }
  };

  const handleSearch = text => {
    setSearch(text);
  };

  const filteredList = list
    .filter(district =>
      district.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.renderHolder}
          onPress={() =>
            navigation.navigate('Club Member List', {
              id: item.id,
              name: item.name,
            })
          }>
          {/* Image View */}
          <View style={styles.imageHolder}>
            {item?.logo_url ? (
              <Image
                source={{uri: item?.logo_url}}
                style={styles.imageContainer}
              />
            ) : (
              <Image source={staticImageURL} style={styles.imageContainer} />
            )}
          </View>
          {/* Club Name */}
          <View style={styles.nameHolder}>
            <Text style={styles.title}>{item?.name}</Text>
          </View>
          {/* Arrow Icon */}
          <View style={styles.iconHolder}>
            <FontAwesome
              name="angle-right"
              size={25}
              color={Colors.text_grey}
              style={{margin: responsivePadding(10)}}
            />
          </View>
        </TouchableOpacity>
      </>
    );
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
          Loading Club List...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 10}}>
        <Header title={`${districtName} club list`} />
      </View>
      <Search search={handleSearch} />
      <View style={styles.separateLine} />
      {filteredList.length === 0 ? (
        <View style={styles.noContainer}>
          <Text style={styles.noResultText}>
            No result found,Please Search with different keyword.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  separateLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
    marginVertical: responsivePadding(15),
  },
  imageContainer: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(65),
    width: responsivePadding(65),
    borderRadius: responsivePadding(20),
  },
  title: {
    color: Colors.black,
    fontSize: FontSize.fontSize18,
    fontWeight: 'bold',
    paddingVertical: responsivePadding(5),
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
  renderHolder: {
    width: '100%',
    alignSelf: 'center',
    padding: responsivePadding(10),
    height: responsivePadding(100),
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.border_grey,
  },
  imageHolder: {
    width: '30%',
  },
  nameHolder: {
    width: '60%',
  },
  iconHolder: {
    width: '10%',
    alignItems: 'center',
  },
});
