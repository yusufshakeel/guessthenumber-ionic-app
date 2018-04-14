import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {GamePage} from "../game/game";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController) {
  }

  onGoToGamePage() {
    // this.navCtrl.push(GamePage);

    let modal = this.modalCtrl.create(GamePage);
    modal.present();
  }

}
