import { Component } from '@angular/core';
import { /* NavController, */ NavParams, ViewController, ActionSheetController, Events, AlertController } from 'ionic-angular';
//
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';
//
import { PicServiceProvider } from '../../providers/pic-service/pic-service';
//import { DataProvider } from '../../providers/data/data';




@Component({
  selector: 'page-docket-modal',
  templateUrl: 'docket-modal.html',
})
export class DocketModalPage {

  paramData: any;
  hideSuccess: boolean;
  //
  modalHeader: string;

  constructor(/* private navCtrl: NavController, */
    private picService: PicServiceProvider,
    private evts: Events,
    private alertCtrl: AlertController,
    /* private dataProvider: DataProvider, */
    private actionSheetCtrl: ActionSheetController,
    private viewCtrl: ViewController,
    private navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.paramData = this.navParams.data;
    console.log(this.paramData);
    //
    if (this.paramData.type == 'success') {
      this.hideSuccess = false;
      this.modalHeader = CmplMgmtCnst.THANKS;
    } else {
      this.hideSuccess = true;
      this.modalHeader = CmplMgmtCnst.SORRY_MSG;
    }
  }
  //
  ionViewDidLoad() {
    console.log('ionViewDidLoad DocketModalPage');
    // subscribe event
    this.evts.subscribe(CmplMgmtCnst.IMG_UPLOAD_RESPONSE, (resp_data) => {
      //
      //if (resp_data['message'] == 'success') {
      if (resp_data['responseCode'] == '200') {
        //
        this.open_alert_window(CmplMgmtCnst.THANKS, CmplMgmtCnst.IMG_UPLOAD_SUCCESS);
        //
        //} else if (resp_data['message'] == 'file_size_exceeded') {
      } else if (resp_data['responseCode'] == '1000') {
        //
        this.open_alert_window(CmplMgmtCnst.SORRY_MSG, CmplMgmtCnst.IMG_SIZE_EXCEEDED, false);
        //
      } else {
        //
        this.open_alert_window(CmplMgmtCnst.SORRY_MSG, CmplMgmtCnst.IMG_UPLOAD_ERROR, false);
        //
      }
      //console.log('upload success evt listened');
    })
  }
  ionViewDidLeave() {
    // unsubscribe event
    this.evts.unsubscribe(CmplMgmtCnst.IMG_UPLOAD_RESPONSE);
    //console.log('evt unsubscribed');
  }
  //
  open_action_sheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: CmplMgmtCnst.SELECT_PICTURE_SOURCE,
      enableBackdropDismiss: false,
      //cssClass: 'action-sheets-groups',
      buttons: [
        {
          text: CmplMgmtCnst.WHEN_CAM,
          //role: 'destructive',
          cssClass: 'camIcon',
          icon: 'md-camera',
          handler: () => {
            console.log('chosen CAMERA');
            this.picService.pickup_image(CmplMgmtCnst.IMAGE_SOURCE_CAMERA);
          }
        }, {
          text: CmplMgmtCnst.WHEN_ALBUM,
          cssClass: 'galleryIcon',
          icon: 'md-images',
          handler: () => {
            console.log('chosen Library');
            this.picService.pickup_image(CmplMgmtCnst.IMAGE_SOURCE_ALBUM);
          }
        }, {
          text: CmplMgmtCnst.DISCARD,
          icon: 'md-close-circle',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
            //this.dismiss_modal();
            //            
          }
        }
      ]
    });
    actionSheet.present();
  }

  dismiss_modal() {
    this.viewCtrl.dismiss();
  }

  open_alert_window(title: string, msg: string, ifDismiss: boolean = true) {
    let alertObject = {

      enableBackdropDismiss: false,
      title: title,
      message: msg,
      buttons: [{
        text: CmplMgmtCnst.OK_MSG, handler: () => {
          if (ifDismiss) {
            this.dismiss_modal();
          } else if (!ifDismiss) {
            // do nothing .. stay here .. so user can upload again
          }

        }
      }]
    }
    let param_alert = this.alertCtrl.create(alertObject);
    param_alert.present();
  }


}
