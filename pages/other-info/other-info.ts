import { Component } from '@angular/core';
import {  NavController,/* NavParams, */ App } from 'ionic-angular';

import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';
import { DataProvider } from '../../providers/data/data';
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';

//
import { LoginPage } from '../login/login';
import { OtherInfoDetailsPage } from '../other-info-details/other-info-details';

@Component({
  selector: 'page-other-info',
  templateUrl: 'other-info.html',
})
export class OtherInfoPage {

  private userData: any;
  //
  private allInfo: any;
  private infoArr: Array<any> = [];

  //   department, officer_in_chrg, mobile_no, schemes

  constructor( private navCtrl: NavController, /*private navParams: NavParams, */
    private dataProvider: DataProvider, private util: UtilityServiceProvider,
    private localDb: LocalDatabaseProvider, private app: App) {
  }

  ionViewWillEnter() {
    /* this.dataProvider.get_user_data().then(data => {
      console.log(data);
      this.userData = data;
    }) */
    this.dataProvider.fetch_info_details().then(data => {
      //this.infoArr = data['info'];
      this.allInfo = data['info'];
      //console.log(data['info'])
      //this.detail = this.allInfo[0];
      this.initializeItems();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherInfoPage');
  }

  initializeItems() {
    this.infoArr = this.allInfo;
  }
  //
  itemSelected(item) {
    //console.log(item);
    this.navCtrl.push(OtherInfoDetailsPage, item);
  }
  //
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();


    // set val to the value of the searchbar
    const val = ev.target.value;
    //

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //let str = 
      this.infoArr = this.infoArr.filter((item) => {
        //console.log(item.officer);
        return (String(item.department).toLowerCase().indexOf(val.toLowerCase()) > -1 || String(item.officer).toLowerCase().indexOf(val.toLowerCase()) > -1 || String(item.mobile).toLowerCase().indexOf(val.toLowerCase()) > -1 || String(item.scheme).toLowerCase().indexOf(val.toLowerCase()) > -1);
        //return (String(item.officer).toLowerCase().indexOf(val.toLowerCase()) > -1 );
        //return (String(item.mobile).toLowerCase().indexOf(val.toLowerCase()) > -1 );
        //return(String(item.scheme).toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }

  }

  //
  onLogOut() {
    // first logout from the back-end
    let loader: any;
    //let msg: string;
    //
    let user_data = {
      "mobile_num": this.userData.mobile_num,
      "token": this.userData.token,
      "tag": CmplMgmtCnst.TAG_LOGOUT
    }
    loader = this.util.show_param_loader(CmplMgmtCnst.LOGOUT_PROCESS_START);
    //
    this.dataProvider.logout_user_from_backend(user_data).then(res => {
      loader.dismiss();
      //
      if (res == CmplMgmtCnst.GENERIC_SUCCESS) {
        //
        this.localDb.log_out_user().then(resp => {
          if (resp == CmplMgmtCnst.USER_LOGOUT) {
            //
            this.util.show_timed_toast(CmplMgmtCnst.LOGOUT_SUCCESS, 3000, 'middle');
            //
            this.app.getRootNav().setRoot(LoginPage)
          }
        })
        //
      } else if (res == CmplMgmtCnst.GENERIC_FAILURE) {
        //
        this.util.show_timed_toast(CmplMgmtCnst.LOGOUT_FAILURE, 3000, 'middle');
      }
    })

  }

}
