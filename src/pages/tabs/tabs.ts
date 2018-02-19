import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CurriculumPage } from '../curriculum/curriculum';
import { Events } from 'ionic-angular';
import { AgendaComponent } from '../../components/agenda/agenda';
import { LibraryComponent } from '../../components/library/library';
import { MediaComponent } from '../../components/media/media';
import { DashboardComponent } from '../../components/dashboard/dashboard';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CurriculumPage;
  tab3Root: any = AgendaComponent;
  tab4Root: any = LibraryComponent;
  tab5Root: any = MediaComponent;

  constructor(public appCtrl : App, public events: Events) {

  }

  resetHeader(){
    
    // this.events.publish('hideHeader', { isHidden: false });
  }
}
