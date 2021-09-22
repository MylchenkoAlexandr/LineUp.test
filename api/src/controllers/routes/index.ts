import {EndPoints} from "../../types";
import authentication from "./authentication";
import {logger} from "../../helpers";

/* debug */ logger("[ authentication ]", authentication ) ;

const all: EndPoints = [
    ... authentication
]

export default all ;
