import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
//
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//
import { LocalDatabaseProvider } from '../local-database/local-database';
import { UtilityServiceProvider } from '../utility-service/utility-service';
//
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class DataProvider {

  /* private complain_types: any;
  private complain_depts: any; */
  //
  private received_otp: string;
  private user_mobile: string;
  //
  private received_docket: string;
  private userData: any;
  //
  private finalData = {
    "user_mobile": "",
    "user_name": "",
    "user_token": "",
    "compl_flag": "",
    "compl_type": "",
    //"compl_dept": "",
    //"compl_dist": "",
    "compl_block": "",
    "compl_ps": "",
    "compl_address": "",
    "compl_road": "",
    "compl_locality": "",
    "compl_vill_town": "",
    "compl_pincode": null,
    "compl_landmark": "",
    "compl_email": "",
    "compl_description": ""
  }


  constructor(private http: HttpClient, private localDb: LocalDatabaseProvider,
    private evts: Events,
    private transfer: FileTransfer,
    private util: UtilityServiceProvider) {
    //
    console.log('Hello DataProvider Provider');
  }
  //************************************************************************ */

  public get_final_data_obj() {
    return this.finalData;
  }
  public set_final_data_obj(obj) {
    this.finalData = obj;
  }

  //************************************************************************ */

  public set_docket_num(docket: string) {
    this.received_docket = docket;
  }



  //************************************************************************ */
  public request_OTP(data_obj) {
    //
    //
    this.user_mobile = data_obj.mobile_num;
    //
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      loader = this.util.show_param_loader(CmplMgmtCnst.OTP_SENDING);

      //
      let url = CmplMgmtCnst.LOGIN_LOGOUT_OTP_API;
      //
      console.log(data_obj);
      //
      this.http.post(url, data_obj)
        //.timeout(CmplMgmtCnst.TIMEOUT)
        .subscribe(response => {
          loader.dismiss();
          console.log(JSON.stringify(response));
          //
          this.received_otp = response['otp'];
          //
          // show TOAST
          //
          this.util.show_timed_toast(CmplMgmtCnst.OTP_SENT_SUCCESS, 3000, 'middle');
          resolve(CmplMgmtCnst.GENERIC_SUCCESS);
          //
        }, err => {
          //
          loader.dismiss();
          console.log(JSON.stringify(err));
          //
          this.util.show_timed_toast(CmplMgmtCnst.OTP_SENDING_FAILURE, 3000, 'middle');
          resolve(CmplMgmtCnst.GENERIC_FAILURE);
          //
        })
    })// End of Promise
  }

  //************************************************************************ */
  public verify_OTP(data_obj) {
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      //
      loader = this.util.show_param_loader(CmplMgmtCnst.OTP_VERIFICATION_ON);
      //
      let url = CmplMgmtCnst.LOGIN_LOGOUT_OTP_API;
      //
      console.log(data_obj);
      //
      this.http.post(url, data_obj)
        //.timeout(CmplMgmtCnst.TIMEOUT)
        .subscribe(response => {
          loader.dismiss();
          //
          if (response['status'] == "failed") {
            // OTP verification unsuccessful
            this.util.show_timed_toast(CmplMgmtCnst.OTP_VERIFICATION_FAILED, 3000, 'middle');
            resolve(CmplMgmtCnst.GENERIC_FAILURE);
            //
          } else if (response['status'] == "success") {
            //
            this.userData = response['user_data'];
            console.log(response);
            //console.log(this.userData);
            // show TOAST
            //
            this.util.show_timed_toast(CmplMgmtCnst.OTP_VERIFICATION_SUCCESS, 3000, 'middle');
            //
            this.delete_otp_at_backend();
            //
            resolve(CmplMgmtCnst.GENERIC_SUCCESS);

          }

          //
        }, err => {
          //
          loader.dismiss();
          console.log(err);
          //
          this.util.show_timed_toast(CmplMgmtCnst.OTP_VERIFICATION_FAILED, 3000, 'middle');
          resolve(CmplMgmtCnst.GENERIC_FAILURE);
          //
        })
      //
    })// End of Promise
  }
  //************************************************************************ */

  private delete_otp_at_backend() {
    let data_obj = {
      "mobile_num": this.user_mobile,
      "otp": this.received_otp,
      "tag": CmplMgmtCnst.TAG_DELETE_OTP
    }
    let url = CmplMgmtCnst.LOGIN_LOGOUT_OTP_API;
    //
    this.http.post(url, data_obj)
      .subscribe(response => {
        console.log('OTP Delete Success');
        console.log(response);
      }, err => {
        console.log('OTP Delete Failure');
        console.log(err);
      })
  }
  //************************************************************************ */
  public logout_user_from_backend(data_obj) {

    //
    return new Promise((resolve, reject) => {
      //
      let url = CmplMgmtCnst.LOGIN_LOGOUT_OTP_API;
      //
      this.http.post(url, data_obj)
        .subscribe(response => {
          console.log("Logout Success Backend");
          console.log(response);
          resolve(CmplMgmtCnst.GENERIC_SUCCESS);
        }, err => {
          console.log("Logout Err Backend");
          console.log(err);
          resolve(CmplMgmtCnst.GENERIC_FAILURE);
        })
    })


  }

  //************************************************************************ */
  public get_token() {
    return this.userData;
  }

  //************************************************************************ */
  public get_user_data() {
    //return this.userData;
    return new Promise((resolve, reject) => {
      resolve(this.localDb.serve_userdata());
    }) // End of promise
  }
  //************************************************************************ */
  public set_user_data(userDataFromLocalDb:any){
    this.userData = userDataFromLocalDb;
  }
  //************************************************************************ */

  public get_temp_user_data() {
    return this.userData;
  }

  //************************************************************************ */
  public fetch_complain_type_dept_dist(data) {
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      loader = this.util.show_param_loader(CmplMgmtCnst.PLEASE_WAIT);
      //
      let url = CmplMgmtCnst.RETRIEVE_DATA_API;
      //
      console.log(data.token);
      //
      this.http.post(url, data)
        //.timeout(CmplMgmtCnst.HTTP_TIMEOUT)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //          
          //this.complain_types = response['complain_types'];
          // this.complain_depts = response['complain_depts'];
          //         
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
      //
    }) // End of Promise
  }
  //************************************************************************ */

  public fetch_complain_blocks_list(data) {
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      loader = this.util.show_param_loader(CmplMgmtCnst.PLEASE_WAIT);
      //
      let url = CmplMgmtCnst.RETRIEVE_DATA_API;
      //
      this.http.post(url, data)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //                
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
    }) // End of Promise
  }

  //************************************************************************ */

  public fetch_complain_ps_list(data) {

    let loader: any;
    //
    return new Promise((resolve, reject) => {
      //
      loader = this.util.show_param_loader(CmplMgmtCnst.PS_DATA_LOADING);
      //
      let url = CmplMgmtCnst.RETRIEVE_DATA_API;
      //
      this.http.post(url, data)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //                
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
    }) // End of Promise
    //
  }
  //************************************************************************ */
  public submit_complain() {
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      //
      loader = this.util.show_param_loader(CmplMgmtCnst.DATA_SUBMIT_MSG);
      //
      let url = CmplMgmtCnst.COMPLAIN_SUBMIT_API;
      //
      this.http.post(url, this.finalData)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //                
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
    }) // End of Promise
  }

  public upload_image(pic_path: any) {
    let loader: any;
    //
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: this.get_header(this.received_docket)
    }

    //console.log('headers>>  '+JSON.stringify(options.headers));
    //
    loader = this.util.show_param_loader(CmplMgmtCnst.UPLOADING_IMAGE);

    //
    let url = CmplMgmtCnst.PIC_SUBMIT_API;

    const fileTransfer: FileTransferObject = this.transfer.create();
    //
    //console.log('Options obj-Strigified:  '+JSON.stringify(options));
    //console.log('--------------------------------------------------');
    //
    fileTransfer.upload(pic_path, url, options).then(data => {
      //
      console.log('returned data   ' + JSON.stringify(data));
      //
      console.log('rsp code   ' + data['responseCode']);
      //

      //console.log('--------------------------------------------------');
      loader.dismiss();
      //
      this.evts.publish(CmplMgmtCnst.IMG_UPLOAD_RESPONSE, data);
    })

  }

  //************************************************************************ */
  /* public serve_complain_types() {
    return this.complain_types
  } */

  //************************************************************************ */
  /* public serve_complain_depts() {
    return this.complain_depts;
  } */

  //************************************************************************ */


  private get_header(ref): HttpHeaders {
    //
    //let hash = this.localDb.serve_loginhash();
    const requestHeaders = new HttpHeaders().set('compl_ref', ref);
    requestHeaders.append('Content-Type', 'application/json');
    //
    return requestHeaders;
  }
  //************************************************************************ */

  public fetch_complain_status_list(post_data) {
    let loader: any;
    //
    return new Promise((resolve, reject) => {
      //
      loader = this.util.show_param_loader(CmplMgmtCnst.PLEASE_WAIT);
      //
      
      let url = CmplMgmtCnst.COMPLAIN_STATUS_API;
      //
      this.http.post(url, post_data)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //                
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
    }) // End of Promise
  }

  public fetch_info_details(){
    let loader: any;
    //
    let post_data = {
      "tag": CmplMgmtCnst.TAG_CONTACT,
      "token": this.userData['token']
    }
    console.log(post_data);
    return new Promise((resolve, reject) => {
      //
      loader = this.util.show_param_loader(CmplMgmtCnst.PLEASE_WAIT);
      //
      
      let url = CmplMgmtCnst.INFO_API;
      //
      this.http.post(url, post_data)
        .subscribe(response => {
          console.log(response);
          loader.dismiss();
          //                
          resolve(response);
        }, err => {
          console.log('Error:   ' + JSON.stringify(err));
          loader.dismiss();
        })
    }) // End of Promise
  }
}
