import { Component, ViewChild } from "@angular/core";
import { IonicPage,NavController, NavParams, ToastController, MenuController, Events, Nav, Toast } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import { PasswordRecoveryPage } from "../password-recovery/password-recovery";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";
import { LoadingProvider } from "../../providers/loading/loading";
import { Response } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { APIStatus } from "../../app/config";

@IonicPage()
@Component({
  selector: "page-auth",
  templateUrl: "auth.html"
})
export class AuthPage {
  username: any = { value: "email" };
  password: any = { value: "password" };
  minlength: any = { value: "8" };
  maxlength: any = { value: "30" };

  authForm: FormGroup;
  userProfile = {};
  toastMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authProvider: AuthProvider,
    public menu: MenuController,
    public events: Events,
    private toastCtrl: ToastController,
    private loadingProvider: LoadingProvider,
    private translate: TranslateService
  ) {
    this.menu.enable(false);

    this.navCtrl = navCtrl;

    this.toastMessage = navParams.get("message");

    this.authForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      devideToken: "uiashdfiuahs79dfasdyf8asbdfugas0dfajs8",
      device: "android"
    });

    this.events.publish("hideHeader", { isHidden: true });
  }

  redirectToHome() {
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.loadingProvider.presentLoadingDefault();
      this.authProvider
        .getAuthenticate(this.authForm.value)
        .then(() => {
          return this.loadingProvider.loading.dismiss().then(res => {
            this.redirectToHome();
          });
        })
        .catch((err: Response) => {
          return this.loadingProvider.loading.dismiss().then(() => {
            console.error(err);
            let errMsg = err.json();

            this.translate.get("ApiStatus." + errMsg).subscribe(value => {
              if (value) {
                this.presentToast(value);
                console.log("found: " + value);
              } else console.log("not found: " + value);
            });
          });
        });
    }
  }

  presentToast(text: string): Promise<any> {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom"
    });

    return toast.present();
  }

  translateMessage() {
    return this.translate.get("ApiStatus." + this.toastMessage).toPromise();
  }

  ionViewDidLoad() {
    if (this.toastMessage) {
      this.translateMessage().then(translated => {
        if (translated) this.presentToast(translated);
        else console.log("not found: " + translated);
      });
    }
    this.events.publish("hideHeader", { isHidden: true });
  }

  goToPasswordRecovery() {
    this.navCtrl.push(PasswordRecoveryPage);
  }
}
