class app {
    constructor() {
        // wh and x,y;
        this.wh = 35;
        this.x = 40;
        this.y = 20;

        // model  *edit *demo *game
        this.model = "edit";
        this.map = [];
        this.level = 1;

        // tools
        this.tool = null;
        this.temp = [];

        // mouse X,Y
        this.mouse = { x: 0, y: 0 };

        // pause stopTime
        this.pause = false;

        // Character
        this.player = null;

        // rankData
        this.playerData = [{}, {}, {}, {}];
        this.rankData = [[], [], [], []];

        // event
        this.initEvent();
        // setImg
        this.initImg();
        this.initMap();
        this.initCanvas();
        this.draw();
    }

    reset() {
        this.model = "edit";
        this.temp = [];
        this.level = 1;
        this.playerData = [{}, {}, {}, {}];
        this.player = null;

        this.pause = false;
        $(".pause").removeClass("check");

        this.tool = null;
        $(".tool_box .lock").removeClass("lock");
    }

    // event
    initEvent() {
        $(".homePage").fadeIn(1000);

        $(".home_btn .edit").click(() => {
            $(".homePage").fadeOut(400);
            $(".editPage").fadeIn(400);
            $(".canvas").addClass("show");
        });

        $(".edit_btn .home").click(() => {
            if (confirm("Map changes are not saved. Do you want to return?")) {
                this.reset();

                $(".editPage").fadeOut(400);
                $(".canvas").removeClass("show");
                $(".homePage").fadeIn(400);
            }
        });

        $(".home_btn .load").click(() => {
            let input = document.createElement("input");
            input.type = "file";
            input.click();
            input.onchange = (e) => {
                let reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                reader.onloadend = (res) => {
                    this.map = JSON.parse(res.target.result);

                    for (let i = 0; i <= 3; i++) {
                        let img = this.drawMap(i);
                        $(".prevPage .prev_image img:eq(" + (i - 1) + ")").attr(
                            "src",
                            img,
                        );
                        $(".level_box .level:eq(" + (i - 1) + ")").addClass(
                            "finish",
                        );
                    }

                    this.playerData = [{}, {}, {}, {}];
                    this.rankData = [[], [], [], []];

                    $(".homePage").fadeOut(400);
                    $(".prevPage").fadeIn(400);
                    $(".cont").fadeIn(400);
                };
            };
        });

        $(".edit_btn .load").click(() => {
            if (
                confirm("Map changes are not saved. Do you want to Continue?")
            ) {
                let input = document.createElement("input");
                input.type = "file";
                input.click();
                input.onchange = (e) => {
                    let reader = new FileReader();
                    reader.readAsText(e.target.files[0]);
                    reader.onloadend = (res) => {
                        this.map = JSON.parse(res.target.result);
                        this.tool = null;
                        $(".tool_box .lock").removeClass("lock");

                        for (let i = 0; i <= 3; i++) {
                            let img = this.drawMap(i);
                            $(
                                ".prevPage .prev_image img:eq(" + (i - 1) + ")",
                            ).attr("src", img);
                            $(".level_box .level:eq(" + (i - 1) + ")").addClass(
                                "finish",
                            );
                        }

                        this.playerData = [{}, {}, {}, {}];
                        this.rankData = [[], [], [], []];

                        $(".cont").fadeIn(400);
                    };
                };
            }
        });

        $(".edit_btn .export").click(() => {
            let data = JSON.stringify(this.map);
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(new Blob([data]));
            a.download = "map.json";
            a.click();
        });

        $(".cont").click(() => {
            $(".homePage").fadeOut(400);
            $(".prevPage").fadeIn(400);
        });

        $(".level_box .level").click((e) => {
            this.level = $(e.target).index() + 1;
            $(".level_box .check").removeClass("check");
            $(e.target).addClass("check");
        });

        $(".home_btn .inst").click(() => {
            $(".homePage").fadeOut(400);
            $(".instPage").fadeIn(400);
        });

        $(".inst_btn .home").click(() => {
            this.reset();

            $(".instPage").fadeOut(400);
            $(".homePage").fadeIn(400);
        });

        $(".tool_box img").click((e) => {
            this.tool = $(e.target).index() + 1;
            $(".tool_box .lock").removeClass("lock");
            $(e.target).addClass("lock");
        });

        $(".prev_btn .home").click(() => {
            this.reset();

            $(".prevPage").fadeOut(400);
            $(".homePage").fadeIn(400);
        });

        $(".prev_btn .edit").click(() => {
            $(".prevPage").fadeOut(400);
            $(".editPage").fadeIn(400);
            $(".canvas").addClass("show");
        });

        $(".demo").click(() => {
            if (this.model == "edit") {
                this.model = "demo";
                this.createPlayer();
                $(".canvas").addClass("show");

                $(".demo").html("Return to Editor");
                $(".level_box,.tool_box,.edit_btn").fadeOut(400);
            } else if (this.model == "demo") {
                this.model = "edit";
                this.player = null;

                $(".demo").html("Play Demo");
                $(".level_box,.tool_box,.edit_btn").fadeIn(400);
            }

            this.tool = null;
            $(".tool_box .lock").removeClass("lock");
        });

        $(".prev_btn .rank").click(() => {
            $(".prevPage").fadeOut(400);
            $(".rankPage").fadeIn(400);
            $(".rank_level_box .level:eq(0)").click();
        });

        $(".rankPage .rank_level_box .level").click((e) => {
            let level = $(e.target).index() + 1;
            $(".rank_level_box .level").removeClass("check");
            $(e.target).addClass("check");

            let data = this.rankData[level].sort((a, b) => {
                if (a.time != b.time) {
                    return a.time - b.time;
                } else {
                    return b.hp - a.hp;
                }
            });

            $(".rank_body").html("");
            data.forEach((obj, index) => {
                let m = Math.floor(obj.time / 60000)
                    .toString()
                    .padStart(2, 0);
                let s = Math.floor((obj.time / 1000) % 60)
                    .toString()
                    .padStart(2, 0);
                let ss = Math.floor(obj.time % 1000)
                    .toString()
                    .padStart(3, 0);
                $(".rank_body").append(
                    `<tr><td>${index + 1}</td><td>${obj.name}</td><td>${obj.hp}</td><td>${m + ":" + s + "." + ss}</td></tr>`,
                );
            });
        });

        $(".rank_btn .retry").click(() => {
            this.reset();
            this.model = "game";
            this.createPlayer();
            $(".canvas").addClass("show");

            $(".rankPage").fadeOut(400);
            $(".gamePage").fadeIn(400);
        });

        $(".rank_btn .home").click(() => {
            this.reset();

            $(".rankPage").fadeOut(400);
            $(".homePage").fadeIn(400);
        });

        $(".prev_btn .star").click(() => {
            this.model = "game";
            this.createPlayer();
            $(".canvas").addClass("show");

            $(".prevPage").fadeOut(400);
            $(".gamePage").fadeIn(400);
        });

        $(".game_btn .home").click(() => {
            if (confirm("Do you want to return?")) {
                this.reset();
                $(".canvas").removeClass("show");

                $(".gamePage").fadeOut(400);
                $(".homePage").fadeIn(400);
            }
        });

        $(".game_btn .pause").click(() => {
            this.pause = !this.pause;

            if (this.pause) {
                $(".pause").addClass("check");
            } else {
                $(".pause").removeClass("check");
            }
        });

        $(".msg_next .next").click(() => {
            this.level++;
            this.createPlayer();
            this.pause = false;
            $(".msg_next").fadeOut(200);
            $(".msg_next .next").addClass("not");
            $(".canvas").removeClass("show");
        });

        $(".msg_win .next").click(() => {
            for (let i = 0; i <= 3; i++) {
                this.playerData[i].name = $(".name_input").val();
                this.rankData[i].push(this.playerData[i]);
            }

            $(".msg_win,.gamePage").fadeOut(200);
            $(".canvas").removeClass("show");
            $(".msg_win .next").addClass("not");

            $(".rankPage").fadeIn(400);
            $(".rank_level_box .level:eq(0)").click();
        });

        $(".msg_lose .next").click(() => {
            this.level = 1;
            this.createPlayer();
            this.pause = false;

            this.playerData = [{}, {}, {}, {}];
            $(".msg_lose").fadeOut(200);
            $(".msg_lose .next").addClass("not");
            $(".canvas").removeClass("show");
        });

        document.onkeydown = (e) => {
            if (e.key == "r" || e.key == "R") {
                if (this.tool == 4 || this.tool == 5) {
                    this.tool = this.tool == 4 ? 5 : 4;
                }
            }

            if (this.player) {
                if (e.key == "a" || e.key == "A") {
                    this.player.moveL = true;
                }

                if (e.key == "d" || e.key == "D") {
                    this.player.moveR = true;
                }

                if (e.key == "w" || e.key == "W") {
                    if (!this.player.jumping) {
                        if (this.player.db_jump) {
                            this.player.yDir = -20;
                            this.player.db_jump.twoAni();
                        } else {
                            this.player.yDir = -15;
                        }

                        this.player.jumping = true;
                    }
                }
            }
        };

        document.onkeyup = (e) => {
            if (this.player) {
                if (e.key == "a" || e.key == "A") {
                    this.player.moveL = false;
                }

                if (e.key == "d" || e.key == "D") {
                    this.player.moveR = false;
                }
            }
        };
    }

