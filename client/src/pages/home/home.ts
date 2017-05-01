import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { Spots } from '../../providers/spots';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  spots: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public spotsService: Spots, public geolocation: Geolocation) {
    
  }

  ionViewDidLoad(){
    this.spotsService.getSpots().then((data) => {
      this.spots = data;
      this.loadMap();
    });
  }

  logout(){
    this.spotsService.logout();
    this.spots = null;
    this.navCtrl.setRoot(LoginPage);
  }

  goToList(){
    this.navCtrl.push(ListPage);
  }
  
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      let location = new LatLng(position.coords.latitude, position.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true,
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 20,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });
    });
  }
}
