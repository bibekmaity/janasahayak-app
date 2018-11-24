import { Component } from '@angular/core';

/* import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
 */
import {ComplainRegistrationPage} from '../complain-registration/complain-registration';
import {ComplainStatusPage} from '../complain-status/complain-status';
import {OtherInfoPage} from '../other-info/other-info';
//
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ComplainRegistrationPage;
  tab2Root = ComplainStatusPage;
  tab3Root = OtherInfoPage;

  constructor() {

  }
}
