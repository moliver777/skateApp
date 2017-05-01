import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Spots } from '../../providers/spots';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public navCtrl: NavController, public http: Http, public spotsService: Spots) {
    
  }

  register(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    
    this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        this.spotsService.init(res.json());
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
