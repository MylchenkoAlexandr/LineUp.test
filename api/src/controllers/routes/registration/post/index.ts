import {EndPointType} from "../../../../constants";
import Controller from "./controller";

const instance = new Controller();
instance.create({
    type: EndPointType.POST,
    path: '/registration'
});

export default instance;
