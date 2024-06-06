import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  addBusiness,
  category,
  getAllCityList,
  getAllStateList,
  getCategoryByIndustryId,
  industry,
} from '../../../API_Services/auth_API';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../Compenents/Header';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import CustomAlert from '../../../Compenents/CustomAlert';

const AddBusiness = ({route}) => {
  const navigation = useNavigation();
  const {cityData, userId} = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState('');
  const [primaryImage, setPrimaryImage] = useState('');
  const [secondImage, setSecondImage] = useState('');
  const [secondaryImage, SetSecondaryImage] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedIndustryId, setSelectedIndustryId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loadingStateList, setLoadingStateList] = useState(true);
  const [loadingCityList, setLoadingCityList] = useState(true);
  const [loadingIndustryList, setLoadingIndustryList] = useState(true);
  const [loadingCategoryList, setLoadingCategoryList] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredCityList, setFilteredCityList] = useState([]);
  const [filteredStateList, setFilteredStateList] = useState([]);
  const [filteredIndustryList, setFilteredIndustryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [searchStateText, setSearchStateText] = useState('');
  const [searchIndustryText, setSearchIndustryText] = useState('');
  const [searchCategoryText, setSearchCategoryText] = useState('');
  const [logoUri, setLogoUri] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getAllCategoryList();
    getAllIndustryList();
    getAllCityDataList();
    getAllStateDataList();
  }, []);

  useEffect(() => {
    // Initialize filtered lists with complete lists when component mounts
    setFilteredStateList(states);
    setFilteredCityList(cityList);
    setFilteredIndustryList(industryList);
    setFilteredCategoryList(categoryList);

    setLoadingStateList(false);
    setLoadingCityList(false);
    setLoadingIndustryList(false);
    setLoadingCategoryList(false);
  }, [states, cityList, industryList, categoryList]);

  useEffect(() => {
    // Filter the city list when the selected state changes
    const filteredCities = cityList.filter(
      city => city.state_id === selectedStateId,
    );
    setFilteredCityList(filteredCities);
  }, [selectedStateId]);

  const handleSearch = text => {
    setSearchText(text);
    // Filter the city list based on the search text and selected state
    const filteredCities = cityList.filter(
      city =>
        city.name.toLowerCase().includes(text.toLowerCase()) &&
        city.state_id === selectedStateId,
    );
    setFilteredCityList(filteredCities);
  };
  const handleSearchState = text => {
    setSearchStateText(text);
    // Filter the state list based on the search text
    const filteredStates = states.filter(state =>
      state.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredStateList(filteredStates);
  };

  const handleSearchIndustry = text => {
    setSearchIndustryText(text);
    // Filter the industry list based on the search text
    const filteredIndustries = industryList.filter(industry =>
      industry.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredIndustryList(filteredIndustries);
  };

  const handleSearchCategory = text => {
    setSearchCategoryText(text);
    // Filter the category list based on the search text
    const filteredCategories = categoryList.filter(category =>
      category.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCategoryList(filteredCategories);
  };

  const getAllCategoryList = async () => {
    try {
      // console.log(selectedIndustryId, "Line 144");

      if (selectedIndustryId) {
        const response = await getCategoryByIndustryId(selectedIndustryId);
        // console.log(response, "Line 147");
        if (response.success) {
          setCategoryList(response.industry.categories);
          // console.log(response.industry.categories, "Line 105");
        }
      }
    } catch (error) {
      console.log('Error fetching category list:', error);
    }
  };

  useEffect(() => {
    if (selectedIndustryId) {
      getAllCategoryList();
    }
  }, [selectedIndustryId]);

  const getAllIndustryList = async () => {
    try {
      const response = await industry();
      if (response.success) {
        setIndustryList(response.industry);
        // console.log(response.industry, 'Line 111');
      }
    } catch (error) {
      console.log('Error fetching industry list:', error);
    }
  };
  const getAllCityDataList = async () => {
    try {
      const response = await getAllCityList();
      if (response.success) {
        setCityList(response.city);
      }
    } catch (error) {
      console.log('Error fetching city list:', error);
    }
  };

  const getAllStateDataList = async () => {
    try {
      const response = await getAllStateList();
      if (response.success) {
        setStates(response.state);
      }
    } catch (error) {
      console.log('Error fetching state list:', error);
    }
  };
  const handleRemoveImage = index => {
    const updatedImages = [...secondaryImage];
    updatedImages.splice(index, 1);
    SetSecondaryImage(updatedImages);
  };

  const handleCategorySelection = category => {
    setSelectedCategory(category?.name);
    setSelectedCategoryId(category?.id);
    setShowCategoryDropdown(false);
    setSearchCategoryText('');
    setFilteredCategoryList(categoryList);
  };

  const handleIndustrySelection = industry => {
    setSelectedIndustry(industry?.name);
    setSelectedIndustryId(industry?.id);
    setShowIndustryDropdown(false);
    setSearchIndustryText('');
    setFilteredIndustryList(industryList);
  };

  const handleStateSelection = state => {
    setSelectedState(state.name);
    setSelectedStateId(state.id);
    setShowStateDropdown(false);
    setSearchStateText('');
    setFilteredStateList(states);
  };
  const handleCitySelection = city => {
    setSelectedCity(city.name);
    setSelectedCityId(city.id);
    setShowCityDropdown(false);
    setSearchText('');
    setFilteredCityList(cityList.filter(c => c.state_id === selectedStateId));
  };

  const galleryOpen = async setImage => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (images && images.length > 0) {
        // Limit the number of images to 2
        const limitedImages = images.slice(0, 2);
        const imageUris = limitedImages.map(image => image.path);
        setImage(imageUris);
      } else {
        console.log('User Cancelled Image Picker');
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const galleryOpenForLogo = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User Cancelled Image Picker');
        } else if (response.error) {
          console.log('Image Picker Error:', response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setLogoUri(imageUri);
          setLogo(imageUri);
        }
      });
    } catch (error) {
      console.log('Error in Open Image Picker:', error.message);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setAddress('');
    setPincode('');
    setSelectedState('');
    setSelectedStateId('');
    setSelectedCity('');
    setSelectedCityId('');
    setSelectedIndustry('');
    setSelectedIndustryId('');
    setSelectedCategory('');
    setSelectedCategoryId('');
    setLogo('');
    setLogoUri('');
    setPrimaryImage('');
    setSecondImage('');
    setSearchText('');
    setSearchStateText('');
    setSearchIndustryText('');
    setSearchCategoryText('');
    setErrors({});
    setShowAlert(false);
    SetSecondaryImage('');
  };

  useEffect(() => {
    if (name) {
      setErrors(prevErrors => ({...prevErrors, name: ''}));
    }
  }, [name]);

  useEffect(() => {
    if (description) {
      setErrors(prevErrors => ({...prevErrors, description: ''}));
    }
  }, [description]);

  useEffect(() => {
    if (address) {
      setErrors(prevErrors => ({...prevErrors, address: ''}));
    }
  }, [address]);

  useEffect(() => {
    if (pincode) {
      setErrors(prevErrors => ({...prevErrors, pincode: ''}));
    }
  }, [pincode]);

  useEffect(() => {
    if (selectedStateId) {
      setErrors(prevErrors => ({...prevErrors, state: ''}));
    }
  }, [selectedStateId]);

  useEffect(() => {
    if (selectedCityId) {
      setErrors(prevErrors => ({...prevErrors, city: ''}));
    }
  }, [selectedCityId]);

  useEffect(() => {
    if (selectedIndustryId) {
      setErrors(prevErrors => ({...prevErrors, industry: ''}));
    }
  }, [selectedIndustryId]);

  useEffect(() => {
    if (selectedCategoryId) {
      setErrors(prevErrors => ({...prevErrors, category: ''}));
    }
  }, [selectedCategoryId]);

  const handleSubmit = async () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is missing';
    }
    if (!description) {
      errors.description = 'Description is missing';
    }
    if (!address) {
      errors.address = 'Address is missing';
    }
    if (!pincode) {
      errors.pincode = 'Pincode is missing';
    }
    if (!selectedStateId) {
      errors.state = 'State is missing';
    }
    if (!selectedCityId) {
      errors.city = 'City is missing';
    }
    if (!selectedIndustryId) {
      errors.industry = 'Industry is missing';
    }
    if (!selectedCategoryId) {
      errors.category = 'Category is missing';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const businessData = new FormData();
      businessData.append('business_name', name);
      businessData.append('business_desc', description);
      businessData.append('business_address', address);
      businessData.append('business_city', selectedCityId);
      businessData.append('business_state', selectedStateId);
      businessData.append('business_pincode', pincode);
      businessData.append('member_id', userId);
      businessData.append('business_category', selectedCategoryId.toString());
      businessData.append('business_industry', selectedIndustryId.toString());

      if (logoUri) {
        businessData.append('business_logo', {
          uri: logoUri,
          type: 'image/jpeg',
          name: 'business_logo.jpg',
        });
      }
      if (secondaryImage.length > 0) {
        secondaryImage.forEach((uri, index) => {
          businessData.append(`file`, {
            uri: uri,
            type: 'image/jpeg',
            name: `business_image_${index + 1}.jpg`,
          });
        });
      }

      // console.log(businessData, 'Line 321');
      const response = await addBusiness(businessData);
      const responseJson = await response.json();
      console.log(responseJson, 'Line 323');
      if (responseJson.success) {
        resetForm();
        setShowAlert(true);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      console.log('Error in handleSubmit:', error);
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Header title={'Add Business'} />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        {/* Add Business Logo */}
        <TouchableOpacity
          style={styles.buttonHolder}
          onPress={galleryOpenForLogo}>
          <Feather
            name="upload"
            size={responsiveFontSize(20)}
            color={Colors.black}
          />
          <Text style={styles.buttonText}>Add Business Logo</Text>
        </TouchableOpacity>
        {logoUri !== '' && (
          <View style={styles.imageContainer}>
            <Image source={{uri: logoUri}} style={styles.image} />
          </View>
        )}
        {/* Business Name */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="default"
            label={'Name*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setName(text)}
            placeholder="Business Name"
            value={name}
          />
        </View>
        {errors.name && (
          <View style={styles.errorHolder}>
            <Text style={styles.error}>{errors.name}</Text>
          </View>
        )}
        {/* Business Descriptions */}
        <View
          style={[styles.textInputHolder, {height: responsivePadding(200)}]}>
          <TextInput
            keyboardType="default"
            label={'Description*'}
            mode="outlined"
            style={[styles.textInputBox, {height: responsivePadding(200)}]}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setDescription(text)}
            placeholder="Business Description"
            value={description}
            multiline
          />
        </View>
        {errors.description && (
          <View style={styles.errorHolder}>
            <Text style={styles.error}>{errors.description}</Text>
          </View>
        )}
        {/* Business Address */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="default"
            label={'Address*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setAddress(text)}
            placeholder="Business Address"
            value={address}
          />
        </View>
        {errors.address && (
          <View style={styles.errorHolder}>
            <Text style={styles.error}>{errors.address}</Text>
          </View>
        )}
        {/* Business State Id */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>State</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowStateDropdown(!showStateDropdown)}>
            <Text style={styles.text}>{selectedState || 'Select State'}</Text>
            <AntDesign
              name="caretdown"
              size={responsiveFontSize(20)}
              color={Colors.black}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          {showStateDropdown && (
            <View style={styles.dropdownContent}>
              <TextInput
                keyboardType="default"
                label={'Search*'}
                mode="outlined"
                style={[
                  styles.textInputBox,
                  {width: '90%', alignSelf: 'center', marginVertical: 10},
                ]}
                placeholderTextColor={Colors.text_grey}
                onChangeText={handleSearchState}
                value={searchStateText}
                placeholder="Search State"
              />
              {filteredStateList.map((state, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleStateSelection(state)}>
                  <Text style={styles.text}>{state.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.state && <Text style={styles.error}>{errors.state}</Text>}
        </View>
        {/* Business City Id */}
        {selectedState && (
          <View style={styles.viewHolder}>
            <Text style={styles.text}>City</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowCityDropdown(!showCityDropdown)}>
              <Text style={styles.text}>{selectedCity || 'Select City'}</Text>
              <AntDesign
                name="caretdown"
                size={responsiveFontSize(20)}
                color={Colors.black}
                style={{marginHorizontal: 10}}
              />
            </TouchableOpacity>
            {showCityDropdown && (
              <View style={styles.dropdownContent}>
                <TextInput
                  keyboardType="default"
                  label={'Search*'}
                  mode="outlined"
                  style={[
                    styles.textInputBox,
                    {width: '90%', alignSelf: 'center', marginVertical: 10},
                  ]}
                  placeholderTextColor={Colors.text_grey}
                  onChangeText={handleSearch}
                  value={searchText}
                  placeholder="Search City"
                />
                {filteredCityList.map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleCitySelection(city)}>
                    <Text style={styles.text}>{city.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>
        )}
        {/* Business Pin Code */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="number-pad"
            label={'Pincode*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setPincode(text)}
            placeholder="Business Pincode"
            value={pincode}
            maxLength={6}
          />
        </View>
        {errors.pincode && (
          <View style={styles.errorHolder}>
            <Text style={styles.error}>{errors.pincode}</Text>
          </View>
        )}
        {/* Business Industry */}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Industry</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowIndustryDropdown(!showIndustryDropdown)}>
            <Text style={styles.text}>
              {selectedIndustry || 'Select Industry'}
            </Text>
            <AntDesign
              name="caretdown"
              size={responsiveFontSize(20)}
              color={Colors.black}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          {showIndustryDropdown && (
            <View style={styles.dropdownContent}>
              <TextInput
                placeholderTextColor={Colors.text_grey}
                onChangeText={handleSearchIndustry}
                value={searchIndustryText}
                keyboardType="default"
                label={'Search*'}
                mode="outlined"
                style={[
                  styles.textInputBox,
                  {width: '90%', alignSelf: 'center', marginVertical: 10},
                ]}
                placeholder={'Search Industry'}
              />
              {filteredIndustryList.map((industry, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleIndustrySelection(industry)}>
                  <Text style={styles.text}>{industry.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.industry && (
            <Text style={styles.error}>{errors.industry}</Text>
          )}
        </View>
        {/* Business Category*/}
        <View style={styles.viewHolder}>
          <Text style={styles.text}>Category</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
            <Text style={styles.text}>
              {selectedCategory || 'Select Category'}
            </Text>
            <AntDesign
              name="caretdown"
              size={responsiveFontSize(20)}
              color={Colors.black}
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          {showCategoryDropdown && (
            <View style={styles.dropdownContent}>
              <TextInput
                placeholder="Search Category"
                placeholderTextColor={Colors.text_grey}
                onChangeText={handleSearchCategory}
                value={searchCategoryText}
                keyboardType="default"
                label={'Search*'}
                mode="outlined"
                style={[
                  styles.textInputBox,
                  {width: '90%', alignSelf: 'center', marginVertical: 10},
                ]}
              />
              {filteredCategoryList.length === 0 ? (
                <Text style={[styles.text,{textAlign:'center'}]}>No categories found</Text>
              ) : (
                filteredCategoryList.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleCategorySelection(category)}>
                    <Text style={styles.text}>{category.name}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
          {errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}
        </View>
        {/* Upload Business Image */}
        <TouchableOpacity
          style={styles.buttonHolder}
          onPress={() => galleryOpen(SetSecondaryImage)}>
          <Feather
            name="upload"
            size={responsiveFontSize(20)}
            color={Colors.black}
          />
          <Text style={styles.buttonText}>Add Business Image</Text>
        </TouchableOpacity>
        {secondaryImage.length > 0 && (
          <View style={styles.imageContainer}>
            {secondaryImage.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{uri: uri}} style={styles.image} />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleRemoveImage(index)}>
                  <Feather name="x" size={20} color={Colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
          <Text style={[styles.text, {color: Colors.white, fontWeight: '600'}]}>
            Add Business
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomAlert
        visible={showAlert}
        onClose={() => {
          setShowAlert(false);
          navigation.push('TabStack');
        }}
        onYes={() => {
          // Handle Yes action here
          navigation.push('Add Products');
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    height: '100%',
  },
  viewHolder: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
    gap: responsivePadding(10),
  },
  text: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: Colors.text_grey,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.black,
    height: responsivePadding(40),
    borderRadius: responsivePadding(5),
    paddingLeft: responsivePadding(10),
  },
  touch: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(20),
    alignItems: 'center',
    backgroundColor: '#F7A81B',
    borderColor: '#F7A81B',
    marginBottom: 25,
    height: responsivePadding(50),
    justifyContent: 'center',
  },
  error: {
    color: Colors.red,
    fontSize: responsiveFontSize(16),
    // marginTop:10,
  },
  imageViewHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: Colors.text_grey,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.black,
    borderRadius: responsivePadding(5),
    paddingLeft: responsivePadding(10),
    paddingTop: 10,
    paddingBottom: 10,
    height: responsivePadding(50),
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.buttonBackground,
  },
  dropdownContent: {
    marginVertical: responsivePadding(10),
    width: '95%',
    backgroundColor: '#fff',
    borderColor: Colors.text_grey,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text_grey,
  },
  section: {
    marginVertical: responsivePadding(10),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    marginBottom: responsivePadding(5),
    marginLeft: responsivePadding(10),
  },
  categoryItem: {
    fontSize: responsiveFontSize(16),
    marginLeft: responsivePadding(20),
  },
  industryItem: {
    fontSize: responsiveFontSize(16),
    marginLeft: responsivePadding(20),
  },
  section: {
    marginVertical: responsivePadding(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsivePadding(10),
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  searchHolder: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsivePadding(10),
    marginVertical: responsivePadding(10),
    borderColor: Colors.border_grey,
    color: Colors.black,
    fontSize: responsiveFontSize(18),
  },
  buttonHolder: {
    marginVertical: responsivePadding(10),
    borderWidth: responsivePadding(1),
    borderColor: Colors.stroke,
    borderRadius: responsivePadding(5),
    width: '95%',
    alignSelf: 'center',
    height: responsivePadding(50),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsivePadding(10),
    backgroundColor: Colors.buttonBackground,
  },
  buttonText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
    color: Colors.black,
  },
  textInputHolder: {
    width: '95%',
    // overflow:'hidden',
    borderRadius: responsivePadding(5),
    alignSelf: 'center',
    height: responsivePadding(51),
    marginVertical: responsivePadding(10),
  },
  textInputBox: {
    // height: responsivePadding(50),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(5),
    borderBottomEndRadius: responsivePadding(5),
    borderBottomStartRadius: responsivePadding(5),
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  errorHolder: {
    marginTop: responsivePadding(10),
    paddingHorizontal: responsivePadding(15),
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 5,
  },
});
