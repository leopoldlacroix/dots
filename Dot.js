import { Entity } from "./Entity.js";

class Dot extends Entity{
    
    static FILLSTYLE_ALIVE = "#0000FF";
    static FILLSTYLE_DEAD = "#000000";

    constructor(n_steps){
        super();
        this._type = "dot"; 

        this.width = 0.02;
        this.height = 0.02;

        this.steps = this.generateSteps(n_steps);

        this.fillStyle = Dot.FILLSTYLE_ALIVE;

    }

    reproduce(){
        
        let child = new Dot();
        let inherit = ["steps"];

        inherit.forEach((key) => {
            child[key] = JSON.parse(JSON.stringify(this[key]));
        });

        let threshold = 0.05; //for a threshold% modified child

        for (let i in child.steps) {

            if (Math.random() < threshold) {

                let step = this.generateStep();

                child.steps[i] = step;
            }
        }

        return child;
    }

    restart(){
        this.pos = this.getStartPos();
        this.step_i = -1;
        this.alive = true;
        this.fillStyle = Dot.FILLSTYLE_ALIVE;

        return this;
    }

    clone(){
        let clone = new Dot();
        let clone_this = JSON.parse(JSON.stringify(this));
        for(let key of Object.keys(clone_this)){
            clone[key] = this[key];
        }

        return clone;
    }
}


export { Dot };