import LocalStorage from "./LocalStorage";
import {TOKEN_STORE_KEY} from "./Constants";

export const jsonToObject = (json) => {
    let obj;
    try {
        obj = JSON.parse(json)
    } catch (error) {
        return {}
    }
    return obj;
}
export const deepClone = (value) => {
    return JSON.parse(JSON.stringify(value));
}
export const logout = () => {
    const store = LocalStorage(TOKEN_STORE_KEY);
    store.clear();
    window.location.href = "/";
}
