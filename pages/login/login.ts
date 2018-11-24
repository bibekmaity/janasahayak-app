import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service';
import { DataProvider } from '../../providers/data/data';
//
import { TabsPage } from '../tabs/tabs';
//
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mobile_num: any = '';
  user_name: any = '';
  otp: string = '';
  //
  otpSubmitOnce:boolean = false;

  constructor(private navCtrl: NavController, /* private navParams: NavParams, */
    private localDb: LocalDatabaseProvider, private util: UtilityServiceProvider,
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidLeave(){
    this.otpSubmitOnce = false;
  }

  //  - অনুগ্রহ করে একটু অপেক্ষা করুন 
  onSubmit_userData() {
    if (this.mobile_num == '' || this.user_name == '') {
      //      
      this.util.show_param_alert(CmplMgmtCnst.OTP_RQST_ERR_TITLE, CmplMgmtCnst.OTP_RQST_ERR_MSG, CmplMgmtCnst.OK_MSG);
      //
    } else if (this.mobile_num != '' && this.user_name != '') {
      //
      //let loader = this.util.show_param_loader('অনুগ্রহ করে অপেক্ষা করুন - আপনাকে ওটিপি পাঠানো হচ্ছে');
      //
      let mobile_num_length: number = String(this.mobile_num).length;
      //
      if (mobile_num_length != 10) {
        //
        //
        this.util.show_param_alert(CmplMgmtCnst.WRONG_MOBILE_NUM_TITLE, CmplMgmtCnst.WRONG_MOBILE_NUM_MSG, CmplMgmtCnst.OK_MSG);
        //
      } else if (mobile_num_length == 10) {
        //
        let data_obj = {
          "mobile_num": this.mobile_num,
          "name": this.user_name,
          "tag": CmplMgmtCnst.TAG_OTP
        }
        //
        // Disable Primary OTP button
        this.otpSubmitOnce = true;
        //
        this.dataProvider.request_OTP(data_obj).then(resp => {

        })
        //
      }
      //
    }
    //
  }

  onSubmit_OTP() {
    if (this.otp == '') {
      //
      this.util.show_param_alert(CmplMgmtCnst.NO_OTP_TYPED, CmplMgmtCnst.NO_OTP_MSG, CmplMgmtCnst.OK_MSG);
      //
    } else if (this.otp != '') {
      //
      let data_obj = {
        "mobile_num": this.mobile_num,
        "otp": this.otp,
        "tag": CmplMgmtCnst.TAG_LOGIN
      }
      //
      
      this.dataProvider.verify_OTP(data_obj).then(resp => {
        if (resp == CmplMgmtCnst.GENERIC_SUCCESS) {
          //
          console.log(this.dataProvider.get_user_data());
          //
          this.localDb.set_user_loginhash(this.dataProvider.get_temp_user_data()).then(dbResp => {
            console.log(dbResp);
            //
            if (dbResp == CmplMgmtCnst.GENERIC_SUCCESS) {
              this.navCtrl.setRoot(TabsPage);
            }
          })
          //
        }

      })
      //
      /* setTimeout(() => {
        loader.dismiss();
        this.localDb.set_dummy_loginhash().then(resp => {
          if (resp == CmplMgmtCnst.GENERIC_SUCCESS) {
            this.navCtrl.setRoot(TabsPage);
          }
        })
        //

      }, 3000) */
      //
    }

  }

}