    initImg() {
        this.imgs = [];
        let image = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "4",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
        ];
        image.forEach((obj) => {
            let img = new Image();
            img.crossOrigin = "anonymous";
            img.src = "https://07-module-d.vercel.app/img/" + obj + ".png";
            this.imgs.push(img);
        });

        this.r_imgs = [];
        for (let i = 0; i < 16; i++) {
            let img = new Image();
            img.crossOrigin = "anonymous";
            let name = i.toString(2).padStart(4, 0);
            img.src =
                "https://07-module-d.vercel.app/img/route_img/" + name + ".png";
            this.r_imgs[name] = img;
        }
    }

    initMap() {
        this.map = [];
        for (let i = 0; i <= 3; i++) {
            this.map[i] = new Array(this.y).fill(null).map(() => {
                return new Array(this.x).fill(0);
            });
            this.map[i][this.y - 1] = new Array(this.x).fill(99);
        }
    }

    RouteImg(x, y, map) {
        let data = [];
        [
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 0],
        ].forEach((obj) => {
            if ([6, 7, 8, -6, 99].includes(map[y + obj[1]]?.[x + obj[0]])) {
                data += "1";
            } else {
                data += "0";
            }
        });
        return data;
    }

    emap(x, y, value = null) {
        if (value != null) {
            this.map[this.level][this.mouse.y + y][this.mouse.x + x] = value;
        } else {
            return this.map[this.level][this.mouse.y + y][this.mouse.x + x];
        }
    }

    findMap(i) {
        let data = [];

        this.map[this.level].forEach((row, y) => {
            row.forEach((value, x) => {
                if (Array.isArray(i)) {
                    if (i.includes(value)) {
                        data.push([x, y, value]);
                    }
                } else {
                    if (i == value) {
                        data.push([x, y, value]);
                    }
                }
            });
        });

        return data;
    }

    mapBreak(x, y, star) {
        let row = this.map[this.level][y];
        if (!row) return false;
        let item = this.map[this.level][y][x];
        if (item == 0) return true;

        this.cc.fillStyle = "rgba(255,0,0,0.8)";

        if (this.tool == 2) {
            if (item != -2) {
                this.cc.fillRect(x * this.wh, y * this.wh, this.wh, this.wh);
                return false;
            }
        } else if (this.tool == 9) {
            if (item > -1 && item != 99) {
                this.cc.fillRect(x * this.wh, y * this.wh, this.wh, this.wh);
                return false;
            }
        } else {
            if ((star && item != 2) || !star) {
                this.cc.fillRect(x * this.wh, y * this.wh, this.wh, this.wh);
                return false;
            }
        }
        return true;
    }

    initCanvas() {
        this.canvas = document.querySelector(".canvas");
        this.cc = this.canvas.getContext("2d");
        this.initCanvasEvent();
    }

    initCanvasEvent() {
        this.canvas.onmousedown = (e) => {
            if (this.tool == 6) {
                this.tempFlag = [this.mouse.x, this.mouse.y];
                this.temp = [this.tempFlag];
            }
        };

        this.canvas.onmousemove = (e) => {
            this.mouse.x = Math.floor(e.offsetX / this.wh);
            this.mouse.y = Math.floor(e.offsetY / this.wh);

            if (this.tool == 6 && this.tempFlag) {
                this.temp = [this.tempFlag];

                if (
                    Math.abs(this.mouse.x - this.tempFlag[0]) >
                    Math.abs(this.mouse.y - this.tempFlag[1])
                ) {
                    let step = this.mouse.x > this.tempFlag[0] ? -1 : 1;
                    for (
                        let i = this.mouse.x;
                        i != this.tempFlag[0];
                        i += step
                    ) {
                        this.temp.push([i, this.tempFlag[1]]);
                    }
                } else {
                    let step = this.mouse.y > this.tempFlag[1] ? -1 : 1;
                    for (
                        let i = this.mouse.y;
                        i != this.tempFlag[1];
                        i += step
                    ) {
                        this.temp.push([this.tempFlag[0], i]);
                    }
                }
            }
        };

        this.canvas.onmouseout = (e) => {
            this.temp = [];
            this.tempFlag = null;
        };

        this.canvas.onmouseup = (e) => {
            if (e.button == "2") {
                this.tool = null;
                $(".tool_box .lock").removeClass("lock");
                return false;
            }

            if (!this.toolKey) return false;

            if (this.tool == 6) {
                this.temp.forEach((obj) => {
                    if (this.mapBreak(obj[0], obj[1])) {
                        this.map[this.level][obj[1]][obj[0]] = 6;
                    }
                });
            }

            if ([1, 2, 3].includes(this.tool)) {
                this.emap(0, 0, this.tool);
            }

            if ([4].includes(this.tool)) {
                if (this.emap(0, -2) != 2) this.emap(0, -2, -2);
                this.emap(0, -1, -1);
                this.emap(0, 0, this.tool);
                this.emap(0, 1, -1);
            }

            if ([5].includes(this.tool)) {
                if (this.emap(-1, -1) != 2) this.emap(-1, -1, -2);
                if (this.emap(0, -1) != 2) this.emap(0, -1, -2);
                if (this.emap(1, -1) != 2) this.emap(1, -1, -2);
                this.emap(-1, 0, -1);
                this.emap(0, 0, this.tool);
                this.emap(1, 0, -1);
            }

            if ([7].includes(this.tool)) {
                if (this.emap(-1, 0) != 2) this.emap(-1, 0, -2);
                this.emap(0, 0, this.tool);
            }

            if ([8].includes(this.tool)) {
                if (this.emap(1, 0) != 2) this.emap(1, 0, -2);
                this.emap(0, 0, this.tool);
            }

            if (this.tool == 9) {
                let nm = this.emap(0, 0);

                if ([1, 2, 3, 6].includes(nm)) {
                    this.emap(0, 0, 0);
                }

                if ([4].includes(nm)) {
                    if (this.emap(0, -2) != 2) this.emap(0, -2, 0);
                    this.emap(0, -1, 0);
                    this.emap(0, 0, 0);
                    this.emap(0, 1, 0);
                }

                if ([5].includes(nm)) {
                    if (this.emap(-1, -1) != 2) this.emap(-1, -1, 0);
                    if (this.emap(0, -1) != 2) this.emap(0, -1, 0);
                    if (this.emap(1, -1) != 2) this.emap(1, -1, 0);
                    this.emap(-1, 0, 0);
                    this.emap(0, 0, 0);
                    this.emap(1, 0, 0);
                }

                if ([7].includes(nm)) {
                    if (this.emap(-1, 0) != 2) this.emap(-1, 0, 0);
                    this.emap(0, 0, 0);
                }

                if ([8].includes(nm)) {
                    if (this.emap(1, 0) != 2) this.emap(1, 0, 0);
                    this.emap(0, 0, 0);
                }
            }

            this.temp = [];
            this.tempFlag = null;
            $(".level_box .level:eq(" + (this.level - 1) + ")").removeClass(
                "finish",
            );
        };
    }

    drawMap(rt) {
        if (this.pause) return false;
        if (this.player) this.player.move();
        this.toolKey = true;
        this.cc.clearRect(0, 0, 1400, 700);
        let map = JSON.parse(JSON.stringify(this.map[rt || this.level]));

        this.temp.forEach((obj) => {
            if (map[obj[1]][obj[0]] == 0) {
                map[obj[1]][obj[0]] = -6;
            }
        });

        map.forEach((row, y) => {
            row.forEach((value, x) => {
                this.cc.drawImage(
                    this.imgs[0],
                    x * this.wh,
                    y * this.wh,
                    this.wh,
                    this.wh,
                );

                if ([1, 2, 3, 4, 5].includes(value) && this.model == "edit") {
                    this.cc.drawImage(
                        this.imgs[value],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                if ([7, 8].includes(value)) {
                    this.cc.drawImage(
                        this.imgs[value],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                if ([6, 99].includes(value)) {
                    this.cc.drawImage(
                        this.r_imgs[this.RouteImg(x, y, map)],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                this.cc.globalAlpha = 0.5;

                if ([-6].includes(value) && this.model == "edit") {
                    this.cc.drawImage(
                        this.r_imgs[this.RouteImg(x, y, map)],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                if ([-1].includes(value) && this.model == "edit") {
                    this.cc.drawImage(
                        this.imgs[4],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                if ([-2].includes(value) && this.model == "edit") {
                    this.cc.drawImage(
                        this.imgs[10],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                }

                this.cc.globalAlpha = 1;
            });
        });

        if (this.player) {
            this.cc.save();
            this.cc.translate(this.player.x + 12.5, this.player.y + 12.5);
            if (this.player.rotate) this.cc.rotate(this.player.rotate);
            if (this.player.moveL) this.cc.scale(-1, 1);

            if (this.player.jumping) {
                this.cc.drawImage(this.imgs[13], -12.5, -12.5, 25, 25);
            } else if (this.player.moveL || this.player.moveR) {
                let frame = Math.floor(Date.now() / 200) % 2;

                if (frame == 0) {
                    this.cc.drawImage(this.imgs[12], -12.5, -12.5, 25, 25);
                } else {
                    this.cc.drawImage(this.imgs[11], -12.5, -12.5, 25, 25);
                }
            } else {
                this.cc.drawImage(this.imgs[10], -12.5, -12.5, 25, 25);
            }

            this.cc.restore();

            this.player.grounds.forEach((obj) => {
                if ([3, 4, 5].includes(obj.type)) {
                    this.cc.drawImage(
                        this.imgs[obj.type],
                        obj.x,
                        obj.y,
                        obj.width,
                        obj.height,
                    );
                }
            });

            this.player.star.forEach((obj) => {
                if ([2].includes(obj.type)) {
                    this.cc.drawImage(
                        this.imgs[obj.type],
                        obj.x,
                        obj.y,
                        obj.width,
                        obj.height,
                    );
                }
            });
        }

        this.cc.globalAlpha = 0.5;

        if ([1, 2].includes(this.tool)) {
            this.cc.drawImage(
                this.imgs[this.tool],
                this.mouse.x * this.wh,
                this.mouse.y * this.wh,
                this.wh,
                this.wh,
            );

            this.toolKey = this.mapBreak(this.mouse.x, this.mouse.y);
            if (
                (this.toolKey &&
                    this.findMap(1).length >= 1 &&
                    this.tool == 1) ||
                (this.findMap(2).length >= 3 && this.tool == 2)
            ) {
                this.cc.fillRect(
                    this.mouse.x * this.wh,
                    this.mouse.y * this.wh,
                    this.wh,
                    this.wh,
                );
                this.toolKey = false;
            }
        }

        if ([3, 4, 5, 7, 8].includes(this.tool)) {
            let data = {
                3: [[0, 0, this.tool, false]],
                4: [
                    [0, -2, 10, true],
                    [0, -1, 4, false],
                    [0, 0, this.tool, false],
                    [0, 1, 4, false],
                ],
                5: [
                    [-1, -1, 10, true],
                    [0, -1, 10, true],
                    [1, -1, 10, true],
                    [-1, 0, 4, false],
                    [0, 0, this.tool, false],
                    [1, 0, 4, false],
                ],

                7: [
                    [-1, 0, 10, true],
                    [0, 0, this.tool, false],
                ],
                8: [
                    [1, 0, 10, true],
                    [0, 0, this.tool, false],
                ],
            };

            data[this.tool].forEach((obj) => {
                let x = this.mouse.x + obj[0];
                let y = this.mouse.y + obj[1];

                if (this.mapBreak(x, y, obj[3])) {
                    this.cc.drawImage(
                        this.imgs[obj[2]],
                        x * this.wh,
                        y * this.wh,
                        this.wh,
                        this.wh,
                    );
                } else {
                    this.toolKey = false;
                }
            });
        }

        if (this.tool == 6) {
            this.cc.drawImage(
                this.imgs[this.tool],
                this.mouse.x * this.wh,
                this.mouse.y * this.wh,
                this.wh,
                this.wh,
            );

            this.temp.forEach((obj) => {
                this.mapBreak(obj[0], obj[1]);
            });
        }

        if (this.tool == 9) {
            this.cc.drawImage(
                this.imgs[this.tool],
                this.mouse.x * this.wh,
                this.mouse.y * this.wh,
                this.wh,
                this.wh,
            );
            this.mapBreak(this.mouse.x, this.mouse.y);
        }

        this.cc.globalAlpha = 1;

        this.checkGame();

        if (rt) {
            try {
                return this.canvas.toDataURL("image/png");
            } catch (e) {
                console.warn("Cannot export canvas due to CORS: ", e);
                return "";
            }
        }
    }

    createPlayer() {
        let bn = this.findMap(1)[0];

        this.player = new player(bn[0], bn[1], this);

        this.player.grounds = [];
        this.findMap([3, 4, 5, 6, 99]).forEach((obj) => {
            this.player.grounds.push(new item(obj[0], obj[1], obj[2], this.wh));
        });

        this.player.xps = [];
        this.findMap([7, 8]).forEach((obj) => {
            this.player.xps.push(new item(obj[0], obj[1], obj[2], this.wh));
        });

        this.player.star = [];
        this.findMap([2]).forEach((obj) => {
            this.player.star.push(new item(obj[0], obj[1], obj[2], this.wh));
        });
    }

    gamefinish(value) {
        if (value == "win" && this.model == "demo") {
            $(".level_box .level:eq(" + (this.level - 1) + ")").addClass(
                "finish",
            );
            $(".demo").click();
        }

        if (this.model == "game") {
            if (value == "win") {
                this.playerData[this.level] = {};
                this.playerData[this.level].hp = this.player.hp;
                this.playerData[this.level].time = this.player.time;

                this.player = null;

                if (this.level >= 3) {
                    $(".msg_win").fadeIn(200);
                    $(".msg_win .next").removeClass("not");
                } else {
                    $(".msg_next").fadeIn(200);
                    $(".msg_next .next").removeClass("not");
                }
            } else if (value == "lose") {
                $(".msg_lose").fadeIn(200);
                $(".msg_lose .next").removeClass("not");
            }

            this.pause = true;
        }
    }

    checkGame() {
        if (this.findMap(1).length >= 1 && this.findMap(2).length >= 1) {
            $(".demo").removeClass("not");
        } else {
            $(".demo").addClass("not");
        }

        if ($(".level_box .finish").length >= 3) {
            $(".export").removeClass("not");
        } else {
            $(".export").addClass("not");
        }

        if (this.model == "game" && this.player) {
            this.player.getTime();
            $(".status_box .level").html(this.level);
            $(".status_box .hp").html(this.player.hp);

            let m = Math.floor(this.player.time / 60000)
                .toString()
                .padStart(2, 0);
            let s = Math.floor((this.player.time / 1000) % 60)
                .toString()
                .padStart(2, 0);
            let ss = Math.floor(this.player.time % 1000)
                .toString()
                .padStart(3, 0);
            $(".status_box .time").html(m + ":" + s + "." + ss);
        }
    }

    draw() {
        this.drawMap();

        requestAnimationFrame(() => {
            this.draw();
        });
    }
}
