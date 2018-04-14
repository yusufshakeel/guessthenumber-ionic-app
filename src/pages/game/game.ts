import {Component} from '@angular/core';
import {AlertController, NavController} from "ionic-angular";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  totalWrongLimit = 5;
  totalCorrectLimit = 3;

  correctNumber: number;
  leftBtnNumber: number;
  rightBtnNumber: number;

  isGuessCorrect: boolean;
  isShowingResult: boolean;

  correctGuessCount: number;
  wrongGuessCount: number;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.restartGame();
  }

  restartGame() {
    this.setRandomNumber();
    this.isShowingResult = false;
    this.correctGuessCount = 0;
    this.wrongGuessCount = 0;
  }

  setRandomNumber() {
    this.correctNumber = Math.floor((Math.random() * 100));
    let isAddingOne = Math.random();
    let correctSide = Math.random();

    if (isAddingOne > 0.5) {
      if (correctSide > 0.5) {
        this.leftBtnNumber = this.correctNumber;
        this.rightBtnNumber = this.correctNumber + 1;
      } else {
        this.leftBtnNumber = this.correctNumber + 1;
        this.rightBtnNumber = this.correctNumber;
      }
    } else {
      if (correctSide > 0.5) {
        this.leftBtnNumber = this.correctNumber;
        this.rightBtnNumber = this.correctNumber - 1;
      } else {
        this.leftBtnNumber = this.correctNumber - 1;
        this.rightBtnNumber = this.correctNumber;
      }
    }
  }

  onSelectNumber(x: number) {
    this.isShowingResult = true;

    if (x === this.correctNumber) {
      this.isGuessCorrect = true;
      this.correctGuessCount++;
    } else {
      this.isGuessCorrect = false;
      this.wrongGuessCount++;
    }

    if (this.wrongGuessCount == this.totalWrongLimit) {
      let alert = this.alertCtrl.create({
        title: 'Game Over',
        message: 'You made ' + this.totalWrongLimit + ' wrong guesses',
        buttons: [
          {
            text: 'Play Again',
            role: 'cancel',
            handler: () => {
              this.restartGame();
            }
          },
          {
            text: 'End Game',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    if (this.correctGuessCount == this.totalCorrectLimit) {
      let alert = this.alertCtrl.create({
        title: 'Awesome',
        message: 'You won!',
        buttons: [
          {
            text: 'Play Again',
            role: 'cancel',
            handler: () => {
              this.restartGame();
            }
          },
          {
            text: 'End Game',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }

    this.setRandomNumber();
  }

  onEndGame() {
    this.navCtrl.pop();
  }

}
