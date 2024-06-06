import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  getAllClubList,
  getAllCityList,
  getAllStateList,
  business_filter,
  member_filter,
} from '../API_Services/auth_API';
import CheckBox from '@react-native-community/checkbox';
import {responsiveFontSize, responsivePadding} from './Responsive';

const FilterScreen = ({route}) => {
  const navigation = useNavigation();
  const [applyingFilter, setApplyingFilter] = useState(false);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('State');
  const [getClubList, setClubList] = useState();
  const [getCityList, setCityList] = useState();
  const [getStateList, setStateList] = useState();

  const [stateLoading, setStateLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(true);
  const [clubLoading, setClubLoading] = useState();

  const [selectedState, setSelectedState] = useState(
    route.params?.selectedState || [],
  );
  const [selectedCity, setSelectedCity] = useState(
    route.params?.selectedCity || [],
  );
  const [selectedClubs, setSelectedClubs] = useState(
    route.params?.selectedClubs || [],
  );

 

  useEffect(() => {
    const getAllStateListData = async () => {
      try {
        const response = await getAllStateList();
        setStateList(response.state);
        // console.log(getStateList, 'Line 53');
        setStateLoading(false);
      } catch (error) {
        console.log(error, 'Line 31');
      }
    };
    getAllStateListData();
  }, [selectedFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedFilter === 'City') {
          const response = await getAllCityList();
          // console.log(response,"Line 67")
          setCityList(response.city);
          setCityLoading(false);
        } else if (selectedFilter === 'Club') {
          const response = await getAllClubList();
          setClubList(response.clubs);
          setClubLoading(false);
        }
      } catch (error) {
        console.log('Error in fetching data', error);
      }
    };

    setStateLoading(true);
    setCityLoading(true);
    setClubLoading(true);

    fetchData();
  }, [selectedFilter]);

  const handleStateItemSelection = stateId => {
    if (selectedState.includes(stateId)) {
      setSelectedState(prevSelected =>
        prevSelected.filter(id => id !== stateId),
      );
    } else {
      setSelectedState(prevSelected => [...prevSelected, stateId]);
    }
  };

  const handleCityItemSelection = cityId => {
    if (selectedCity.includes(cityId)) {
      setSelectedCity(prevSelected => prevSelected.filter(id => id !== cityId));
    } else {
      setSelectedCity(prevSelected => [...prevSelected, cityId]);
    }
  };

  const handleClubItemSelection = clubId => {
    if (selectedClubs.includes(clubId)) {
      setSelectedClubs(prevSelected =>
        prevSelected.filter(id => id !== clubId),
      );
    } else {
      setSelectedClubs(prevSelected => [...prevSelected, clubId]);
    }
  };

  const renderStateList = () => {
    return (
      <ScrollView>
        {getStateList?.map(state => (
          <View key={state.id} style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{true: Colors.black, false: Colors.black}}
              value={selectedState.includes(state.id)}
              onValueChange={() => handleStateItemSelection(state.id)}
            />
            <TouchableOpacity>
              <Text style={styles.textStyle}>{state.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderCityList = () => {
    // Filter cities based on the selected state if a state is selected
    const filteredCities = selectedState.length > 0
      ? getCityList?.filter(city => selectedState.includes(city.state_id))
      : getCityList;
  
      const sortedCities = filteredCities?.sort((a, b) => a.name.localeCompare(b.name));
    return (
      <ScrollView>
        {sortedCities?.map(city => (
          <View key={city.id} style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{true: Colors.black, false: Colors.black}}
              value={selectedCity.includes(city.id)}
              onValueChange={() => handleCityItemSelection(city.id)}
            />
            <TouchableOpacity>
              <Text style={styles.textStyle}>{city.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  

  const renderClubList = () => {
    return (
      <ScrollView>
        {getClubList?.map(club => (
          <View key={club.id} style={styles.checkboxContainer}>
            <CheckBox
              tintColors={{true: Colors.black, false: Colors.black}}
              value={selectedClubs.includes(club.id)}
              onValueChange={() => handleClubItemSelection(club.id)}
            />
            <TouchableOpacity>
              <Text style={styles.textStyle}>{club.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const clearFilter = () => {
    setSelectedState([]);
    setSelectedCity([]);
    setSelectedClubs([]);
  };

  const applyBusinessFilter = async () => {
    if (applyButtonDisabled) {
      return;
    }
    try {
      setApplyButtonDisabled(true);
      setApplyingFilter(true);

      const formData = {
        state_ids: selectedState,
        city_ids: selectedCity,
      };
      const response = await business_filter(formData);
      if (response.success) {
        const updatedBusinessData = response.business;
        if (response.total_count === 0) {
          Alert.alert('No Business Found', response.message);
        } else {
          route.params?.updateBusinessData(updatedBusinessData);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Error applying business filter:', error);
      Alert.alert('Error', 'An error occurred while applying the filter.');
    } finally {
      setApplyButtonDisabled(false);
      setApplyingFilter(false);
    }
  };

  const applyMemberFilter = async () => {
    if (applyButtonDisabled) {
      return;
    }

    try {
      setApplyButtonDisabled(true);
      setApplyingFilter(true);
      const formData = {
        state_ids: selectedState,
        city_ids: selectedCity,
        club_ids: selectedClubs,
      };
      const response = await member_filter(formData);
      if (response.success) {
        const updatedMemberData = response.members;
        if (response.total_count === 0) {
          Alert.alert('No Member Found', response.message);
        } else {
          route.params?.updatedMemberData(updatedMemberData);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Error applying member filter:', error);
      Alert.alert('Error', 'An error occurred while applying the filter.');
    } finally {
      setApplyButtonDisabled(false);
      setApplyingFilter(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.firstContainer}>
        <Text style={styles.HeadingText}>Filters</Text>
        <TouchableOpacity onPress={clearFilter}>
          <Text style={[styles.HeadingText, {color: Colors.yellow}]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SepraterLine} />
      <View style={styles.mainContainer}>
        <View
          style={{flexDirection: 'row', width: '100%', alignSelf: 'center'}}>
          <View style={{width: '40%'}}>
            {route.params?.updateBusinessData ? (
              <View>
                <TouchableOpacity
                  style={[
                    styles.touch,
                    {
                      backgroundColor:
                        selectedFilter === 'State'
                          ? Colors.backGround
                          : Colors.backGround_grey,
                    },
                  ]}
                  onPress={() => setSelectedFilter('State')}>
                  <Text style={styles.text}>State</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.touch,
                    {
                      backgroundColor:
                        selectedFilter === 'City'
                          ? Colors.backGround
                          : Colors.backGround_grey,
                    },
                  ]}
                  onPress={() => setSelectedFilter('City')}>
                  <Text style={styles.text}>City</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={[
                    styles.touch,
                    {
                      backgroundColor:
                        selectedFilter === 'State'
                          ? Colors.backGround
                          : Colors.backGround_grey,
                    },
                  ]}
                  onPress={() => setSelectedFilter('State')}>
                  <Text style={styles.text}>State</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.touch,
                    {
                      backgroundColor:
                        selectedFilter === 'City'
                          ? Colors.backGround
                          : Colors.backGround_grey,
                    },
                  ]}
                  onPress={() => setSelectedFilter('City')}>
                  <Text style={styles.text}>City</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.touch,
                    {
                      backgroundColor:
                        selectedFilter === 'Club'
                          ? Colors.backGround
                          : Colors.backGround_grey,
                    },
                  ]}
                  onPress={() => setSelectedFilter('Club')}>
                  <Text style={styles.text}>Club</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{width: '60%'}}>
            {selectedFilter === 'State' && stateLoading ? (
              <View>
                <ActivityIndicator size="large" color={Colors.black} />
                <Text style={{textAlign: 'center'}}>
                  Sate Data is Loding...
                </Text>
              </View>
            ) : (
              selectedFilter === 'State' && renderStateList()
            )}

            {selectedFilter === 'City' && cityLoading ? (
              <View>
                <ActivityIndicator size="large" color={Colors.black} />
                <Text style={{textAlign: 'center'}}>
                  City Data is Loding...
                </Text>
              </View>
            ) : (
              selectedFilter === 'City' && renderCityList()
            )}

            {selectedFilter === 'Club' && clubLoading ? (
              <View>
                <ActivityIndicator size="large" color={Colors.black} />
                <Text style={{textAlign: 'center'}}>
                  Club Data is Loding...
                </Text>
              </View>
            ) : (
              selectedFilter === 'Club' && renderClubList()
            )}
          </View>
        </View>
      </View>
      <View style={styles.SepraterLine} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.HeadingText}>Close</Text>
        </TouchableOpacity>
        <View disabled={applyButtonDisabled}>
          {applyingFilter ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 10,
              }}>
              <ActivityIndicator size="large" color={Colors.yellow} />
              <Text
                style={{
                  fontWeight: '500',
                  color: Colors.black,
                  fontSize: responsiveFontSize(16),
                }}>
                Please Wait...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={
                route?.params?.updateBusinessData
                  ? applyBusinessFilter
                  : applyMemberFilter
              }>
              <Text style={[styles.HeadingText, {color: Colors.yellow}]}>
                Apply
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  firstContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    padding: responsivePadding(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  HeadingText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: responsiveFontSize(20),
  },
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(1),
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: responsivePadding(15),
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
  },
  touch: {
    padding: responsivePadding(15),
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: Colors.black,
  },
  textStyle: {
    fontSize: responsiveFontSize(16),
    padding: responsivePadding(10),
    fontWeight: '600',
    color: Colors.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsivePadding(5),
    marginStart: responsivePadding(5),
  },
});
