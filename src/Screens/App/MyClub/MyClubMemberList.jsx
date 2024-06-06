import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Search from '../../../Compenents/Search/Search';
import {staticImageURL} from '../../../API_Services/API_service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import {fetchImage} from '../../../API_Services/auth_API';
import Colors from '../../../Theme/Colors';

const MyClubMemberList = ({list}) => {
  // console.log(list,"Line 24")
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Use a local variable to process list based on search criteria
      let processedList =
        search.trim() === ''
          ? list
          : list.filter(item => {
              const fullName = `${item?.first_name || ''} ${
                item?.last_name || ''
              }`;
              return fullName.toLowerCase().includes(search.toLowerCase());
            });

      // Sort the list alphabetically by full name
      processedList = processedList.sort((a, b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return fullNameA.localeCompare(fullNameB); // Sort strings alphabetically
      });

      // Fetch actual image links for each member
      const processedListWithImages = await Promise.all(
        processedList.map(async item => {
          const imageLink = await fetchImage(item.member_image_url);
          return {...item, member_image_url: imageLink};
        }),
      );

      setFilteredData(processedListWithImages);
      setIsLoading(false);
    };

    fetchData();
    const blurListener = navigation.addListener('blur', () => {
      setSearch('');
    });

    const focusListener = navigation.addListener('focus', () => {
      setSearch('');
    });

    // Cleanup the listeners
    return () => {
      blurListener();
      focusListener();
    };
  }, [list, search,navigation]);

  const handleSearch = text => {
    setSearch(text);
  };

  const handlePress = item => {
    // console.log(item,"Line 85")
    navigation.navigate('Member Profile', {item});
  };

  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handlePress(item)}
        style={{flex: 1}}>
        <View style={styles.listContainer}>
          {item.member_image_url ? (
            <Image
              source={{uri: item.member_image_url}}
              style={styles.imageContainer}
            />
          ) : (
            <Image source={staticImageURL} style={styles.imageContainer} />
          )}

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {item?.first_name ? Capitalize(item.first_name) : ''}{' '}
              {item?.last_name ? Capitalize(item.last_name) : ''}
            </Text>
          </View>
          <FontAwesome
            name="angle-right"
            size={responsiveFontSize(30)}
            color={Colors.black}
            style={{margin: responsivePadding(10)}}
          />
        </View>
        <View style={styles.SepraterLine} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.searchView}>
        <Search search={handleSearch} />
      </View>
      <View style={styles.loader}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={styles.indicator}
            />
            <Text style={styles.text}>Loading Club Member List...</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            {filteredData.length === 0 && search.trim() !== '' ? (
              <View style={styles.noContainer}>
                <Text style={styles.noResultText}>
                  No result found, please search with a different keyword.
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                style={styles.flatlist}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default MyClubMemberList;

const styles = StyleSheet.create({
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
    marginVertical: responsivePadding(15),
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsivePadding(10),
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
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    padding: responsivePadding(12),
    backgroundColor: '#555',
    borderRadius: responsivePadding(12),
  },
  noResultText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    color: Colors.black,
  },
  noContainer: {
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    marginBottom: Dimensions.get('screen').width * 0.2,
    flex: 1,
  },
  text: {
    marginVertical: responsivePadding(10),
    fontSize: responsiveFontSize(16),
    color: Colors.black,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    marginVertical: responsivePadding(10),
  },
  searchView: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: responsivePadding(5),
  },
  mainView: {
    backgroundColor: Colors.white,
    height: '100%',
    // flex:1
  },
});
