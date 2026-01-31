class item {
    constructor(x, y, type, wh = 35) {
        this.wh = wh;
        // base X,Y
        this.x = x * this.wh;
        this.y = y * this.wh;

        // max X,Y
        this.mx = this.x + this.wh;
        this.my = this.y + this.wh;

        // item Type
        this.type = type;

        // item wh
        this.width = this.wh;
        this.height = this.wh;

        // item step
        this.step = 1;

        // player
        this.player = null;

        // jumping
        if (this.type == 3) {
            this.min = this.y - this.wh;
            this.max = this.y + Math.floor(this.wh / 2);
            this.step = Math.max(6, Math.floor(this.wh / 3));
        }

        // moveY
        if (this.type == 4) {
            this.min = this.y - this.wh;
            this.max = this.y + this.wh;
            this.move4();
        }

        // moveX
        if (this.type == 5) {
            this.min = this.x - this.wh;
            this.max = this.x + this.wh;
            this.move5();
        }
    }

    move4() {
        if (this.player) {
            this.player.y += this.step;
        }

        this.y += this.step;
        if (this.y <= this.min || this.y >= this.max) {
            this.step = -this.step;
        }
        this.my = this.y + this.wh;
    }

    move5() {
        if (this.player) {
            this.player.x += this.step;
        }

        this.x += this.step;
        if (this.x <= this.min || this.x >= this.max) {
            this.step = -this.step;
        }
        this.mx = this.x + this.wh;
    }

    twoAni() {
        setTimeout(() => {
            this.y -= this.step;
            this.height += this.step;

            if (this.y <= this.min) {
                this.step = -this.step;
            }

            if (this.y >= this.max) {
                this.step = -this.step;
                this.y = this.max - Math.floor(this.wh / 2);
                this.height = this.wh;
            } else {
                this.twoAni();
            }
        }, 30);
    }
}
