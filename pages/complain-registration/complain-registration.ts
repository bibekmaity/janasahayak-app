import { Component } from '@angular/core';
import { NavController/* , NavParams */, Events, /* ModalController */ } from 'ionic-angular';

//
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service'
import { DataProvider } from '../../providers/data/data';
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
//
import { ComplainRegistrationTwoPage } from '../complain-registration-two/complain-registration-two';

//
//import { DocketModalPage } from '../docket-modal/docket-modal';

@Component({
  selector: 'page-complain-registration',
  templateUrl: 'complain-registration.html',
})
export class ComplainRegistrationPage {

  userData: any = {
    "user": "",
    "mobile_num": "",
    "token": ""
  }


  /* complain_depts_arr: any = [];
  compalin_dist_arr: any = []; */
  /* compl_dept: any = '';
  compl_dist: any = ''; */
  //
  default_header: string = '';
  header_color:string = 'darkBlue';     // default teal // toggle between darkGreen - danger
  //
  complain_types_arr: any = [];
  //
  compl_type: any = '';
  compl_flag: string = '';
  //
  hide_complain: boolean = true;



  constructor(private navCtrl: NavController,
    /* private modalCtrl: ModalController, */
    /*private navParams: NavParams, */
    private evt: Events,
    private localDb: LocalDatabaseProvider,
    private util: UtilityServiceProvider,
    private dataProvider: DataProvider) {
  }

  ionViewWillLoad() {
    this.default_header = CmplMgmtCnst.DEFAULT_HEADER;
    //this.header_color = 'teal';
    //
    this.dataProvider.get_user_data().then(data => {
      //
      //console.log(data);
      this.userData.user = data['user_name'];
      this.userData.mobile_num = data['mobile_num'];
      this.userData.token = data['token'];
      //
      let compl_data = {
        "tag": CmplMgmtCnst.TAG_COMPL_TYPE_DEPT_DIST,
        "token": this.userData.token //+ 'gg77095'
      }
      this.dataProvider.fetch_complain_type_dept_dist(compl_data).then(resp => {
        //
        this.complain_types_arr = resp['complain_types'];
        //this.complain_depts_arr = resp['complain_depts'];
        //this.compalin_dist_arr = resp['complain_dist']
        //
      })
      //
    })
    //

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainRegistrationPage');
    //
    this.evt.subscribe(CmplMgmtCnst.SUBMISSION_END, () => {
      this.compl_type = this.compl_flag = '';
      this.hide_complain = true;
      this.default_header = CmplMgmtCnst.DEFAULT_HEADER;
      this.header_color = 'darkBlue';
    })
  }

  determineTypeSubmission() {
    if (this.compl_flag == 'c') {
      this.default_header = CmplMgmtCnst.SUBMIT_COMPLAIN;
      this.header_color = 'danger';
      this.hide_complain = false; // so that the field becomes visible
    } else if (this.compl_flag == 's') {
      this.hide_complain = true;
      this.header_color = 'darkGreen';
      this.default_header = CmplMgmtCnst.SUBMIT_SUGGESTION;
    }
    this.localDb.set_submission_type(this.default_header);
    //console.log()
  }

  onDataSubmitOne() {
    let obj = this.dataProvider.get_final_data_obj();
    //
    let what_to_do: boolean = false;
    let all_ok: boolean = false;
    //
    if (this.compl_flag == '') {
      this.util.show_generic_input_error(CmplMgmtCnst.GENERIC_WHAT_TO_DO_MISSING);
      return;
    } else if (this.compl_flag == 's' || this.compl_flag == 'c') {
      what_to_do = true;
    }
    //
    // first check what kind of data user wants to upload -- COMPLAIN or SUGGESTION

    if (this.compl_flag == 's') {
      // here this.compl_type is not MANDATORY -- 
      /* if (this.compl_dept != '') {
        all_ok = true;
      } */
      all_ok = true;
      //
    } else if (this.compl_flag == 'c') {
      // here this.compl_type IS  MANDATORY -- 
      if (this.compl_type != '') {
        all_ok = true;
      }
    }
    //

    if (all_ok == true && what_to_do == true) {
      //
      obj.user_mobile = this.userData.mobile_num;
      obj.user_name = this.userData.user;
      obj.compl_flag = this.compl_flag;
      obj.user_token = this.userData.token;
      obj.compl_type = this.compl_type;
      /* obj.compl_dept = this.compl_dept;
      obj.compl_dist = this.compl_dist; */
      //
      this.dataProvider.set_final_data_obj(obj);
      //
      //this.compl_type = this.compl_dept = this.compl_dist = '';
      this.compl_type = '';
      //
      this.navCtrl.push(ComplainRegistrationTwoPage);

    } else {
      this.util.show_generic_input_error(CmplMgmtCnst.GENERIC_COMPLAIN_TYPE_MISSING);
    }



  }
  //
  onDiscardOne() {
    //this.compl_type = this.compl_dept = this.compl_dist = '';
    this.compl_type = this.compl_flag = '';
    this.hide_complain = true;
    this.default_header = CmplMgmtCnst.DEFAULT_HEADER;
    this.header_color = 'darkBlue';
  }
  //

  

}
