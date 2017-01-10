import decode from 'jwt-decode';

export function getTokenExpirationDate(token) {
    console.log(token);
    const decoded = decode(token);
    console.log(decoded);
    console.log(decoded.exp)
    if(!decoded.exp) {
        console.log('return null')
        return null
    }
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date
}

export function isTokenExpired(token) {
    const date = getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
        console.log("token expired");
        return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}