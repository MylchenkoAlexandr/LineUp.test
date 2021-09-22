import {EndPointType} from "../../../../constants";
import AuthenticationPostCtrl from "./controller";

const instance = new AuthenticationPostCtrl() ;
instance.create({
    type: EndPointType.POST,
    path: '/authentication'
}) ;

export default instance ;
