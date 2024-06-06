import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Theme/Colors';
import Search from './Search/Search';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {staticImageURL} from '../API_Services/API_service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MemberList = ({list}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [loading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const handlePress = item => {
    navigation.navigate('Member Profile', {item});
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const cleanSearch = search.trim().toLowerCase();

      if (cleanSearch === '') {
        const sortedList = list
          .slice()
          .sort((a, b) =>
            `${a?.first_name || ''} ${a?.last_name || ''}`
              .toLowerCase()
              .localeCompare(`${b?.first_name || ''} ${b?.last_name || ''}`),
          );
        setFilteredData(sortedList);
      } else {
        const searchWords = cleanSearch.split(' ');

        const filteredList = list.filter(item => {
          const fullName = `${item?.first_name || ''} ${
            item?.middle_name || ''
          } ${item?.last_name || ''}`.toLowerCase();

          return searchWords.every(word => fullName.includes(word));
        });

        const sortedList = filteredList.sort((a, b) =>
          `${a?.first_name || ''} ${a?.middle_name || ''} ${a?.last_name || ''}`
            .toLowerCase()
            .localeCompare(
              `${b?.first_name || ''} ${b?.middle_name || ''} ${
                b?.last_name || ''
              }`.toLowerCase(),
            ),
        );
        setFilteredData(sortedList);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [list, search]);

  const handleSearch = text => {
    // console.log('Search value:', text);
    setSearch(text.replace(/\s+/g, ' ')); // Replace multiple spaces with a single space
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderHolder}
        key={item?.id}
        onPress={() => handlePress(item)}>
        {/* Image View */}
        <View style={styles.imageHolder}>
          {item?.logo_url ? (
            <Image
              source={{
                uri: item?.member_image_url,
              }}
              style={styles.imageContainer}
            />
          ) : (
            <Image source={staticImageURL} style={styles.imageContainer} />
          )}
        </View>
        {/* Club Name */}
        <View style={styles.nameHolder}>
          <Text style={styles.title}>{`${item?.first_name?.trim() || ''} ${
            item?.middle_name?.trim() || ''
          } ${item?.last_name?.trim() || ''}`}</Text>
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
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      {/* Search View */}
      <View style={styles.searchViewHolder}>
        <Search search={handleSearch} />
      </View>
      <View style={{flex: 1, marginVertical: responsivePadding(10)}}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={styles.indicator}
            />
            <Text style={styles.loaderText}>Loading Member List...</Text>
          </View>
        ) : (
          <View style={{}}>
            {filteredData.length === 0 ? (
              <View style={styles.noContainer}>
                <Text style={styles.noResultText}>
                  No result found, Please search with a different keyword.
                </Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item?.id?.toString()}
                style={{marginBottom: Dimensions.get('screen').width * 0.2}}
                initialNumToRender={10}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  searchViewHolder: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(5),
  },
  loaderContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  indicator: {
    padding: responsivePadding(12),
    backgroundColor: '#555',
    borderRadius: responsivePadding(12),
  },
  loaderText: {
    marginVertical: responsivePadding(10),
    fontSize: responsiveFontSize(16),
    color: Colors.black,
  },
  upperView: {
    // borderWidth: 1,
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 5,
    borderColor: Colors.text_grey,
  },
  imageContainer: {
    backgroundColor: Colors.border_grey,
    height: Dimensions.get('screen').height * 0.08,
    width: Dimensions.get('screen').height * 0.08,
    borderRadius: responsivePadding(50),
  },
  title: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  noContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultText: {
    fontSize: responsiveFontSize(16),
    color: Colors.black,
    textAlign: 'center',
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
