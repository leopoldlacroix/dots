class Entity{

    static FILLSTYLE_DEAD = "#000000";
    static FILLSTYLE_WON = "#FF0000";

    constructor(){
        this.step_i = -1;

        this.pos = this.getStartPos();

        this.vel = this.getStartVel();
        this.acc = [];

        this.alive = true;
        
        this.fillStyle = Entity.FILLSTYLE_DEAD;

    }

    generateSteps(n_steps){
        let steps = [];
        for (let i = 0; i < n_steps; i++) {
            let step = this.generateStep();
            steps.push(step);
        }
        return steps;   
    }
    generateStep(){
        let dx = this.vel * (2*Math.random() - 1);
        let dy_len = Math.sqrt(this.vel * this.vel - dx*dx);
        let dy = dy_len * (Math.random() < 0.5 ? -1 : 1);
        return [dx, dy];
    }

    nextState(){
        this.step_i += 1;
        if (this.alive && this.step_i < this.steps.length) {
            this.pos[0] += this.steps[this.step_i][0];
            this.pos[1] += this.steps[this.step_i][1];
        }else{
            this.die();
        }
    }

    die(){
        this.alive = false;
        this.fillStyle = Entity.FILLSTYLE_DEAD;
    }

    won(){
        this.alive = false;
        this.fillStyle = Entity.FILLSTYLE_WON;
    }

    getStartPos(){
        return [0.01, 0.5]; //normalized pos
    }

    getStartVel(){
        return 1/40; //normalized speed
    }
}

export { Entity };