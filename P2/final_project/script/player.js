class player {
    constructor(x, y, game) {
        // App game;
        this.game = game;
        this.wh = this.game && this.game.wh ? this.game.wh : 35;

        // base X,base Y
        this.bx = x * this.wh;
        this.by = y * this.wh;

        // status
        this.hp = 3;
        this.timeF = Date.now();
        this.time = 0;

        // move
        this.moveL = false;
        this.moveR = false;

        // speed
        this.speed = 5;

        // rotate
        this.rotate = 0;

        // jumping
        this.jumping = false;
        this.yDir = 0;
        this.db_jump = null;

        // item array
        this.grounds = [];
        this.xps = [];
        this.star = [];

        // reset
        this.reset();
    }

    reset() {
        // reset X,Y
        this.x = this.bx;
        this.y = this.by;
    }

    getTime() {
        let now = Date.now() - this.timeF;

        this.time = now;
    }

    isColl(obj) {
        let inL = this.x >= obj.x && this.x <= obj.mx;
        let inR = this.x + 25 >= obj.x && this.x + 25 <= obj.mx;
        let inT = this.y >= obj.y && this.y <= obj.my;
        let inB = this.y + 25 >= obj.y && this.y + 25 <= obj.my;
        let coll = (inL || inR) && (inT || inB);
        let st = coll && this.y + 25 == obj.y;

        return {
            inL,
            inR,
            inT,
            inB,
            coll,
            st,
        };
    }

    moveAni() {
        this.grounds.forEach((obj) => {
            if (obj.type == 4) {
                obj.move4();
            } else if (obj.type == 5) {
                obj.move5();
            }
        });
    }

    move() {
        this.moveAni();
        let defX = this.x;
        if (this.moveL) this.x -= this.speed;
        if (this.moveR) this.x += this.speed;

        if (this.x <= 0 || this.x >= 1370) {
            this.x = defX;
        }

        if (this.y <= 0) {
            this.y = 0;
        }

        this.grounds.forEach((obj) => {
            let { inL, inR, inT, inB, coll, st } = this.isColl(obj);

            obj.player = null;

            if (coll) {
                if (obj.type == 4 || obj.type == 5) {
                    if (inT && (inL || inR)) {
                        if (this.game.model == "demo") {
                            this.reset();
                            return false;
                        }

                        if (--this.hp <= 0) {
                            this.game.gamefinish("lose");
                        } else {
                            this.reset();
                        }
                        return false;
                    }

                    if (inB || st) {
                        obj.player = this;
                    }
                }

                if (!st) {
                    this.x = defX;
                }
            }
        });

        let xp = false;
        this.rotate = 0;

        this.xps.forEach((obj) => {
            let { inL, inR, inT, inB, coll, st } = this.isColl(obj);

            if (coll) {
                if (obj.type == 7 || obj.type == 8) {
                    let type7 =
                        inT && inB && inL && this.moveL && obj.type == 7;
                    let type8 =
                        inT && inB && inR && this.moveR && obj.type == 8;

                    if (type7 || type8) {
                        this.x = defX;
                    } else {
                        if (obj.type == 7) {
                            this.rotate = -Math.PI / 4;
                            if (this.moveL) this.y += this.speed;
                            if (this.moveR) this.y -= this.speed;
                        } else if (obj.type == 8) {
                            this.rotate = Math.PI / 4;
                            if (this.moveL) this.y -= this.speed;
                            if (this.moveR) this.y += this.speed;
                        }
                        xp = true;
                    }
                }
            }
        });

        if (this.jumping) {
            this.yDir = Math.min(this.yDir + 1, 15);
            this.y += this.yDir;
        }

        this.jumping = !xp;

        this.grounds.forEach((obj) => {
            let { inL, inR, inT, inB, coll, st } = this.isColl(obj);

            if (coll) {
                if (inB || st) {
                    if (obj.type == 3) {
                        this.db_jump = obj;
                    } else {
                        this.db_jump = false;
                    }

                    this.y = obj.y - 25;
                    this.yDir = 0;
                    this.jumping = false;
                } else if (inT) {
                    this.y = obj.my + 1;
                    this.yDir = 0;
                    this.jumping = false;
                }
            }
        });

        this.star.forEach((obj, index) => {
            let { inL, inR, inT, inB, coll, st } = this.isColl(obj);

            if (coll) {
                this.star.splice(index, 1);
            }
        });

        if (this.star.length <= 0) {
            this.game.gamefinish("win");
        }
    }
}
