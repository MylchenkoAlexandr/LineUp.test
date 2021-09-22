import {RequestMethodTypes} from "../../../../constants";
import AuthenticationPostCtrl from "./controller";
import AuthenticationMiddleware from "../../../../middlewares/authentication.middleware";

const instance = new AuthenticationPostCtrl();
instance.create({
    type: RequestMethodTypes.POST,
    path: '/blog',
    middlewares: [
        AuthenticationMiddleware
    ]
});

export default instance;