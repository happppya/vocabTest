
function isAlphabetic(char) {
  return /^[a-zA-Z]$/.test(char);
}

window.TypingUI_singleton = class {
  
  constructor() {
    this.currentPhrase = ""
  }

  draw() {
    
    fill(255)
    textAlign(CENTER)
    
    textSize(25)
    text(">" + this.currentPhrase, width / 2, height / 1.3)
    
  }
    
  keyPressed(pressedKey) {
    
    if (pressedKey.length != 1) {
      
      if (pressedKey == "Backspace") {
        this.currentPhrase = this.currentPhrase.slice(0, -1)
      } else if (pressedKey == "Control") {
        this.currentPhrase = ""
      } else if (pressedKey == "Enter") {
        this.currentPhrase = ""
      }
      
      return;
      
    }
    
    //if (!isAlphabetic(pressedKey)) return;
    
    this.currentPhrase += pressedKey;
    
  }
    
}
