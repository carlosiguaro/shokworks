/* eslint-disable no-useless-constructor */
import Data from "../../services/data";

class Controller extends Data {
    constructor(signal) {
        super(signal); 
    }
    
    getInputValue(e) {
        let obj = {};
        obj[e.name] = e.value;
        return obj;
    }
}

export default Controller;
