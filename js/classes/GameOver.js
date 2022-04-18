import wait from "../utils/wait.js";

class GameOver {
  constructor() {
    this.isRetry = false;
    this.isQuit = false;

    this.parent = document.querySelector("body");
    this.child = document.querySelector("#wanned");

    console.log("allo");

    this.init();
  }

  async init() {
    await wait(1000);

    this.GameOverScreen = document.createElement("div");
    this.buttonContainer = document.createElement("div");
    this.retryButton = document.createElement("button");
    this.quitButton = document.createElement("button");

    this.GameOverScreen.classList.add("game-over");
    this.buttonContainer.classList.add("button-container");
    this.retryButton.classList.add("retry");
    this.quitButton.classList.add("quit");

    this.GameOverScreen.innerHTML = "<h2>Game Over</h2>";

    this.retryButton.textContent = "Retry";
    this.quitButton.textContent = "Quit";

    this.buttonContainer.appendChild(this.retryButton);
    this.buttonContainer.appendChild(this.quitButton);
    this.GameOverScreen.appendChild(this.buttonContainer);

    this.retryButton.addEventListener("click", () => {
      this.isRetry = true;
      this.GameOverScreen.remove();
    });

    this.quitButton.addEventListener("click", () => {
      this.isQuit = true;
      this.GameOverScreen.remove();
    });

    this.parent.insertBefore(this.GameOverScreen, this.child);
  }
}

export default GameOver;
