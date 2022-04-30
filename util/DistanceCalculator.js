
const coordNames = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️", "⬆️"];

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

    var coordIndex = Math.round(compassReading / 45);
    if (coordIndex < 0) {
        coordIndex = coordIndex + 8
    };

    return coordNames[coordIndex];

}

export function bearingToString(bearing) {
    if (bearing == coordNames[0]) {
        return "north (" + coordNames[0] + ")"
    }
    if (bearing == coordNames[1]) {
        return "northeast (" + coordNames[1] + ")"
    }
    if (bearing == coordNames[2]) {
        return "east (" + coordNames[2] + ")"
    }
    if (bearing == coordNames[3]) {
        return "southeast (" + coordNames[3] + ")"
    }
    if (bearing == coordNames[4]) {
        return "south (" + coordNames[4] + ")"
    }
    if (bearing == coordNames[5]) {
        return "southwest (" + coordNames[5] + ")"
    }
    if (bearing == coordNames[6]) {
        return "west (" + coordNames[6] + ")"
    }
    if (bearing == coordNames[7]) {
        return "northwest (" + coordNames[7] + ")"
    }
    if (bearing == coordNames[8]) {
        return "north (" + coordNames[8] + ")"
    }
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
