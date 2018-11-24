import { Component } from '@angular/core';
import { NavController, /*NavParams */ } from 'ionic-angular';
//
import { UtilityServiceProvider } from '../../providers/utility-service/utility-service'
import { DataProvider } from '../../providers/data/data';
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';
//
import { ComplainRegistrationThreePage } from '../complain-registration-three/complain-registration-three';
//@IonicPage()
@Component({
  selector: 'page-complain-registration-two',
  templateUrl: 'complain-registration-two.html',
})
export class ComplainRegistrationTwoPage {

  private final_data: any;
  //
  complain_types_block_arr: any = [];
  complain_types_ps_arr: any = [];
  //
  compl_block: any = '';
  compl_ps: any = '';
  compl_address: string = '';
  //
  compl_road: string = '';
  compl_locality: string = '';
  compl_vill_town: string = '';
  compl_pincode: number = null;
  //
  private ifDiscarded: boolean = false;
  //
  page_header: string;
  header_color:string;


  constructor(public navCtrl: NavController, /*public navParams: NavParams */
    private localDb: LocalDatabaseProvider,
    private util: UtilityServiceProvider,
    private dataProvider: DataProvider) {
  }

  ionViewWillLoad() {
    this.page_header = this.localDb.serve_submission_type();
    this.header_color = this.localDb.serve_header_color();
    //
    //console.log(this.page_header);
    //
    this.final_data = this.dataProvider.get_final_data_obj();
    //
    let data = {
      "tag": CmplMgmtCnst.TAG_BLOCK,
      "token": this.final_data.user_token
    }
    this.dataProvider.fetch_complain_blocks_list(data).then(response => {
      this.complain_types_block_arr = response['complain_blocks'];
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplainRegistration Two Page');
    console.log(this.final_data);
  }
  onBlockSelect(compl_block) {
    //
    console.log(compl_block);
    this.compl_ps = '';
    //
    let data = {
      "tag": CmplMgmtCnst.TAG_PS,
      "block_id": compl_block,
      "token": this.final_data.user_token
    }
    //
    if (!this.ifDiscarded) {
      // upon deliberate discard PS List is not required
      this.dataProvider.fetch_complain_ps_list(data).then(resp => {
        this.complain_types_ps_arr = resp['complain_ps'];
        //
      })
    }

    //
  }
  //
  
  //
  onDataSubmitTwo() {
    let all_ok: boolean = false;
    let pincode_ok: boolean = false;

    if (this.compl_block != '' && this.compl_ps != '' && this.compl_address != '') {
      all_ok = true;
    } else {
      this.util.show_generic_input_error(CmplMgmtCnst.GENERIC_BLOCK_PS_ADDR_MISSING);
      return;
    }

    // check PINCODE
    let pincode = this.compl_pincode;
    let pincode_len = String(pincode).length;
    //
    /* console.log(pincode);
    console.log(pincode_len); */
    //
    if (pincode_len == 0 || pincode_len == 6  || pincode == null) {
      pincode_ok = true;
    } else {
      pincode_ok = false;
      //
      this.util.show_generic_input_error(CmplMgmtCnst.GENERIC_PINCODE_ERR);
      return;
    }


    /* if (pincode != null) {
      if (pincode_len != 6) {

      } else {
        pincode_ok = true;
      }
    } else if (pincode == null) {
      pincode_ok = true;
    } */
    //
    //
    if (all_ok == true && pincode_ok == true) {
      //
      console.log('all-found step 2');
      //
      let obj = this.dataProvider.get_final_data_obj();
      obj.compl_block = this.compl_block;
      obj.compl_ps = this.compl_ps;
      obj.compl_address = this.compl_address;
      //
      obj.compl_road = this.compl_road;
      obj.compl_locality = this.compl_locality;
      obj.compl_vill_town = this.compl_vill_town;
      obj.compl_pincode = this.compl_pincode;
      //
      this.dataProvider.set_final_data_obj(obj);
      //
      //obj = this.dataProvider.get_final_data_obj();
      //console.log(obj);
      this.navCtrl.push(ComplainRegistrationThreePage);

    }
  }
  //
  onDiscardTwo() {
    this.ifDiscarded = true;
    this.compl_block = this.compl_address = this.compl_ps = '';
    this.compl_road = this.compl_vill_town = this.compl_locality = this.compl_address = '';
    //
    setTimeout(() => {
      this.ifDiscarded = false;
    }, 2000);
  }
  //
}
