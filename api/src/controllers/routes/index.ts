import { EndPoints } from "../../types";
import root from "./root.controller";
import test from "./test.controller";
import throwned from "./throwned.controller";

const all: EndPoints = [
    root,
    test,
    throwned
]

export default all ;