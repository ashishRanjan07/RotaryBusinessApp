import {
  BUSINESS_LIST,
  GET_ALL_BUSINESS_LIST_CLUB_ID,
  CLUB_MEMBER_LIST,
  DISTRICT_LIST,
  GET_CLUB_BY_DISTRICT_ID,
  GET_FULL_BUSINESS_DETAILS,
  MEMBER_FULL_DETAIL,
  VALIDATE_LOGIN,
  BUSINESS_MEMBER_LIST,
  GET_ALL_CLUB_LIST,
  GET_ALL_CITY_LIST,
  GET_ALL_STATE_LIST,
  ADD_PRODUCT,
  View_PROFILE,
  VIEW_CONTACT,
  NOTIFICATION,
  VIEW_NOTIFICATION,
  SEND_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
  FETCH_IMAGE,
  LOGOUT,
  BUSINESS_FILTER,
  MEMBER_FILTER,
  CATEGORY,
  INDUSTRY,
  ADD_BUSINESS,
  RESET_TEMP_PASSWORD,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_BUSINESS,
  UPDATE_BUSINESS,
  REMOVE_PROFILE_IMAGE,
  GET_CATEGORY_BY_INDUSTRY_ID,
} from './API_service';

export const validateLogin = async data => {
  try {
    const response = await VALIDATE_LOGIN(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const businessMemberList = async () => {
  try {
    const response = await BUSINESS_MEMBER_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const districtList = async () => {
  try {
    const response = await DISTRICT_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllClubList = async () => {
  try {
    const response = await GET_ALL_CLUB_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllCityList = async () => {
  try {
    const response = await GET_ALL_CITY_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllStateList = async () => {
  try {
    const response = await GET_ALL_STATE_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const allBusinessList = async () => {
  try {
    const response = await BUSINESS_LIST();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getClubByDistrictID = async id => {
  try {
    const response = await GET_CLUB_BY_DISTRICT_ID(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getFullBusinessDetails = async id => {
  try {
    const response = await GET_FULL_BUSINESS_DETAILS(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const clubMemberList = async id => {
  try {
    const response = await CLUB_MEMBER_LIST(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const memberFullDetail = async id => {
  try {
    const response = await MEMBER_FULL_DETAIL(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllBusinessListClubId = async id => {
  try {
    const response = await GET_ALL_BUSINESS_LIST_CLUB_ID(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const viewProfile = async id => {
  try {
    const response = await View_PROFILE(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const viewContact = async id => {
  try {
    const response = await VIEW_CONTACT(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const notificaton = async data => {
  try {
    const response = await VIEW_NOTIFICATION(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// SEND_OTP
export const sendOtp = async data => {
  try {
    const response = await SEND_OTP(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// VERIFY_OTP
export const verifyOtp = async data => {
  try {
    const response = await VERIFY_OTP(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// RESET_PASSWORD
export const resetPassword = async data => {
  try {
    const response = await RESET_PASSWORD(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const addProduct = async productData => {
  try {
    const response = await ADD_PRODUCT(productData);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (productData, id) => {
  try {
    const response = await UPDATE_PRODUCT(productData, id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// FETCH_IMAGE
export const fetchImage = async data => {
  try {
    const response = await FETCH_IMAGE(data);
    if (!response || response.err) {
      return `Fallback or error image URL`;
    } else {
      return response.result;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return `Fallback or error image URL`;
  }
};

// FILTER
export const business_filter = async data => {
  try {
    const response = await BUSINESS_FILTER(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// MEMBER_FILTER
export const member_filter = async data => {
  try {
    const response = await MEMBER_FILTER(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Logout
export const logout = async data => {
  try {
    const response = await LOGOUT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const category = async () => {
  try {
    const response = await CATEGORY();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const industry = async () => {
  try {
    const response = await INDUSTRY();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

//Add Business
export const addBusiness = async businessData => {
  try {
    const response = await ADD_BUSINESS(businessData);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Reset tem Password

export const resetTempPassword = async data => {
  try {
    const response = await RESET_TEMP_PASSWORD(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Product Delete
export const deleteProduct = async data => {
  try {
    const response = await DELETE_PRODUCT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Business Delete
export const deleteBusiness = async data => {
  try {
    const response = await DELETE_BUSINESS(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Update Business
export const updateBusiness = async (businessData, id) => {
  try {
    const response = await UPDATE_BUSINESS(businessData, id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

//Delete Profile Picture
export const removeProfilePicture = async id => {
  const response = await REMOVE_PROFILE_IMAGE(id);
  try {
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

// Get Category by Industry id
export const getCategoryByIndustryId = async id => {
  const response = await GET_CATEGORY_BY_INDUSTRY_ID(id);
  try {
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};