const Calculator = require('../libraries/Calculator');
let myCalc = new Calculator();

exports.addNumbers = (req, res) => {
  try {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);

    if (isNaN(number1) || isNaN(number2)) {
      return res.status(400).json({ error: 'Please enter valid numbers' });
    }

    let result = myCalc.add(number1, number2);
    console.log(result);

    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
