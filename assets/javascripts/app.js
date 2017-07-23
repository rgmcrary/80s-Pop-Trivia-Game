//  Declared Variables

var userSelect;
var currentAns;
var ansImg;
var correct;
var incorrect;
var missed;
var quesIndex;
var interval;

// Assigned Variables
var counter;

var quesAns = [
  {
    ques: "What vampire movie starred David Bowie and Susan Sarandan?",
    ans: [
      { choice: "The Lost Boys", isAnswer: false },
      { choice: "The Hunger", isAnswer: true },
      { choice: "Fright Night", isAnswer: false },
      { choice: "Once Bitten", isAnswer: false }
    ]
  },
  {
    ques: "What popular accessory would you have found in a sewing kit?",
    ans: [
      { choice: "Tape measure", isAnswer: false },
      { choice: "Shears", isAnswer: false },
      { choice: "Safety pin", isAnswer: true },
      { choice: "Thimble", isAnswer: false }
    ]
  },
  {
    ques: "What song title became a shirt slogan that was popular among teens?",
    ans: [
      { choice: "Relax", isAnswer: true },
      { choice: "Venus", isAnswer: false },
      { choice: "Vacation", isAnswer: false },
      { choice: "Don't Stop Believing", isAnswer: false }
    ]
  },
  {
    ques: "What was a popular valley girl term of disgust?",
    ans: [
      { choice: "As if", isAnswer: false },
      { choice: "Gag me with a spoon", isAnswer: true },
      { choice: "Ewwwww", isAnswer: false },
      { choice: "No way", isAnswer: false }
    ]
  },
  {
    ques: "What coming of age movie took place in a school library setting?",
    ans: [
      { choice: "Pretty in Pink", isAnswer: false },
      { choice: "Weird Science", isAnswer: false },
      { choice: "Real Genius", isAnswer: false },
      { choice: "The Breakfast Club", isAnswer: true }
    ]
  }
];

// Game Object

$(".results").hide();

var game = {
  start: function() {
    // Set Game Board and Variables
    $("#startButton").hide();
    $(".results").hide();
    correct = 0;
    incorrect = 0;
    missed = 0;
    quesIndex = 0;

    // Populate Question and Answers on screen

    game.getQues();
  },

  // Question Loop

  getQues: function() {
    $(".question").text(quesAns[quesIndex].ques);

    $(".answers").text("");

    for (var j = 0; j < quesAns[quesIndex].ans.length; j++) {
      $(".answers").append(
        "<button type='button' class='btn btn-link ansChoices'>" +
          quesAns[quesIndex].ans[j].choice +
          "</button>"
      );

      if (quesAns[quesIndex].ans[j].isAnswer === true) {
        currentAns = quesAns[quesIndex].ans[j].choice;
        ansImg = quesAns[quesIndex].ans[j].img;
      }
    }

    $(".ansChoices").on("click", game.ansCompare);

    $(".timer").show();

    game.timer(11);
  },

  // Question Timer

  timer: function(counter) {
    interval = setInterval(function() {
      counter--;
      $(".timer").text(counter);
      if (counter === 0) {
        clearInterval(interval);
        game.ansCompare();
      }
    }, 1000);
  },

  // Answer Check

  ansCompare: function() {
    userSelect = $(this).text();
    clearInterval(interval);
    if (userSelect === currentAns) {
      correct++;
    } else if (userSelect === "") {
      missed++;
    } else {
      incorrect++;
    }

    $(".answers").text(currentAns);
    $(".image").html(ansImg);

    // Answer Display Countdown Timer

    quesIndex++;

    $(".timer").text("");

    setTimeout(function() {
      if (quesIndex < quesAns.length) {
        game.getQues();
      } else {
        game.updateDisplay();
      }
    }, 3000);
  },

  // Win/Loss Scoring

  updateDisplay: function(updateType) {
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#missed").text(missed);
    $("#startButton").show();
    $(".results").show();
  }
};

// Start Button to initiate game

$("#startButton").on("click", game.start);
