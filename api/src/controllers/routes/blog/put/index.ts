import {RequestMethodTypes} from "../../../../constants";
import Controller from "./controller";
import AuthenticationMiddleware from "../../../../middlewares/authentication.middleware";

const instance = new Controller();
instance.create({
    type: RequestMethodTypes.PUT,
    path: '/blog',
    middlewares: [
        AuthenticationMiddleware
    ]
});

export default instance;
