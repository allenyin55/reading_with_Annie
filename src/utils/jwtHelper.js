import decode from 'jwt-decode';

export function getTokenExpirationDate(token) {
    console.log("start of the getToken");
    const decoded = decode(token);
    if(!decoded.exp) {
        return null
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    console.log("end of the getToken")
    return date
}

export function isTokenExpired(token) {
    const date = getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
        console.log("token expired")
        return false
    }
    console.log('end of isTokenExpired');
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}