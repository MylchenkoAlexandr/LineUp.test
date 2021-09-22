import {TEndPoints} from "../../types";
import authentication from "./authentication";
import registration from "./registration";
import blog from "./blog";

const all: TEndPoints = [
    ... authentication,
    ... registration,
    ... blog
]

export default all;
