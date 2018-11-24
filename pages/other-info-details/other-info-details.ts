import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-other-info-details',
  templateUrl: 'other-info-details.html',
})
export class OtherInfoDetailsPage {

  private detail:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewWillLoad(){
    this.detail = this.navParams.data;
    console.log(this.detail);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherInfoDetailsPage');
  }

}
