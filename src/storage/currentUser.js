import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserInfo = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@currentUser_info', jsonValue);
  } catch (err) {
    console.log('storeUserInfo error', error);
  }
};

const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@currentUser_info');
    const jsonValue = JSON.parse(value);
    if (jsonValue != null) {
      return jsonValue;
    } else {
      console.log('getUserInfo null', jsonValue);
      return null;
    }
  } catch (err) {
    console.log('getUserInfo error', err);
    return null;
  }
};

export {storeUserInfo, getUserInfo};
