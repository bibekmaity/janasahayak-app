import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//
import { DataProvider } from '../../providers/data/data';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';
//
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  landingPageSlider: Array<any>;
  //
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localDb: LocalDatabaseProvider, private dataProvider: DataProvider,
    private util: UtilityServiceProvider) {
    this.createSliderData();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  createSliderData() {
    console.log('creating');
    this.landingPageSlider = [
      { "imgpath": "assets/imgs/slider001.png" },
      { "imgpath": "assets/imgs/slider002.png" }
    ];
  }

  onWelcomeTap() {
    //First check if app is online
      if (this.util.check_network()) {
        //
        this.localDb.retrieve_loginhash_from_db().then((res) => {
          if (res == true) {
            //
            this.dataProvider.set_user_data(this.localDb.serve_userdata())
            this.navCtrl.setRoot(TabsPage);
          } else if (res == false) {
            this.navCtrl.setRoot(LoginPage);
          }
        })
        //
      }
  }

}
