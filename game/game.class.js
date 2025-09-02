import World from "./world.class.js";
import Drawer from "./utils/drawer.class.js";
import Events from "./utils/events.class.js";
import UI from "./ui.class.js";
import Sounds from "./utils/sounds.class.js";

export default class Game {
  static instance;

  constructor(canvas) {
    /**Singleton */
    if (Game.instance) {
      return Game.instance;
    }
    Game.instance = this;

    /**Setup everything */
    this.loadAssets();

    this.canvas = canvas;
    this.drawer = new Drawer();
    this.events = new Events();
    this.world = new World();
    this.ui = new UI();

    /** Trạng thái pause */
    this.isPaused = false;

    this.update();
  }

  /** Dừng game */
  pause() {
    this.isPaused = true;
    if (window.gsap && window.gsap.globalTimeline) {
      window.gsap.globalTimeline.pause();
    }
  }

  /** Tiếp tục game */
  resume() {
    this.isPaused = false;
    if (window.gsap && window.gsap.globalTimeline) {
      window.gsap.globalTimeline.resume();
    }
  }

  win() {
    this.world.level.character.freeze = true;
    this.sounds.playSound("../assets/sounds/win.mp3", false, 0.4, 2000);
    this.ui.showWinContainer();
    clearInterval(this.world.level.boss.attackInterval);
  }

  lose() {
    this.world.level.character.freeze = true;
    gsap.globalTimeline.clear();
    clearInterval(this.world.level.boss.attackInterval);
    this.ui.showDeadContainer();
    this.sounds.playSound("../assets/sounds/dead-sound.mp3", false, 0.4);
    this.sounds.fadeOutAllMusic();
  }

  restart() {
    this.events.callbacks.base = {};
    this.world = new World();
    this.ui = new UI();
    this.sounds.playMainMusic();
    this.world.level.character.freeze = false;
  }

  update() {
    if (this.world && !this.isPaused) {
      this.world.update();
    }

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  loadAssets() {
    this.bubble = new Image();
    this.bubble.src = "../assets/sharkie/attack/bubble-tap/bubble.png";

    this.poisonBubble = new Image();
    this.poisonBubble.src =
      "../assets/sharkie/attack/bubble-tap/poison-bubble.png";

    this.barrier0 = new Image();
    this.barrier1 = new Image();
    this.barrier2 = new Image();
    this.barrier3 = new Image();
    this.barrier0.src = "../assets/barriers/0.png";
    this.barrier1.src = "../assets/barriers/1.png";
    this.barrier2.src = "../assets/barriers/2.png";
    this.barrier3.src = "../assets/barriers/3.png";
  }
}
