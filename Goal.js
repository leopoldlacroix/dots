import { Entity } from "./Entity.js";

class Goal extends Entity{

    static FILLSTYLE = "#00FF00";

    constructor(){
        super();
        this._type = "goal";

        this.pos = [0.94, 0.5]; //normalized pos
        this.size = 20;

        
        this.width = 0.03;
        this.height = 0.03;
        
        this.fillStyle = Goal.FILLSTYLE;
    }
}

export{ Goal }