let state = {
  points: 0,
  wordsLeft: 15,
};

async function setup() {
  createCanvas(windowWidth, windowHeight);

  WordService = new WordService_singleton();
  TypingUI = new TypingUI_singleton();

  textAlign(CENTER);
}

function newWord() {
  state.word = WordService.getWord();
  state.wordsLeft -= 1;
}

function draw() {
  background(34, 39, 48);
  textStyle(BOLD);

  fill(163, 185, 212);

  if (!WordService.words || frameCount < 5) {
    textSize(40);
    text("How many words do you know?", width / 2, 50);

    textSize(20);
    text("the better version", width / 2, 80);

    textSize(50);
    text("Loading...", width / 2, height / 2);

    return;
  }
  
  if (state.wordsLeft == 0) {
    
    textSize(30)
    text("Congratulations! You finished the word knowledge test.\nHere's your final score:", width/2, 70)
    
    textSize(50)
    text(state.points + " Points", width/2, height/2)
    
    return;
  }

  if (!state.word) {
    newWord();
  }

  textSize(20);
  textAlign(LEFT);
  text("AI powered; you can type whatever.", 10, 30);

  textAlign(CENTER);
  textSize(30);
  text("What does this word mean?", width / 2, height / 2 + 50);

  textSize(60);
  text(state.word, width / 2, height / 2);

  textSize(30);
  text(state.points + " points", width / 2, 70);
  
  if (state.feedback) {
    textAlign(LEFT)
    textSize(20)
    text("previous feedback: " + state.feedback, 10, height-50, width-20)
  }

  TypingUI.draw();
}

async function checkForPoints() {
  
  let [earnedPoints, feedback] = await WordService.evaluateWord(
    state.word,
    TypingUI.currentPhrase
  );
  state.points += earnedPoints;
  state.feedback = `[${earnedPoints}/100] ${feedback}`
  
}

function keyPressed() {
  if (key == "Enter") {
    if (!state.word || TypingUI.currentPhrase.length < 3) {
      return;
    }

    checkForPoints();
    newWord();
  }

  TypingUI.keyPressed(key);
}
