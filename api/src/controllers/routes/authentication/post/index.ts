import {RequestMethodTypes} from "../../../../constants";
import Controller from "./controller";

const instance = new Controller();
instance.create({
    type: RequestMethodTypes.POST,
    path: '/authentication'
});

export default instance;
