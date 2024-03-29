/*
wait for the page/DOM to load
add event listeners
*/
/*
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    console.log(buttons);
    //for (let i=0; i < buttons.length; i++) - traditional, more explicit (clearer?) syntax
    for (let button of buttons) {
        // iterate through array of buttons and add event listener to each button
        button.addEventListener("click", startQuiz() /*function () {
                if (this.getAttribute("data-type") === "submit") {
                    checkAnswer();
                    //alert("You clicked submit");
                } else {
                    startQuiz();
                    //let gameType = this.getAttribute("data-type");
                    //runGame(gameType);
                    //alert(`You clicked ${gameType}`);                
                }
            }
            )
        }
    });
*/




document.addEventListener("DOMContentLoaded", function () {
    //    const response =  fetch('https://the-trivia-api.com/v2/questions');
    //    const response = await fetch('https://the-trivia-api.com/v2/questions');
    //    const data =  response.json();
      //  if (response.ok) {
        //    console.log(data);
        //}
        const data = startQuiz();
        displayData(data);
    
        //const data = await response.json();
        console.log("test5");
        let buttons = document.getElementsByTagName("button");
        console.log(buttons);
        //for (let i=0; i < buttons.length; i++) - traditional, more explicit (clearer?) syntax
        for (let button of buttons) {
            // iterate through array of buttons and add event listener to each button
            button.addEventListener("click", function () {              // startQuiz() /*
                if (this.getAttribute("data-type") === "start") {
                    runQuiz(data);
    //                startQuiz();
                }  else if (this.getAttribute("data-type") === "submit") {
                        //checkAnswer();
                        cab.style.display = 'block';
                        let userAnswer = getUserAnswer();
                        console.log("checkAnswer test");
                        console.log("checkAnswer test" + userAnswer);
                        if (checkAnswer(userAnswer, 3)) {
                            incrementCorrectCount();
                        } else {
                            incrementWrongCount();
                        }
                        //displayCorrectAnswer(data[i].correctAnswer);
                        cab.style.display = 'block';
                        setTimeout(2000000);
                        runQuiz(data);
    
    //                    startQuiz();
                    } else {
                        cab.style.display = 'block';
    //                    startQuiz();
                       runQuiz(data);                             
                    }
                }   // */
            )
        }
    });
    
    async function startQuiz() {
        try {
            const response = await fetch('https://the-trivia-api.com/v2/questions');
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            displayData(data);
            runQuiz(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    
    /*
    
    async function startQuiz() {
        setTimeout(2000000);
        console.log("test");
    // fetch("https://the-trivia-api.com/v2/session")
    // make an API call to get the questions for this quiz round
     /*  fetch('https://the-trivia-api.com/v2/questions')
           .then(response => response.json())      // then(response => response.text())
           .then(data => displayData(data))
           .catch(error => {
               console.error('Error fetching data:', error);
           }
           
           );
    
    */
    /*
       const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();
        console.log("test!");
        if (response.ok) {
           console.log(data);
        }
        console.log("test");
     //   displayData(data);
        return data;
        runQuiz(data);
    } */
    console.log("test0");
    //   runQuiz();
    //document.getElementById("content1").innerText = "Hi World";
    //   startQuiz(data);
    //startQuiz();
    
    function displayData(data) {
        setTimeout(20000)
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            console.log(i);
            for (const key in data[i]) {
                console.log(`${key}: ${data[i][key]}`);
              }
        }
        return data;
    }
    
    // });
    
    /**
     * Main Quiz Loop
     */
    function runQuiz(data) {
        console.log(data);
        document.getElementById("wsb").innerText = 0;
        document.getElementById("csb").innerText = 0;
        csb.style.display = 'none';
        wsb.style.display = 'none';
        next.style.display = 'none';
    //    sub-btn.style.display = 'none';
    
        for (let i = 0; i < data.length; i++) {
            displayQuestion(data[i].question.text);
            answerArray = data[i].incorrectAnswers;
            answerArray[answerArray.length] = data[i].correctAnswer;
            console.log("test: " + answerArray);
    
            const answerIndex = [0, 1, 2, 3];
            // Shuffle the array
            const shuffledIndex = shuffleArray(answerIndex);
            console.log("test: " + shuffledIndex);
            displayCorrectAnswer(data[i].correctAnswer);
    
            displayAnswerOptions(answerArray, shuffledIndex);
            let userAnswer = getUserAnswer();
            console.log("getuserAnswer 2: " + userAnswer);
    
            /*
            document.getElementById('myForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the form from submitting and reloading the page
                
                const userInput = document.getElementById('userInput').value;
                console.log("User input:", userInput);
                
                // Continue with your program logic here using the userInput
                
                // For demonstration purposes, let's alert the user with their input
                alert("You entered: " + userInput);
              });
    
    */
    
            // create answer array containing correct & incorrect answers:
    
            // shuffle array of numbers, so that answers will be displayed randomly to user.
    
            // this needs to be changed - the correct answer is always the last element currently.
           /* if (checkAnswer(userAnswer, 3)) {
                incrementCorrectCount();
            } else {
                incrementWrongCount();
            }*/
            // user selects 'next question' so that loop doesn't run through all questions instantly
        }
    }
    
    function displayQuestion(q) {
        //        document.getElementById("content2").innerText = "Question: " + data[0].question.text;  // access the actual question: object = question -> text = parameter.
        document.getElementById("question").innerText = "Question: " + q;  // access the actual question: object = question -> text = parameter.
    };
    
    function displayAnswerOptions(p, index) {
        // these need to be randomised
        // and displayed in indivdual boxes numbered 1 to 4
        //console.log(p);
        document.getElementById("answer1").innerText = p[index[0]];
        document.getElementById("answer2").innerText = p[index[1]];
        document.getElementById("answer3").innerText = p[index[2]];
        document.getElementById("answer4").innerText = p[index[3]];
    
    };
    
    function displayCorrectAnswer(q) {
        document.getElementById("cab").innerText = "Correct Answer: " + q;
        cab.style.display = 'none';
    
    };
    
    function getUserAnswer() {
        // let answer = document.getElementById("answer").textContent;
       // document.getElementById("answerbox").value = 1;   // temporary entering user answer via js code
        let userAnswer = parseInt(document.getElementById("answerbox").value);
        console.log("getuserAnswer: " + userAnswer);
        //       document.getElementById("content6").textContent = "Answer Choice: " + q + " " + p;
        // decrement User Answer (1-4) by 1 to make it array point (0-3)
        userAnswer--;
        return userAnswer;
    }
    
    function checkAnswer(p, q) {
        //  is user answer = data[i].correctAnswer
        // return 0 == incorrect; 1 == correct
        //     let userAnswer = parseInt(document.getElementById("answer-box").value);
        if (p===q){
            return 1;
        } else {
            return 0;
        }
            
    
        /*
         let userAnswer = parseInt(document.getElementById("answer-box").value);
         let calculatedAnswer = calculateCorrectAnswer();
         let isCorrect = userAnswer === calculatedAnswer[0];
         //let gt = gameType;
         let operator = document.getElementById("operator").innerText;
         //let operator = this.getAttribute("data-type"); 
         if (isCorrect) {
             alert("Well Done, Correct.");
             incrementScore();
         } else {
             alert(`Doh! ${userAnswer} ?? Wrong! can you ${operator} ? oh well, the correct answer is ${calculatedAnswer[0]}`)
             incrementWrongAnswer();
         }*/
    }
    function incrementCorrectCount() {
        console.log("correct");
        let oldScore = parseInt(document.getElementById("csb").innerText);
        document.getElementById("csb").innerText = ++oldScore;
    
    }
    function incrementWrongCount() {
        console.log("wrong");
        let oldScore = parseInt(document.getElementById("wsb").innerText);
        console.log(oldScore);
        document.getElementById("wsb").innerText = ++oldScore;
    }
    
    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // shuffle array of numbers, so that answers will be displayed randomly to user.
    const answerIndex = [0, 1, 2, 3];
    
    // Shuffle the array
    const shuffledIndex = shuffleArray(answerIndex);
    
    console.log(shuffledIndex);
    
    
    
    
    