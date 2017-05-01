import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Signup } from '.';

@NgModule({
  declarations: [
    Signup,
  ],
  imports: [
    IonicPageModule.forChild(Signup),
  ],
  exports: [
    Signup
  ]
})
export class SignupModule {}
