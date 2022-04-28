export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

export function getBearingFromLatLon(lat1, lon1, lat2, lon2) {
    var radians = Math.atan2((lon2 - lon1), (lat2 - lat1));
    var compassReading = radians * (180 / Math.PI);

    var coordNames = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️", "⬆️"];
    var coordIndex = Math.round(compassReading / 45);
    if (coordIndex < 0) {
        coordIndex = coordIndex + 8
    };

    return coordNames[coordIndex];

}

// export function getBearingFromLatLon(lat1, lon1, lat2, lon2) {
//     const y = Math.sin(lat2 - lat1) * Math.cos(lon2);
//     const x = Math.cos(lon1) * Math.sin(lon2) -
//         Math.sin(lon1) * Math.cos(lon2) * Math.cos(lat2 - lat1);
//     const θ = Math.atan2(y, x);
//     const brng = (θ * 180 / Math.PI + 360) % 360; // in degrees
//     return Math.floor(brng);
// }

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
