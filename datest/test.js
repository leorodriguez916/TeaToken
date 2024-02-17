const fs = require("fs");

var linesArr = fs
  .readFileSync("coding_qual_input.txt", "utf8")
  .toString()
  .split("\n");

function decode(messagefile) {
  var linesArr = fs.readFileSync(messagefile, "utf8").split("\n");
  let iterator = 1;
  let message = "";

  for (let i = 1; i < linesArr.length; i += iterator) {
    let wordNumber = i.toString();
    for (let j = 0; j < linesArr.length; j++) {
      if (linesArr[j].split(" ")[0] === wordNumber) {
        message += linesArr[j].split(" ")[1] + " ";
        break;
      }
    }
    iterator++;
  }
  return message;
}

console.log(decode("coding_qual_input.txt"));
