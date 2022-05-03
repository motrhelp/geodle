
import countryList from "../data/CountryList";

export const gameNumber = generateConsistentRandomGameNumber();

function generateConsistentRandomGameNumber() {
    const countriesWithFlags = countryList.filter(country => country.flag != null);

    // First hash, based on the date
    const today = new Date();
    const firstHash = (today.getDate() + today.getMonth() * 13) % countriesWithFlags.length;

    // Second hash, based on a country's name
    var secondHash = 0;
    for (let i = 0; i < countriesWithFlags[firstHash].name.length; i++) {
        secondHash += countriesWithFlags[firstHash].name.charCodeAt(0);
    }
    secondHash = secondHash % countriesWithFlags.length;

    return secondHash;
}