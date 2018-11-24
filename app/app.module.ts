import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

/* import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home'; */
import {LandingPage} from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { ComplainRegistrationPage } from '../pages/complain-registration/complain-registration';
import { ComplainRegistrationTwoPage } from '../pages/complain-registration-two/complain-registration-two';
import { ComplainRegistrationThreePage } from '../pages/complain-registration-three/complain-registration-three';
//
import { DocketModalPage } from '../pages/docket-modal/docket-modal';
//
import { ComplainStatusPage } from '../pages/complain-status/complain-status';
import { OtherInfoPage } from '../pages/other-info/other-info';
import {OtherInfoDetailsPage} from '../pages/other-info-details/other-info-details';
//
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDatabaseProvider } from '../providers/local-database/local-database';
import { UtilityServiceProvider } from '../providers/utility-service/utility-service';
import { DataProvider } from '../providers/data/data';

// Custom Component
import { ElasticTextArea } from '../components/elastic-text-area/elastic-text-area';
import { PicServiceProvider } from '../providers/pic-service/pic-service';
//
enableProdMode();

//
export class NetworkMock extends Network {
  //private typeArr = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'cellular', 'none'];
  test_network_type = 'wifi';  //'ethernet';
  public get type() {
    //console.log('if online:  '+navigator.onLine);
    return this.test_network_type;
  }
}

//
@NgModule({
  declarations: [
    ElasticTextArea,
    MyApp,
    LandingPage,
    LoginPage,
    ComplainRegistrationPage,
    ComplainRegistrationTwoPage,
    ComplainRegistrationThreePage,
    DocketModalPage,
    ComplainStatusPage,
    OtherInfoPage,
    OtherInfoDetailsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'complnMgmt_dev',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    LoginPage,
    ComplainRegistrationPage,
    ComplainRegistrationTwoPage,
    ComplainRegistrationThreePage,
    DocketModalPage,
    ComplainStatusPage,
    OtherInfoPage,
    OtherInfoDetailsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    FileTransfer,
    //---------------------------------------//
    Network,
    //{ provide: Network, useClass: NetworkMock },
    //---------------------------------------//
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocalDatabaseProvider,
    UtilityServiceProvider,
    DataProvider,
    PicServiceProvider
  ]
})
export class AppModule { }
