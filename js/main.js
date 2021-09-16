class Terminal {
  
  /**
  *
  * bind is a method inherited from Function.bind() similar to call and apply
  * It helps to bind a function to an object's context during initialisation
  *
  * */
  
  constructor(input,terminal,output,ENTER_KEY,fileSystem) {
    
    // Define functions in the constructor
    this.onKeyDown = this.onKeyDown.bind(this) // done
    this.clearHistory = this.clearHistory.bind(this) // done
    this.addHistory = this.addHistory.bind(this) // done
    this.listFiles = this.listFiles.bind(this) // done
    this.catFile = this.catFile.bind(this) // done
    this.runFile = this.runFile.bind(this) // done
    this.scrollToBottom = this.scrollToBottom.bind(this) // done

    this.ENTER_KEY = ENTER_KEY
    this.fileSystem = fileSystem
    
    /**
    *
    TODOS:
    this.makeDirectory = this.makeDirectory.bind(this)
    this.CreateFile = this.CreateFile.bind(this)
    *
    */
    this.history = []
    this.elements = {
      input: document.querySelector(input),
      terminal: document.querySelector(terminal),
      outputContainer: document.querySelector(output)
    }
    
    this.prompt = '$'
    this.commands = {
      clear: this.clearHistory,
      ls: this.listFiles,
      cat: this.catFile,
      run: this.runFile,
      
      /** TODOS:
      mkdir: this.makeDirectory,
      touch: this.CreateFile,
      *
      */
    }
    
    this.elements.input.addEventListener('keydown', this.onKeyDown)
    this.catFile('README.txt')
  }
  
  
  /*
    Commands functions.  
  */

  clearHistory() {
    this.history = []
    this.elements.outputContainer.innerHTML = ''
  }

  catFile(fileName) {
    if (fileName in this.fileSystem)
      this.addHistory(this.fileSystem[fileName])
    else
      this.addHistory(`${fileName}: No such file or directory. Usage: cat filename.`)
  }
  
  runFile(fileName) {
    if (fileName in this.fileSystem)
      this.addHistory(this.fileSystem[fileName])
    else
      this.addHistory(`${fileName}: No such file or directory. Usage: run filename.`)
  }
  
  listFiles() {
    var output = Object.keys(this.fileSystem).reduce((acc, curr, index) => {
      var deliminator = index % 3 === 0 && index !== 0 ? '\n' : '\t'
      return `${acc}${curr}${deliminator}`
    }, '')
    
    this.addHistory(output)
  }
  
  
  /*
    DOM functions.
  */

  addHistory(output) {
    this.history.push(output)
    
    var outputText = document.createTextNode(output)
    var outputEl = document.createElement('pre')
    
    outputEl.classList.add('output')
    outputEl.appendChild(outputText)
    
    this.elements.outputContainer.appendChild(outputEl)
  }
  
  onKeyDown(e) {
    
    // responds to Enter after typing a command
    if (e.keyCode !== this.ENTER_KEY) return
    
    var inputText = this.elements.input.value
    var inputArray = inputText.split(' ')
    var inputCommand = inputArray[0]
    var arg = inputArray[1]
    
    this.addHistory(`${this.prompt} ${inputText}`)
    this.clearInput()
    
    if (inputCommand === '') return
    
    var command = this.commands[inputCommand]
    
    if (command)
      command(arg)
    else
      this.addHistory(`sh: command not found: ${inputCommand}`)
    
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.elements.terminal.scrollTop = this.elements.terminal.scrollHeight
  }

  clearInput() { this.elements.input.value = '' }
  
}


/**
TODOS:
*
*
1. Start command
2. Submission and a return message
*
*
*/

const EntryKey = 13;
const FileSystem = {
  
  'README.txt': `Hello, muggle. You're now entering the wizarding world of the command-line system. Here, you'll learn new spells to help you control the file-system by typing commands into the shell. You will also learn steganography to help Harry Potter find the hidden Horcrux inside the image and kill Voldemort.
  
  Supported commands are:
  - clear: clear the terminal
  - ls: list directory contents
  - cat: print text files
  - run: execute files`
  
  ,
  'challenge.txt': `
  
  In order to ensures Voldemort's immortality, he split his soul into 8 parts and it's now hidden  inside many Horcruxes. One of these Horcruxes is an image file and this image contains part of his soul hidden inside it, can you try to find it? You're expected to learn aout steganography to solve this challenge. Use Google for that, duh!
  
  - Navigate to steganography.txt to learn about it, but feel free to use Google to learn more.
  - Go to image.txt and copy the image link that has the hidden message, sent from Harry to you!
  
  `,
  
  'steganography.txt': `
  In modern digital steganography, data is first encrypted and then inserted using a special algorithm into image, audio or video files.`,
  
  'image.txt': `Here's the image link https://i.ibb.co/P4fPwDj/ican.png`,
  
  /**
  TODOS 'submit.exe': ` `,
  I want to make a submission here that returns the message "Great job! I'm glad we're on the same page."
  */
  
}

const t1 = new Terminal('.input','.terminal','.outputContainer',EntryKey,FileSystem)