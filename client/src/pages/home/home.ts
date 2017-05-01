import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Spots } from '../../providers/spots';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  spots: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public spotsService: Spots) {
    
  }

  ionViewDidLoad(){
    this.spotsService.getSpots().then((data) => {
      this.spots = data;
    });
  }

  logout(){
    this.spotsService.logout();
    this.spots = null;
    this.navCtrl.setRoot(LoginPage);
  }

  createSpot(){
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'Name this spot',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.spotsService.createSpot({title: data.title});
          }
        }
      ]
    });
    
    prompt.present();
  }

  updateSpot(spot){
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Rename this spot?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.spotsService.updateSpot({
              _id: spot._id,
              _rev: spot._rev,
              title: data.title
            });
          }
        }
      ]
    });
    
    prompt.present();
  }

  deleteSpot(spot){
    this.spotsService.deleteSpot(spot);
  }
}
