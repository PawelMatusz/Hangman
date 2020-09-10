import { Quote } from './Quote.js';

export class Game {
  currentStep = 0;
  lastStep = 7;
  quotes = [
    {
      text: 'pan tadeusz',
      category: 'utwór literacki',
    },
    {
      text: 'janko muzykant',
      category: 'utwór literacki',
    },
    {
      text: 'akademia pana kleksa',
      category: 'utwór literacki',
    },
    {
      text: 'dzieci z bullerbyn',
      category: 'utwór literacki',
    },
    {
      text: 'ogniem i mieczem',
      category: 'utwór literacki',
    },
    {
      text: 'ela',
      category: 'utwór literacki',
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName('step')[
        this.currentStep
      ].style.opacity = 1;
    }
    if (this.currentStep == this.lastStep) {
      this.lossing();
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement('button');
      button.innerHTML = label;
      button.addEventListener('click', event => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes('_')) {
      this.wining();
    }
  }
  wining() {
    this.wordWrapper.innerHTML = 'Gratulacje Win!!!';
    this.lettersWrapper.innerHTML = '';
  }
  lossing() {
    this.wordWrapper.innerHTML = 'Lose:(';
    this.lettersWrapper.innerHTML = '';
  }
  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }
}

const game = new Game({
  lettersWrapper: document.getElementById('letters'),
  categoryWrapper: document.getElementById('category'),
  wordWrapper: document.getElementById('word'),
  outputWrapper: document.getElementById('output'),
});
game.start();
