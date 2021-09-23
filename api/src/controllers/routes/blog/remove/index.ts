import {RequestMethodTypes} from "../../../../constants";
import Controller from "./controller";
import AuthenticationMiddleware from "../../../../middlewares/authentication.middleware";

const instance = new Controller();
instance.create({
    type: RequestMethodTypes.DELETE,
    path: '/blog/:id',
    middlewares: [
        AuthenticationMiddleware
    ]
});

export default instance;
