import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from '.';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
