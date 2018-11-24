/* import { HttpClient } from '@angular/common/http'; */
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
//import { File } from '@ionic-native/file';

//
//import { CmplMgmtCnst } from '../../app/CmplMgmtCnst';

import {DataProvider} from '../data/data'
 

@Injectable()
export class PicServiceProvider {

  private picSourceType: number;

  constructor(/* public http: HttpClient, */
    private dataProvider:DataProvider,
    private platform: Platform, private camera: Camera,
    private filePath: FilePath/* , private file: File, */ ) {
    //
    console.log('Hello PicServiceProvider Provider');
  }


  public pickup_image(sourceType: string) {
    this.picSourceType = this.camera.PictureSourceType[sourceType];
    //
    this.use_camera_plugin();
  }

  private use_camera_plugin() {
    let camera_options: CameraOptions = {
      quality: 90,
      sourceType: this.picSourceType,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    }
    //
    this.camera.getPicture(camera_options).then((image_path) => {
      console.log('image_path is: '+image_path);
      let file_path: any;
      //
      // For android :
      if (this.platform.is('android') && camera_options.sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {
        // if the image is picked from PhotoLibrary - we need to resolve the file path to use the iamge        
        this.filePath.resolveNativePath(image_path).then((resolved_file_path) => {
          //
          //alert(image_path+'   <>   '+resolved_file_path);
          //this.resize_captured_image(resolved_file_path);
          file_path = resolved_file_path;
          //
          this.dataProvider.upload_image(file_path);
        })
      } else {
        //
        //this.resize_captured_image(image_path);
        //alert('on iOS');
        file_path = image_path;
        this.dataProvider.upload_image(file_path);
      }

      
      //
    }).catch((err) => {
      //console.log('err block');
      //this.utilProvider.show_timed_toast('Error capturing image', 1500, 'middle');
      //console.log(err);

    }) // End of catch

  }


  /* public capture_image_with_camera() {
    //
    //this._sourceType = this.camera.PictureSourceType.CAMERA;
    //
    this.use_camera_plugin();

  }

  public capture_image_from_album() {
    //
    //this._sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    //
    this.use_camera_plugin();
  } */


}
