import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage, IonicStorageModule } from '@ionic/storage';

/***********************/
//Pages
/***********************/
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalJobrolePage } from '../pages/modal-jobrole/modal-jobrole';
import { ModalNotificationPage } from '../pages/modal-notification/modal-notification';
import { PasswordRecoveryPage } from '../pages/password-recovery/password-recovery';
import { CurriculumPage } from '../pages/curriculum/curriculum';
import { TabsPage } from '../pages/tabs/tabs';

/***********************/
//Components
/***********************/
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { HeaderCommomComponent } from '../components/header-commom/header-commom';
import { FooterCommomComponent } from '../components/footer-commom/footer-commom';
import { NotificationsComponent } from '../components/notifications/notifications';
import { CurriculumsComponent } from '../components/curriculums/curriculums';

/***********************/
//Providers
/***********************/
import { TodosProvider } from '../providers/todos/todos';
import { AuthProvider } from '../providers/auth/auth';
import { FooterProvider } from '../providers/footer/footer';
import { CurriculumProvider } from '../providers/curriculum/curriculum';

let storage = new Storage({});

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT',
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalJobrolePage,
    ModalNotificationPage,
    PasswordRecoveryPage,
    HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumPage,
    CurriculumsComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'cloudo'
      // ,
      // driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalJobrolePage,
    ModalNotificationPage,
    PasswordRecoveryPage,
    HeaderMenuComponent,
    HeaderCommomComponent,
    FooterCommomComponent,
    NotificationsComponent,
    CurriculumPage,
    CurriculumsComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    TodosProvider,
    AuthProvider,
    FooterProvider,
    CurriculumProvider
  ]
})
export class AppModule { }
