"use strict";
// 食物
class Food {
    constructor() {
        this.element = document.getElementById("food");
    }
    // 获取食物坐标x
    get X() {
        return this.element.offsetLeft;
    }
    // 获取食物坐标y
    get Y() {
        return this.element.offsetTop;
    }
    // 随机位置生成食物
    random() {
        this.element.style.top = Math.floor(Math.random() * 29) * 10 + 'px';
        this.element.style.left = Math.floor(Math.random() * 29) * 10 + 'px';
    }
}
// 计分板
class Information {
    constructor() {
        this.checkpointVal = 1; // 等级
        this.integralVal = 1; // 积分
        this.checkpoint = document.getElementById('checkpoint');
        this.integral = document.getElementById('integral');
    }
    // 积分加一
    integralPP() {
        this.integral.innerHTML = (this.integralVal += 1).toString();
        this.checkpointPP();
    }
    // 等级加一
    checkpointPP() {
        if (this.checkpointVal >= 10)
            return false;
        if (this.integralVal % 10 == 0) {
            this.checkpoint.innerHTML = (this.checkpointVal += 1).toString();
        }
    }
}
// 蛇
class Snake {
    constructor() {
        this.element = document.getElementById('snake');
        this.herd = document.getElementById('herd');
        this.bodys = this.element.getElementsByTagName('div');
    }
    // 获取蛇头坐标x
    get X() {
        return this.herd.offsetLeft;
    }
    // 获取蛇头坐标x
    get Y() {
        return this.herd.offsetTop;
    }
    // 设置蛇坐标x
    set X(value) {
        if (this.X === value)
            return; //未发生变化
        if (value < 0 || value > 280) { //撞墙检测
            throw new Error("蛇撞墙了！！");
        }
        this.moveBody();
        this.herd.style.left = value + 'px';
    }
    // 设置蛇坐标y
    set Y(value) {
        if (this.Y === value)
            return; //未发生变化
        if (value < 0 || value > 280) { //撞墙检测
            throw new Error("蛇撞墙了！！");
        }
        this.moveBody();
        this.herd.style.top = value + 'px';
    }
    // 增加身体
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }
    // 身体跟随移动
    moveBody() {
        for (let i = this.bodys.length - 1; i > 0; i--) {
            let x = this.bodys[i - 1].offsetLeft;
            let y = this.bodys[i - 1].offsetTop;
            this.bodys[i].style.left = x + 'px';
            this.bodys[i].style.top = y + 'px';
        }
    }
}
// 游戏控制器
class GameControl {
    constructor() {
        this.direction = 'ArrowRight';
        this.isLive = true;
        this.snake = new Snake();
        this.food = new Food();
        this.Information = new Information();
    }
    // 初始化
    init() {
        // 绑定键盘事件
        document.addEventListener("keydown", this.keyDown.bind(this));
        this.run();
    }
    // 键盘事件处理
    keyDown(e) {
        this.direction = e.key;
    }
    // 开始
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10;
                break;
            case 'ArrowDown':
                Y += 10;
                break;
            case 'ArrowRight':
                X += 10;
                break;
            case 'ArrowLeft':
                X -= 10;
                break;
            default:
                break;
        }
        // 吃到食物
        if (X === this.food.X && Y === this.food.Y) {
            this.food.random();
            this.Information.integralPP();
            this.snake.addBody();
        }
        // 撞墙处理
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }
        catch (e) {
            this.isLive = false;
            alert(e.message);
        }
        // 蛇始终移动
        this.isLive && setTimeout(this.run.bind(this), 200 - (this.Information.checkpointVal - 1) * 30);
    }
}
const GC = new GameControl();
const action = () => {
    GC.init();
};
const restart = () => {
    window.location.replace(location.href);
};
