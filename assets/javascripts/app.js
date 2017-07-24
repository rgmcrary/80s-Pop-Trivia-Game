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
      { choice: "The Hunger", isAnswer: true, ansImg: "hunger.jpg" },
      { choice: "Fright Night", isAnswer: false },
      { choice: "Once Bitten", isAnswer: false }
    ]
  },
  {
    ques: "What popular accessory would you have found in a sewing kit?",
    ans: [
      { choice: "Tape measure", isAnswer: false },
      { choice: "Shears", isAnswer: false },
      { choice: "Safety pin", isAnswer: true, ansImg: "safetypins.jpg" },
      { choice: "Thimble", isAnswer: false }
    ]
  },
  {
    ques: "What song title became a shirt slogan that was popular among teens?",
    ans: [
      { choice: "Relax", isAnswer: true, ansImg: "relax.jpg" },
      { choice: "Venus", isAnswer: false },
      { choice: "Vacation", isAnswer: false },
      { choice: "Don't Stop Believing", isAnswer: false }
    ]
  },
  {
    ques: "What was a popular valley girl term of disgust?",
    ans: [
      { choice: "As if", isAnswer: false },
      { choice: "Gag me with a spoon", isAnswer: true, ansImg: "gagme.jpg" },
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
      {
        choice: "The Breakfast Club",
        isAnswer: true,
        ansImg: "breakfastclub.png"
      }
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

    // Reset Screen
    $(".feedback").text("").show();
    $(".answers").text("");
    $(".correctAns").text("").show();
    $(".question").show();
    $(".answers").show();
    $(".image").html("");

    for (var j = 0; j < quesAns[quesIndex].ans.length; j++) {
      $(".answers").append(
        "<button type='button' class='btn btn-link ansChoices'>" +
          quesAns[quesIndex].ans[j].choice +
          "</button>"
      );

      if (quesAns[quesIndex].ans[j].isAnswer === true) {
        currentAns = quesAns[quesIndex].ans[j].choice;
        ansImg = quesAns[quesIndex].ans[j].ansImg;
      }
    }

    $(".ansChoices").on("click", game.ansCompare);

    $(".timer").show();

    game.timer(10);
  },

  // Question Timer

  timer: function(counter) {
    $(".timer").text(counter + " Seconds Left");
    interval = setInterval(function() {
      counter--;
      $(".timer").text(counter + " Seconds Left");
      if (counter === 0) {
        clearInterval(interval);
        game.ansCompare();
      }
    }, 2000);
  },

  // Answer Check

  ansCompare: function() {
    userSelect = $(this).text();
    clearInterval(interval);
    var comment;
    if (userSelect === currentAns) {
      correct++;
      comment = "GREAT JOB!!";
    } else if (userSelect === "") {
      missed++;
      comment = "YOU DIDN'T ANSWER!!";
    } else {
      incorrect++;
      comment = "WRONG!!";
    }
    $(".answers").text("");
    $(".feedback").text(comment);
    $(".correctAns").text(currentAns);
    $(".image").html("<img src='assets/images/" + ansImg + "'>");

    // Answer Display Countdown Timer

    quesIndex++;

    $(".timer").text("");

    setTimeout(function() {
      if (quesIndex < quesAns.length) {
        game.getQues();
      } else {
        game.updateDisplay();
      }
    }, 2000);
  },

  // Win/Loss Scoring

  updateDisplay: function(updateType) {
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $("#missed").text(missed);
    $("#startButton").text("Play Again").show();
    $(".results").show();
    $(".question").hide();
    $(".answers").hide();
    $(".correctAns").hide();
    $(".feedback").hide();
    $(".image").html("");
  }
};

// Start Button to initiate game

$("#startButton").on("click", game.start);
