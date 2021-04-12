import AsyncStorage from '@react-native-async-storage/async-storage';

const storeOpenModalInfo = async (value) => {
    console.log("storeOpenModalInfo value", value);
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@openModal_info', jsonValue);
    } catch (err) {
        console.log()
    }
};

const getOpenModalInfo = async () => {
    try {
        const value = await AsyncStorage.getItem('@openModal_info');
        const jsonValue = JSON.parse(value);

        if(jsonValue != null) {
            return jsonValue;
        } else {
            console.log("getOpenModalInfo null", jsonValue);
            return null;
        }
    } catch (err) {
        console.log('getUserInfo error', err);
        return null;
    }
}

export {storeOpenModalInfo, getOpenModalInfo};