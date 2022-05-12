
import countriesWithFlags from "../data/CountryList";

export const gameNumber = generateConsistentRandomGameNumber();

function generateConsistentRandomGameNumber() {
    // First hash, based on the date
    const today = new Date();
    const firstHash = (today.getDate() + today.getMonth() * 15) % countriesWithFlags.length;

    // Second hash, based on a country's name
    let secondHash = 0;
    for (let i = 0; i < countriesWithFlags[firstHash].name.length; i++) {
        secondHash += countriesWithFlags[firstHash].name.charCodeAt(0);
    }

    // Combine the two
    let thirdHash = firstHash * secondHash;

    return thirdHash % countriesWithFlags.length;
}