import { Dot } from './Dot.js';
import { Goal } from './Goal.js';

class Game{

    constructor(n_dots, n_steps){
        this._type = "game";
        // this.win_width = window.innerWidth * 98.5/100;
        // this.win_height = window.innerHeight * 98 /100;

        this.win_width = 500;
        this.win_height = 500;

        this.gen = 0;
        this.dots = this.getDots(n_dots, n_steps);
        this.goal = new Goal();

        this.entities = this.getEntities();

    }

    getDots(n_dots, n_steps){
        let dots = [];
        for (let i = 0; i < n_dots; i++) {
            dots.push(new Dot(n_steps));
        }
        return dots;
    }

    nextState(){

        this.dots.sort((dot1, dot2) => -(dot1.alive - dot2.alive)); //puts those alive first
        for (let dot of this.dots) {
            if (!dot.alive) {
                break;
            }
            dot.nextState();

            switch (this.moveResult(dot)) {
                case -1:
                    dot.die();
                    break;

                case 1:
                    dot.won();
                    break;
            
                default:
                    break;
            }
        }
    }

    moveResult(dot){

        let pos = dot.pos;

        //outside window
        if(pos[0] < 0 || pos[1] < 0 || pos[0] + dot.width > 1 || pos[1] + dot.height > 1){
            return -1;
        }

        if(this.collision(dot, this.goal)){
            return 1;
        }

        return 0;
    }

    collision(entity1, entity2){
        if(entity2.pos[0] <= entity1.pos[0] + entity1.width &&
            entity2.pos[0] + entity2.width >= entity1.pos[0] &&
            entity2.pos[1] <= entity1.pos[1] + entity1.height &&
            entity2.pos[1] + entity2.height >= entity1.pos[1]){
                return true;
            }
        
            return false
    }

    

    //next game
    restart(){

        //natural selection
        this.dots.sort((dot1, dot2) => this.score(dot1) - this.score(dot2));

        let proba_func = (index) => Math.exp( -(index/this.dots.length) * 4 + 1); //p=1 for 0, 0.006 for len
        let new_dots = [];

        while (new_dots.length < this.dots.length - 1) {
            let dot_i = Math.floor(Math.random() * this.dots.length);
            let prob = proba_func(dot_i);

            if(Math.random() <= prob){
                let new_dot = this.dots[dot_i];
                new_dot = new_dot.clone();
                new_dots.push(new_dot);
            }
        }
        
        new_dots.forEach((new_dot) => {
            new_dot.restart();
        });

        //mutations
        let i = -1;
        for(i in new_dots){

            let dot_to_reproduce = new_dots[i];
            let child = dot_to_reproduce.reproduce();
            new_dots[i] = child;
        }

        //keep the best
        new_dots.push(this.dots[0].clone().restart());
        
        this.dots = new_dots;
        this.entities = this.getEntities();
        this.gen +=1;
    }

    /**
     * the lower the score the better
     * @param {Dot} dot 
     * @returns 
     */
    score(dot){
        //TODO score de longevité

        let dx = dot.pos[0] - this.goal.pos[0];
        let dy = dot.pos[1] - this.goal.pos[1];
        let dist_to_goal = dx*dx + dy*dy;
        if(this.collision(dot, this.goal)){
            dist_to_goal = 0;
        }

        let expectancy_score = 1 - dot.step_i/dot.steps.length;

        let score = Math.ceil(dist_to_goal) * 100 + dist_to_goal * 10 + expectancy_score;

        return score;
    }

    getEntities(){
        let entities = [...this.dots];
        entities.push(this.goal);
        return entities;
    }
}


export { Game };