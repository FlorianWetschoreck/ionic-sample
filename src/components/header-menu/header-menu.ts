import { Component, ViewChild, OnInit } from "@angular/core";
import { App, Nav, MenuController, Events } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "header-menu",
  templateUrl: "header-menu.html"
})
export class HeaderMenuComponent implements OnInit {
  @ViewChild(Nav) nav: Nav;
  currentUser: any;

  pages: Array<{ title: string; component: any; method?: any; icon?: any }>;

  constructor(
    private authProvider: AuthProvider,
    private app: App,
    private menuCtrl: MenuController,
    private events: Events,
    private camera: Camera
  ) {
    this.pages = [
      {
        title: "MenuProfile.Profile",
        component: "UserProfilePage",
        icon: "md-person"
      },
      {
        title: "MenuProfile.ChangePassword",
        component: "ChangePasswordPage",
        icon: "md-lock"
      },
      {
        title: "MenuProfile.Logoff",
        component: "AuthPage",
        method: "logout",
        icon: "md-log-out"
      }
    ];

    this.events.subscribe("currentUser", user => {
      if (user) this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authProvider.getLoggedUser().then(res => {
      if (res) {
        this.currentUser = res;
        //console.log("getCurrentUser: " + this.currentUser);
      }
    });
  }

  openPage(page) {
    this.menuCtrl.close();
    if (page.method && page.method === "logout") {
      this.authProvider.logout();
    } else {
      var nav = this.app.getRootNav();
      nav.push(page.component);
    }
  }
}
