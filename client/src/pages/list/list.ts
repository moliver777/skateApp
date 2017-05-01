import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Spots } from '../../providers/spots';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  spots: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public spotsService: Spots, public geolocation: Geolocation) {
    
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

  goToHome(){
    this.navCtrl.push(HomePage);
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
            this.geolocation.getCurrentPosition().then((position) => {
              this.spotsService.createSpot({title: data.title, latitude: position.coords.latitude, longitude: position.coords.longitude});
            });
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
            this.geolocation.getCurrentPosition().then((position) => {
              this.spotsService.updateSpot({
                _id: spot._id,
                _rev: spot._rev,
                title: data.title,
                latitude: spot.latitude,
                longitude: spot.longitude
              });
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
