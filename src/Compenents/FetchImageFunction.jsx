import {
  GET_USER_TOKEN,
  serverAddress,
  staticImageURL,
} from '../API_Services/API_service';

export const FetchImageFromAWS = async ({path, setProfileImage}) => {
  try {
    const userToken = await GET_USER_TOKEN();
    const apiUrl = `${serverAddress}/member/getsinglefile?file_path=${path}`;
    // console.log(apiUrl, 'Line 7');
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    if (!data.err) {
      // console.log('Image fetch succesfully Line 15');
      setProfileImage(data.result);
    } else {
      console.log('Error fetching images Line 17:', data.result);
      // setProfileImage(staticImageURL);
    }
  } catch (error) {
    console.log('Error Fetching images Line 21:', error.result);
    // setProfileImage(staticImageURL);
  }
};
