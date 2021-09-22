import {EndPointType} from "../../../../constants";
import AuthenticationGetCtrl from "./controller";

const instance = new AuthenticationGetCtrl() ;
instance.create({
    type: EndPointType.GET,
    path: '/authentication'
}) ;

export default instance ;
