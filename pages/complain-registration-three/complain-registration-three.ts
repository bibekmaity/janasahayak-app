import { Component } from '@angular/core';
import { NavController, /*NavParams  AlertController,*/ Events, ModalController } from 'ionic-angular';
//
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service'
import { DataProvider } from '../../providers/data/data';
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
//
import { DocketModalPage } from '../docket-modal/docket-modal';

import {TabsPage} from '../tabs/tabs';


@Component({
  selector: 'page-complain-registration-three',
  templateUrl: 'complain-registration-three.html',
})
export class ComplainRegistrationThreePage {

  //private final_data: any;
  //
  compl_landmark: string = '';
  compl_email: string = '';
  compl_description: string = '';
  //
  page_header: string;
  header_color: string;
  //

  private tab:any;

  constructor(/*  public navParams: NavParams */
    private evts: Events,
    private modalCtrl: ModalController,
    private localDb: LocalDatabaseProvider,
    private navCtrl: NavController,
    /* private alertCtrl: AlertController, */
    private util: UtilityServiceProvider,
    private dataProvider: DataProvider) {
      //
      this.tab = this.navCtrl.parent;
      
  }

  ionViewWillLoad() {
    this.page_header = this.localDb.serve_submission_type();
    this.header_color = this.localDb.serve_header_color();
    //    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainRegistrationThreePage');
    console.log(this.tab);
  }

  onDataSubmitThree() {
    if (this.compl_email != '') {
      if (!this.util.checkEmail(this.compl_email)) {
        this.util.show_param_alert(CmplMgmtCnst.SORRY_MSG, CmplMgmtCnst.EMAIL_FORMAT_ERR, CmplMgmtCnst.OK_MSG);
        return;
      }
    }
    //

    if (this.compl_landmark != '') {
      //
      let obj = this.dataProvider.get_final_data_obj();
      obj.compl_landmark = this.compl_landmark;
      obj.compl_email = this.compl_email;
      obj.compl_description = this.compl_description;
      //
      this.dataProvider.set_final_data_obj(obj);
      //
      this.upload_complain_data();
      //this.testModal();

    } else {
      this.util.show_generic_input_error(CmplMgmtCnst.GENERIC_LANDMARK_MISSING);
    }
  }

  private upload_complain_data() {
    this.dataProvider.submit_complain().then(resp => {
      //
      let navData = {
        'msg': '',
        'type': '',
        'docket': ''
      }
      //
      console.log(resp);
      //
      if (resp['message'] == 'success') {
        navData.type = resp['message'];
        navData.msg = CmplMgmtCnst.MODAL_SUCCESS_MSG;
        navData.docket = resp['compl_ref'];
        //
        this.dataProvider.set_docket_num(navData.docket);  // as docket is received - store for pic upload
        //
      } else if (resp['message'] == 'invalid_token') {
        navData.type = resp['message'];
        navData.msg = CmplMgmtCnst.MODAL_FAILURE_MSG;
      } else {
        // unknown error
        navData.type = resp['message'];
        navData.msg = CmplMgmtCnst.MODAL_FAILURE_MSG;
      }
      //
      this.open_modal_page(navData);
      //
    })

    //
  }
  //
  open_modal_page(navParamData) {
    /*
    Data can be passed to a new modal through Modal.create() as the second argument. 
    The data can then be accessed from the opened page by injecting NavParams. 
    Note that the page, which opened as a modal, has no special "modal" logic within it, 
    but uses NavParams no differently than a standard page.
    */
    const modal = this.modalCtrl.create(DocketModalPage, navParamData);
    //
    modal.onDidDismiss(() => {
      this.evts.publish(CmplMgmtCnst.SUBMISSION_END);
      //this.navCtrl.popToRoot();
      //this.tab.select(1);
      this.navCtrl.setRoot(TabsPage).then(()=>{
        this.tab.select(1);
      })
    });
    //
    modal.present();
  }

  //
  onDiscardThree() {
    this.compl_description = this.compl_email = this.compl_landmark = '';
  }
  //


  /* testModal() {
    let navData = {
      'type': 'invalid_token',
      //'msg': CmplMgmtCnst.MODAL_SUCCESS_MSG,
      'msg': CmplMgmtCnst.MODAL_FAILURE_MSG,
      'docket': 'D00007'
    }
    //
    
    //
    this.open_modal_page(navData);
  } */
}
