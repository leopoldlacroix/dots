import { Entity } from "./Entity.js";

class Goal extends Entity{

    static FILLSTYLE = "#00FF00";

    constructor(){
        super();
        this._type = "goal";
        
        this.width = 0.05;
        this.height = 0.05;
        
        this.pos = [0.12, 0.5 - this.height/2]; //normalized pos
        
        this.fillStyle = Goal.FILLSTYLE;
    }
}

export{ Goal }