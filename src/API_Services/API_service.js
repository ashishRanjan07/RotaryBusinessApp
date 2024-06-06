import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// export const serverAddress = 'https://api.assertit.io/rotary';//Production Server
export const serverAddress = 'https://api-dev.assertit.io/rotary'; //Development Server
// export const serverAddress ='https://f2f5-103-255-232-22.ngrok-free.app/rotary'; //Ng rock server
export const staticImageURL = require('../Assets/Images/logosample.png');

export const GET_USER_TOKEN = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const GET_USER_DETAILS = async () => {
  const details = JSON.parse(await AsyncStorage.getItem('details'));
  return details;
};

export const VALIDATE_LOGIN = async data => {
  const url = `${serverAddress}/login`;
  const response = await axios
    .post(url, data)
    .then(res => {
      // console.log('Response Data:', res?.data);
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};

export const DISTRICT_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  console.log(userToken, 'Line 29');
  const url = `${serverAddress}/district/list`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const BUSINESS_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  // console.log(userToken,"Line 44")
  const url = `${serverAddress}/business/all`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_CLUB_BY_DISTRICT_ID = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/club/list/${id}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_BUSINESS_LIST_CLUB_ID = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/list/${id}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_FULL_BUSINESS_DETAILS = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/details/${id}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const CLUB_MEMBER_LIST = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/list/${id}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const BUSINESS_MEMBER_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/getallmembers`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_CLUB_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/club/getAllClubList`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_CITY_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/city/getAll`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_STATE_LIST = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/state/getAll`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const MEMBER_FULL_DETAIL = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/details/${id}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const EDIT_WORK_DETAILS = async (uuid, updatedData) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/edit/details`;
  const response = await axios
    .post(
      url,
      {
        uuid: uuid,
        ...updatedData,
      },
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const EDIT_BUSINESS_DETAILS = async updatedData => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/edit/details`;
  const response = await axios
    .post(
      url,
      {
        ...updatedData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const BUSINESS_LIST_BY_FILTER = async updatedData => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/filter`;
  const response = await axios
    .post(
      url,
      {
        ...updatedData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const View_PROFILE = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/stats/profile/view`;
  const response = await axios
    .post(
      url,
      {...id},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const VIEW_CONTACT = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/stats/profile/contactview`;
  const response = await axios
    .post(
      url,
      {...id},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const VIEW_NOTIFICATION = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/stats/profile/statistics/${data}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

// ${serverAddress}/member/forgot/password`;
export const SEND_OTP = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/forgot/password`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

// ${serverAddress}/member/verify/otp
export const VERIFY_OTP = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/verify/otp`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

// ${serverAddress}/member/reset-password`,
export const RESET_PASSWORD = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/reset-password`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ADD_PRODUCT = async productData => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/product/register`;
  const response = await fetch(url, {
    method: 'POST',
    body: productData,
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

export const FETCH_IMAGE = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/getsinglefile?file_path=${data}`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const LOGOUT = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/login/logout`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const BUSINESS_FILTER = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/filter`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const MEMBER_FILTER = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/filter/list`;
  const response = await axios
    .post(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

// https://8ee5-103-255-232-22.ngrok-free.app/rotary/category/get
export const CATEGORY = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/category/get`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  // console.log(response,"Line 489")
  return response;
};

// https://8ee5-103-255-232-22.ngrok-free.app/rotary/industry/get
export const INDUSTRY = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/industry/get`;
  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  // console.log(response,"Line 506")
  return response;
};

export const ADD_BUSINESS = async businessData => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/add`;
  const response = await fetch(url, {
    method: 'POST',
    body: businessData,
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response;
};

export const RESET_TEMP_PASSWORD = async data => {
  const url = `${serverAddress}/member/updatepassword`;
  const response = await axios
    .put(
      url,
      {
        ...data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  console.log(response, 'Line 533');
  return response;
};

// Product Delete
export const DELETE_PRODUCT = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/product/delete/${data}`;
  const response = await axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  console.log(response, 'Line 554');
  return response;
};
// Product Update
export const UPDATE_PRODUCT = async (productData, id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/product/update/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: productData,
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  });
  console.log(response, 'Line 568');
  return response;
};
// Business Delete
export const DELETE_BUSINESS = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/delete/${data}`;
  const response = await axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  // console.log(response,"Line 554")
  return response;
};
// Business Update
export const UPDATE_BUSINESS = async (businessData, id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/business/edit/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: businessData,
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
  });
  console.log(response, 'Line 568');
  return response;
};

// Remove Profile Picture
export const REMOVE_PROFILE_IMAGE = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/member/delete/image/${id}`;
  const response = await axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  // console.log(response,"Line 614")
  return response;
};

// Get Category by Industry Id
export const GET_CATEGORY_BY_INDUSTRY_ID = async id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/industry/get/${id}`;
  const response = await axios
  .get(url,{
    headers:{
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  })
  .then(res => res?.data)
  .catch(error => error?.response?.data);
  return response;
}
