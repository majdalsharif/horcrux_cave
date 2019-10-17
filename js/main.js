
/**
TODOS:
*
*
1. Start command
2. Submission and a return message
*
*
*/


const ENTER_KEY = 13
const fileSystem = {

  'README.txt': `Hello, muggle. You're now entering the wizarding world of the command-line system. Here, you'll learn new spells to help you control the file-system by typing commands into the shell. You will also learn steganography to help Harry Potter find the hidden Horcrux inside the image and kill Voldemort.

Supported commands are:
  - clear: clear the terminal
  - ls: list directory contents
  - cat: print text files
  - run: execute files`

  ,
    'challenge.txt': `

    In order to ensures Voldemort's immortality, he split his soul into 8 parts and it's now hidden  inside many Horcruxes. One of these Horcruxes is an image file and this image contains part of his soul hidden inside it, can you try to find it? You're expected to learn aout steganography to solve this challenge. Use Google for that, duh!

    - Navigate to steganography.txt to learn about it, but feel free to use Google to learn more and solve this challenge.
    - Go to image.txt and copy the image link that has the hidden message, sent from Harry to you!
    - Read the hint file.

    `,

    'steganography.txt': `
In modern digital steganography, data is first encrypted and then inserted using a special algorithm into image, audio or video files.`,

    'image.txt': `Here's the image link https://bit.ly/2BmU6Sx`,
    'hint.txt': `To reveal the secret message that is hidden inside another image, we must decode it by using the password.`,
    'password.txt': `tryharder`,

    /**
    TODOS 'submit.exe': ` `,
    i want to make a submission here that returns the message "Great job! I'm glad we're on the same page."
    */

  }

  new class Terminal {

    /**
     *
     bind is a method inherited from Function.bind() similar to call and apply
     * It helps to bind a function to an object's context during initialisation
     *
     * */

    constructor() {

      // Define functions in the constructor
      this.onKeyDown = this.onKeyDown.bind(this) // done
      this.clearHistory = this.clearHistory.bind(this) // done
      this.addHistory = this.addHistory.bind(this) // done
      this.listFiles = this.listFiles.bind(this) // done
      this.catFile = this.catFile.bind(this) // done
      this.scrollToBottom = this.scrollToBottom.bind(this) // done

      /**
      *
      TODOS:
        this.makeDirectory = this.makeDirectory.bind(this)
        this.CreateFile = this.CreateFile.bind(this)
      *
      */


      this.history = []
      this.elements = {
        input: document.querySelector('.input'),
        terminal: document.querySelector('.terminal'),
        outputContainer: document.querySelector('.outputContainer')
      }

      this.prompt = '$'
      this.commands = {
        clear: this.clearHistory,
        ls: this.listFiles,
        cat: this.catFile,
        run: this.catFile,

        /** TODOS:
              mkdir: this.makeDirectory,
              touch: this.CreateFile,
              *
              */
      }

      this.elements.input.addEventListener('keydown', this.onKeyDown)
      this.catFile('README.txt')
    }

      clearHistory() {
      this.history = []
      this.elements.outputContainer.innerHTML = ''
    }


    catFile(fileName) {
      if (fileName in fileSystem)
        this.addHistory(fileSystem[fileName])
      else
        this.addHistory(`${fileName}: No such file or directory. Usage: cat filename.`)
    }

     runFile(fileName) {
      if (fileName in fileSystem)
        this.addHistory(fileSystem[fileName])
      else
        this.addHistory(`${fileName}: No such file or directory. Usage: run filename.`)
    }

    scrollToBottom() {
      this.elements.terminal.scrollTop = this.elements.terminal.scrollHeight
    }

    addHistory(output) {
      this.history.push(output)

      var outputText = document.createTextNode(output)
      let outputEl = document.createElement('pre')

      outputEl.classList.add('output')
      outputEl.appendChild(outputText)

      this.elements.outputContainer.appendChild(outputEl)
    }

    listFiles() {
      const output = Object.keys(fileSystem).reduce((acc, curr, index) => {
        const deliminator = index % 3 === 0 && index !== 0 ? '\n' : '\t'
        return `${acc}${curr}${deliminator}`
      }, '')

      this.addHistory(output)
    }

    clearInput() { this.elements.input.value = '' }

    onKeyDown(e) {

      // responds to Enter after typing a command
      if (e.keyCode !== ENTER_KEY) return

      const inputText = this.elements.input.value
      const inputArray = inputText.split(' ')
      const inputCommand = inputArray[0]
      const arg = inputArray[1]

      this.addHistory(`${this.prompt} ${inputText}`)
      this.clearInput()

      if (inputCommand === '') return

      const command = this.commands[inputCommand]

      if (command)
        command(arg)
      else
        this.addHistory(`sh: command not found: ${inputCommand}`)

      this.scrollToBottom()
    }

  }
