const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const FULL_NAME = "KOMMULA VENKATA UMA SURYA VARDHA ";
const DOB = "25052004";  
const EMAIL = "suryavardhan.22bce7228@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE7228";


function isNumber(str) {
  return /^-?\d+$/.test(str); 
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function alternatingCaps(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Please provide { data: [ ... ] }",
      });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let concatAlpha = "";

    data.forEach((item) => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(item.toString());
        } else {
          oddNumbers.push(item.toString());
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        concatAlpha += item;
      } else {
        specialChars.push(item);
      }
    });

    
    let concatString = "";
    if (concatAlpha.length > 0) {
      let reversed = concatAlpha.split("").reverse().join("");
      concatString = alternatingCaps(reversed);
    }

    const response = {
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
