import Object from "../object.class.js";
import Game from "../game.class.js";
import { questions } from "../utils/question.js";

export default class Coin extends Object {
  name = "coin";
  height = 90;
  width = 90;

  isCollected = false;
  hasHitbox = true;

  COIN_ANIMATION = {
    frames: 4,
    path: "../assets/items/coin-animated/",
  };

  constructor(x, y) {
    super();
    this.game = new Game();
    this.x = x;
    this.y = y;
    this.loadImage("../assets/items/coin.png");
  }

  collect() {
    if (this.isCollected) return;

    const question = questions[Math.floor(Math.random() * questions.length)];

    showQuestionPopup(question, (isCorrect) => {
      if (isCorrect) {
        this.isCollected = true;
        this.game.ui.addCoin();
        this.remove();
        this.game.sounds.playSound(
          "../assets/sounds/coin-collected.mp3",
          false,
          0.3
        );
      } else {
        this.game.sounds.playSound("../assets/sounds/wrong.mp3", false, 0.3);
      }
    });
  }

  remove() {
    this.game.world.level.coins.splice(
      this.game.world.level.coins.indexOf(this),
      1
    );
  }
}
