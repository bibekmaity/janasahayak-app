import { Component } from '@angular/core';

import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LandingPage} from '../pages/landing/landing';
/* import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'; */

//
/* import {DataProvider } from '../providers/data/data';
import { LocalDatabaseProvider } from '../providers/local-database/local-database';
import { UtilityServiceProvider } from '../providers/utility-service/utility-service'; */

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LandingPage;

  constructor(platform: Platform, statusBar: StatusBar, private splashscreen:SplashScreen
    /* private localDb: LocalDatabaseProvider, private dataProvider:DataProvider,
    private util: UtilityServiceProvider */) {
    //
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      /* //First check if app is online
      if (this.util.check_network()) {
        //
        this.localDb.retrieve_loginhash_from_db().then((res) => {
          if (res == true) {
            //
            this.dataProvider.set_user_data(this.localDb.serve_userdata())
            this.rootPage = TabsPage;
          } else if (res == false) {
            this.rootPage = LoginPage;
          }
        })
        //
      } */
      //
      statusBar.styleDefault();
      this.init_app();
    });
  }
  //
  /* private set_user(){
    this.localDb.set_dummy_loginhash();
  } */
  private init_app(){
    setTimeout(()=>{
      this.splashscreen.hide();
    }, 100)
  }

}
