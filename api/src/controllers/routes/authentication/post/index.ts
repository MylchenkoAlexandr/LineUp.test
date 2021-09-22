import {RequestMethodTypes} from "../../../../constants";
import AuthenticationPostCtrl from "./controller";

const instance = new AuthenticationPostCtrl();
instance.create({
    type: RequestMethodTypes.POST,
    path: '/authentication'
});

export default instance;
