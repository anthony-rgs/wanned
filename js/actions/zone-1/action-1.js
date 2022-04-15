import Action from "../../classes/Action.js";
import wait from "../../utils/wait.js";

export default (game) => new Action(async (trigger) => {
  game.fabien.stopWalk();

  await wait(1000);

  game.dialogBox.messages = [
    {
      text: 'Question',
      choices: [
        {
          text: 'Answer 1',
          callback: async () => {
            game.dialogBox.next()

            await wait(1000);
            await game.fabien.pullOver();

            await wait(1000);
            game.doorZone1.open();

            game.dialogBox.next()

            trigger();
          },
        },
        {
          text: 'Answer 2',
          callback: async () => {
            game.dialogBox.hide()
            game.fabien.startWalk()
            game.mainCharacter.lives -= 0.5;
          },
        },
      ]
    },
    {
      text: 'You can pass',
    }
  ]
  game.dialogBox.show();
}, false)
