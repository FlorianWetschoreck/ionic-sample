import { NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";

export class ProtectedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {}

  ionViewDidLoad() {}

  ionViewCanEnter() {
    this.storage.get("currentUser").then(user => {
      if (!user) {
        this.navCtrl.setRoot("AuthPage");
        return false;
      }
    });

    return true;
  }
}
