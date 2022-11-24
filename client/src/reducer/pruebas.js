const isPalindrome=(word) => {
    word = word.toLowerCase();
    var half = word.length/2;
    return word.slice(0, half) === word.slice(-half).split("").reverse().join("");
  }
  
  console.log(isPalindrome("madam"));
  console.log(isPalindrome("foobar"));
  console.log(isPalindrome("Kayak"));
  const formatter = (o) => {
      //implement method here 
      return o.reduce((acc, { id, question_name, question_value: value }) => {
          if (acc[question_name]) {
              acc[question_name].push({ id, value })
            } else {
                acc[question_name] = [{ id, value }]
            }
            return acc
        }, {})
    }
    const exampleJSON = [
      { 'id': 1, 'question_name': "What is your name?", 'question_value': "Jack"},
      { 'id': 2, 'question_name': "What is your hobby?", 'question_value': "Rugby"},
      { 'id': 3, 'question_name': "What is your name?", 'question_value': "Peter"},
      { 'id': 4, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
      { 'id': 5, 'question_name': "What is your hobby?", 'question_value': "Basquetball"},
      { 'id': 6, 'question_name': "What is your hobby?", 'question_value': "Tennis"},
      { 'id': 7, 'question_name': "What is your hobby?", 'question_value': "Ping Pong"},
      { 'id': 8, 'question_name': "What is your hobby?", 'question_value': "Football"}
    ];
console.log(formatter(exampleJSON))