import {jsonToObject} from "./Utils";

const LocalStorage = (name) => ({
    getState: () => jsonToObject(localStorage.getItem(name)),
    setState: (data) => localStorage.setItem(name, JSON.stringify(data)),
    clear: () => localStorage.removeItem(name)
})

export default LocalStorage;
