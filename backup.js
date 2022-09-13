const prompt = require("prompt-sync")({ sigint: true });
let readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

console.clear();
function changeReturn() {
  const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readLine.question(
    "\x1b[1mPlease Enter \x1b[36mAmount \x1b[33mand \x1b[32mTotal Cash\x1b[0m \n",
    (answer) => {
      const answerSplit = answer.split(",");
      console.clear();

      console.log(checkCashRegister(+answerSplit[0], +answerSplit[1]));
      readLine.close();
      playAgain();
    }
  );
}

changeReturn();

function playAgain() {
  const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  //   console.clear();
  readLine.question("Do you have more items to buy: y/n ", (check) => {
    if (check === "y") {
      console.clear();
      readLine.question(
        "\x1b[1mPlease Enter \x1b[36mAmount \x1b[33mand \x1b[32mTotal Cash\x1b[0m ",
        (answer2) => {
          const answerSplit2 = answer2.split(",");
          console.clear();

          console.log(checkCashRegister(+answerSplit2[0], +answerSplit2[1]));
          changeReturn();
        }
      );
    } else if (check === "n") {
      console.log(`Thankyou for shopping `);
      console.log(`--------------------------------------------`);
      readLine.close();
    }
  });
}

// playAgain();

function checkCashRegister(price, cash) {
  let currency = [
    ["five hundred euros notes", 500],
    ["two hundred euros notes", 200],
    ["hundred euros notes", 100],
    ["fifty euros notes", 50],
    ["twenty euros notes", 20],
    ["ten euros notes", 10],
    ["five euros notes", 5],
    ["two euros coin", 2],
    ["one euro coin", 1],
    ["fifty cents coin", 0.5],
    ["twenty cents coin", 0.2],
    ["ten cents coin", 0.1],
    ["five cents coin", 0.05],
    ["two cents coin", 0.02],
    ["one cent coin", 0.01],
  ];
  let result = [];
  let changeDue = parseFloat(cash.toFixed(2) - price.toFixed(2));
  console.log("Change Due", changeDue.toFixed(2));

  console.log(`-----------------------------------------`);

  let output = "";
  for (let i = 0; i < currency.length; i++) {
    currency[i][1] = parseFloat(currency[i][1]).toFixed(2);

    let number = parseFloat(Math.floor(changeDue.toFixed(2) / currency[i][1]));
    // console.log(number);
    if (number > 0) {
      changeDue -= parseFloat(number * currency[i][1]).toFixed(2);
    }
    result.push(number);
  }

  for (let j = 0; j < result.length; j++) {
    if (result[j] > 0) {
      output +=
        result[j] +
        " " +
        "x" +
        " " +
        currency[j][0] +
        " " +
        currency[j][1] +
        "\n";
    }
  }
  return output;
}

function inputFromUser() {
  rl.setPrompt(
    "\x1b[1mPlease Enter \x1b[36mAmount \x1b[33mand \x1b[32mTotal Cash\x1b[0m \n"
  );
  // console.clear();
  rl.prompt();
  // counter--;
  rl.on("line", function (input) {
    if (
      checkValidNum(input) === true &&
      checkAllNum(input) === true &&
      checkAllUnique(input) === true
    ) {
      // setTimer();
      if (bullsAndCows(input)) {
        //   console.log(`This is the new counter`);

        rl.close();
      }
    } else if (checkValidNum(input) === false) {
      console.log("Please enter 4 digits!");
    } else if (checkAllNum(input) === false) {
      console.log(`All values should be numbers!`);
    } else if (checkAllUnique(input) === false) {
      console.log(`All digits should be unique!`);
    }
  });
}

inputFromUser();
