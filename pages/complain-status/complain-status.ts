import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CmplMgmtCnst} from '../../app/CmplMgmtCnst';
//
import { DataProvider } from '../../providers/data/data';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';

@IonicPage()
@Component({
  selector: 'page-complain-status',
  templateUrl: 'complain-status.html',
})
export class ComplainStatusPage {

  reports_arr = [];

  //
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private localDb: LocalDatabaseProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ComplainStatusPage');
  }

  ionViewWillEnter(){
    console.log('ion view will load');
    //
    let submit_data = {
      "tag": CmplMgmtCnst.TAG_STATUS,
      "mobile_no": this.localDb.serve_userdata()['mobile_num'],
      "token": this.localDb.serve_userdata()['token']
    }
    //
    console.log(submit_data);
    //
    this.dataProvider.fetch_complain_status_list(submit_data).then(resp =>{
      //this.reports_arr = resp as Array<any>;
      if(resp['complain_rpt'].length > 0){
        this.reports_arr = resp['complain_rpt'];
      }
    });
  }
  //
  ionViewDidLeave(){
    console.log('ion view did leave');
    this.reports_arr = [];
  }
}
