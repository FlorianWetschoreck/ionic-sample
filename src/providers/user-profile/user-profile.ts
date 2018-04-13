import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as APPConfig from "../../app/config";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class UserProfileProvider {
  constructor(public http: HttpClient, private authProvider: AuthProvider) {}

  updateUserAvatar(userThumbnail: string) {
    let apiUser = {
      Token: this.authProvider.loggedUser.Token,
      Thumbnail: userThumbnail
    };

    return this.http
      .post(
        `${APPConfig.cfg.apiUrl}${APPConfig.cfg.user_profile.updateUserAvatar}`,
        apiUser
      )
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  getUserProfile() {
    return this.http
      .get(
        `${APPConfig.cfg.apiUrl}${APPConfig.cfg.user_profile.getUserProfile}?token=${this.authProvider.loggedUser.Token}`
      )
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  updateUserProfile(userProfile){
    return this.http
    .post(
      `${APPConfig.cfg.apiUrl}${APPConfig.cfg.user_profile.updateUserProfile}`,
      userProfile
    )
    .toPromise()
    .catch(err => {
      return err;
    });
  }
}