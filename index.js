const chalk = require("chalk");
const prompt = require("prompt-sync")({ sigint: true });
let readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

console.clear();

// playAgain();

function checkCashRegister(price, cash) {
  console.clear();
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

  let changeDue = parseFloat(cash.toFixed(2) - price.toFixed(2));
  if (changeDue >= 0) {
    let result = [];

    console.log(
      `${chalk.bgWhite.black.underline.bold(
        "Change Due =>"
      )} ${chalk.green.bold.bgGreen("€")}${chalk.green.bold.bgGreen(
        changeDue.toFixed(2)
      )}`
    );

    console.log(`-----------------------------------------`);

    let output = "";
    for (let i = 0; i < currency.length; i++) {
      currency[i][1] = parseFloat(currency[i][1]);

      let number = parseFloat(
        Math.floor(changeDue.toFixed(2) / currency[i][1])
      );
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
          "(" +
          "€" +
          currency[j][1] +
          ")" +
          "\n";
      }
    }

    console.log(output);
    rl.close();
    playAgainFunc();
  } else {
    console.log(
      `${chalk.red("You need more money")}, go home and bring €${Math.abs(
        changeDue
      )} more`
    );
    console.log(`-----------------------------------------------`);
    // console.clear();
    playAgainFunc();
  }
}

function playAgainFunc() {
  let playAgain = prompt(
    chalk.bgCyan.blackBright.bold(`${"Do you have more items to buy: y/n "}`)
  ); // y or n

  if (playAgain === "y") {
    console.clear();

    let input = prompt(
      chalk.green.bold("Please Enter Amount and Total Cash: ")
    );
    console.log(`--------------------------------------------`);

    const answerSplit = input.split(",");
    console.clear();

    checkCashRegister(+answerSplit[0], +answerSplit[1]);
  } else if (playAgain === "n") {
    console.clear();
    console.log(`--------------------------------------------`);
    console.log(chalk.bgCyan.bold("Thankyou for your visit "));
    console.log(`--------------------------------------------`);
    rl.close();
  }
}

// checkCashRegister(12, 50);

function inputFromUser() {
  rl.setPrompt(
    "\x1b[1mPlease Enter \x1b[36mBill Amount \x1b[33mand \x1b[32mTotal Cash\x1b[0m \n"
  );

  rl.prompt();
  rl.on("line", function (input1) {
    const answerSplit = input1.split(",");

    if (checkCashRegister(+answerSplit[0], +answerSplit[1])) {
      rl.close();
    }
    rl.close();
  });
}

inputFromUser();
