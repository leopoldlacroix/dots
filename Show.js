class Show{

    static FILL_BEST = '#00FF00'
    constructor(game){
        this._type = "show";

        // initialize display
        this.width = game.win_width;
        this.height = game.win_height;

        let playground_dom = document.getElementById('playground');
        playground_dom.width = this.width;
        playground_dom.height = this.height;
        this.ctx = playground_dom.getContext('2d');
        
        this.game = game;

        this.interval = null;
        this.ms_timer = 2;

        this.loop = false;

        this.showPlayground();
    }

    showPlayground(){
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let entity of this.game.entities) {
            this.ctx.fillStyle = entity.fillStyle;
            let x = entity.pos[0] * this.width; 
            let y = entity.pos[1] * this.height; 
            let w = entity.width * this.width; 
            let h = entity.height * this.height;
            this.ctx.fillRect(x, y, w, h);
        }
        
    }
        
    nextState(){

        if(this.game.dots.every((dot) => !dot.alive)){
            this.game.restart();
            this.updateGen();
            
            this.game.dots[this.game.dots.length - 1].fillStyle = Show.FILL_BEST;
            
            if (!this.loop) {
                clearInterval(this.interval);
            }

        }else{
            this.game.nextState();

            this.showPlayground();
        }        

    }

    start(){
        this.resetInterval();
        this.loop = true;
    }
    resetInterval(){
        clearInterval(this.interval);
        this.interval = setInterval(this.nextState.bind(this), this.ms_timer);
    }
    

    setFps(fps){
        this.ms_timer = 1000 * 60 * 10;
        if(fps > 0){
            this.ms_timer = (1/fps)*1000;
        }
        if (this.interval) {
            this.resetInterval();
        }
    }
    setTimer(ms_timer){
        this.ms_timer = ms_timer;
        if (this.interval) {
            this.resetInterval();
        }
    }
    
    updateGen(){
        document.getElementById('gen').innerHTML = this.game.gen;
    }
}

export { Show };