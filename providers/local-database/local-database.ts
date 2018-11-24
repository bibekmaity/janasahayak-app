//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//
import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';
// Native plugins
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalDatabaseProvider {

  private loginhash: string = null;
  private userData: any = null;
  //
  private submission_type:string; // either COMPLAIN or SUGGESTION
  private headerColor:string;

  constructor(private localDB: Storage) {
    console.log('Hello LocalDatabaseProvider Provider');
  }

  //
  public set_submission_type(type:string){
    this.submission_type = type;
    //
    if(type == CmplMgmtCnst.SUBMIT_COMPLAIN){
      this.headerColor = 'danger';
    }else if(type == CmplMgmtCnst.SUBMIT_SUGGESTION){
      this.headerColor = 'darkGreen';
    }
  }
  public serve_submission_type():string{
    return this.submission_type;
  }
  public serve_header_color():string{
    return this.headerColor;
  }

  //
  public set_user_loginhash(data) {    
    // 
    return new Promise((resolve, reject) => {
      //
      this.localDB.ready().then(() => {
        this.localDB.set(CmplMgmtCnst.LOGINHASH, data).then(data => {
          console.log(data);
          this.userData = data;
          resolve(CmplMgmtCnst.GENERIC_SUCCESS);
        })
      })
      //
    })

  }

  public serve_loginhash() {
    return this.loginhash;
  }
  public serve_userdata() {
    return this.userData;
  }



  public retrieve_loginhash_from_db() {
    return new Promise((resolve, reject) => {
      //
      this.localDB.ready().then(() => {
        // 
        let hasUser: boolean = false;

        //
        this.localDB.get(CmplMgmtCnst.LOGINHASH).then((data) => {

          if (data != null) {
            console.log(data);
            this.userData = data;
            this.loginhash = data['token'];
            hasUser = true;
          }

          resolve(hasUser);
        })
      })
      //
    })// End of Promise

  }

  log_out_user() {
    return new Promise((resolve, reject) => {
      //
      this.localDB.remove(CmplMgmtCnst.LOGINHASH).then(() => {
        resolve(CmplMgmtCnst.USER_LOGOUT);
      })
      //
    }) // End of Promise

  }

}
