import {TEndPoints} from "../../types";
import authentication from "./authentication";
import registration from "./registration";

const all: TEndPoints = [
    ...authentication,
    ...registration
]

export default all;
