class TextDialogue {
  constructor(messages = [], hide = true) {
    this.messages = messages;
    this.messageIndex = 0;

    this.parent = document.querySelector("body");
    this.child = document.querySelector("#light");

    this.messageContainer = document.createElement("div");
    this.choicesElement = document.createElement("ul");

    this.choicesElement.classList.add("choicesElement");
    this.messageContainer.classList.add("TextDialogue");

    if (hide) {
      this.hide();
    }

    this.init();
  }

  get currentMessage() {
    return this.messages[this.messageIndex];
  }

  updateMessage() {
    this.choicesElement.innerHTML = "";
    if (this.currentMessage) {
      console.log(this.currentMessage);
      this.currentMessage.choices.forEach((choice) => {
        const li = document.createElement("li");
        li.innerText = choice.text;
        li.addEventListener("click", choice.callback);
        this.choicesElement.appendChild(li);
      });

      this.messageContainer.innerHTML = `<div class="TextContent"><p>${this.currentMessage.text}</p></div>`;

      this.messageContainer.appendChild(this.choicesElement);
    } else {
      this.hide();
    }
  }

  hide() {
    this.messageContainer.classList.add("hide");
  }

  show() {
    this.messageContainer.classList.remove("hide");
  }

  next() {
    this.messages.shift();
    this.updateMessage();
  }

  init() {
    this.updateMessage();

    this.parent.insertBefore(this.messageContainer, this.child);
  }
}

export default TextDialogue;
