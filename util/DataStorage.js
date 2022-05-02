import AsyncStorage from '@react-native-async-storage/async-storage';

import countryList from '../data/CountryList';
import { gameNumber } from './GameNumber';

const today = new Date();
const datePrefix = gameNumber + today.getDate() + "" + today.getMonth();

export async function loadItem(item, fallback, setterToCall) {
    const itemFromStorage = await AsyncStorage.getItem('@' + datePrefix + item);
    if (itemFromStorage != null) {
        return setterToCall(JSON.parse(itemFromStorage));
    } else {
        return setterToCall(fallback);
    }
}

export async function storeItem(name, value) {
    try {
        await AsyncStorage.setItem('@' + datePrefix + name, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
}
