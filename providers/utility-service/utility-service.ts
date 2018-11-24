import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//
import { ToastController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';

//
@Injectable()
export class UtilityServiceProvider {

  constructor(public http: HttpClient,
    private net: Network,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private platform: Platform) {
    //
    console.log('Hello UtilityServiceProvider Provider');
  }
  //
  check_network() {
    let ifNetAvailable: Boolean = false;
    //console.log(this.net.type);
    if (this.net.type === 'wifi' || this.net.type === '3g' || this.net.type === '4g') {
      ifNetAvailable = true;
    } else {
      ifNetAvailable = false;
      // No Network of specified TYPE found - fire up an alert
      this.show_param_alert(CmplMgmtCnst.NO_INTERNET_TITLE, CmplMgmtCnst.NO_INTERNET_MSG, CmplMgmtCnst.OK_MSG, '', true);
    }
    //
    return ifNetAvailable;
  }
  //
  public show_generic_input_error(msg:string) {

    let error_description:string = msg;
    //
    /* if (type == 'one') {      
      error_description = CmplMgmtCnst.GENERIC_DATA_MISSING;
    } else if (type == 'two') {      
      error_description = CmplMgmtCnst.GENERIC_BLOCK_PS_ADDR_MISSING;
    } else if (type == 'three') {      
      error_description = CmplMgmtCnst.GENERIC_LANDMARK_MISSING;
    }else if(type == 'pincode_err'){
      error_description = CmplMgmtCnst.GENERIC_PINCODE_ERR;
    } */
    //
    this.show_param_alert(CmplMgmtCnst.SORRY_MSG, error_description, CmplMgmtCnst.OK_MSG, '')
  }

  //
  public show_timed_toast(msg, time, pos = 'bottom') {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      cssClass: 'timedToastCss',
      position: pos
    });
    toast.present();
  }

  public show_persistent_toast(msg, pos = 'bottom') {
    let toast = this.toastCtrl.create({
      message: msg,
      cssClass: 'timedToastCss',
      position: pos,
      showCloseButton: true
    });
    toast.present();
  }

  public show_param_loader(msg: string) {
    let paramLoader = this.loadingCtrl.create({
      content: msg
    })
    paramLoader.present();
    return paramLoader;
  }

  /**
   * // presents generic alert based on parameters 
   * @param title - Custom string
   * @param msg - Custom string
   * @param ok_btn_str - Default is 'OK'
   * @param css - Default is 'alertFlatCss' | or chooe 'alertDangerCss'
   */
  show_param_alert(title, msg, ok_btn_str: string = 'Ok', css: string = 'alertFlatCss', ifExit: boolean = false) {

    let alertObject = {
      cssClass: css,
      enableBackdropDismiss: false,
      title: title,
      message: msg,
      buttons: [{
        text: ok_btn_str, handler: () => {
          if (ifExit) {
            this.platform.exitApp();
          }
        }
      }]
    }
    let param_alert = this.alertCtrl.create(alertObject);
    param_alert.present();
  }

  //
  public checkEmail(email_str) {
    //
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //
    if (!filter.test(email_str)) {
      return false;
    } else {
      return true
    }
  }  //
}
