import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { LoadingProvider } from "../../providers/loading/loading";
import { LogisticProvider } from "../../providers/logistic/logistic";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastProvider } from "../../providers/toast/toast";
import * as AppConfig from "../../app/config";

export class MonetarySymbol {
  Currency: string;
  ID: number;
}

@Component({
  selector: "page-modal-logistic",
  templateUrl: "modal-logistic.html"
})
export class ModalLogisticPage {
  classAPI: any;
  logistic: any;
  fileURI: any;
  imageFileName: any;
  logisticTypes: any;
  logisticItems: any;
  currentCulture: string;

  monetarySymbol: MonetarySymbol[] = [
    { Currency: "NONE", ID: 1 },
    { Currency: "USD", ID: 2 },
    { Currency: "EUR", ID: 3 },
    { Currency: "BRL", ID: 4 },
    { Currency: "JPY", ID: 5 },
    { Currency: "TWD", ID: 6 }
  ];

  constructor(
    private navCtrl: NavController,
    private navParam: NavParams,
    private transfer: FileTransfer,
    private toastProvider: ToastProvider,
    private fileChooser: FileChooser,
    private loadingProvider: LoadingProvider,
    private logisticProvider: LogisticProvider,
    private authProvider : AuthProvider
  ) {
    this.logistic = this.navParam.get("logistic");
    this.classAPI = this.navParam.get("class");
    this.currentCulture = this.authProvider.loggedUser.Language.Culture;
    this.loadingProvider.presentLoadingDefault();
    
    this.loadLogisticTypes();
    this.loadLogisticItems(this.logistic.Type.ID);
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  getDocument() {
    this.fileChooser
      .open()
      .then(uri => {
        this.fileURI = uri;
      })
      .catch(err => {
        console.log(err);
        this.toastProvider.presentTranslatedToast("ErrorMessage");
      });
  }

  loadLogisticTypes() {
    this.logisticProvider
      .getLogisticTypes()
      .then(types => {
        this.loadingProvider.dismissLoading();
        this.logisticTypes = types;
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
      });
  }

  ionChangeLogType(logType) {
    this.loadLogisticItems(logType);
  }

  loadLogisticItems(type) {
    this.logisticProvider
      .getLogisticItems(type)
      .then(response => {
        this.loadingProvider.dismissLoading();
        this.logisticItems = response;
      })
      .catch(err => {
        this.loadingProvider.dismissLoading();
        console.log(err);
      });
  }

  uploadFile() {
    this.loadingProvider.presentLoadingDefault();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "receiptLogistic",
      params: { ID_LogisticItemXClass: this.logistic.ID, token: this.authProvider.loggedUser.Token }
    };
    debugger;
    fileTransfer
      .upload(this.fileURI, `${AppConfig.cfg.apiUrl}${AppConfig.cfg.logistic.postFile}`, options)
      .then(obj => {
          this.loadingProvider.dismissLoading();
          if(obj){
              this.logistic.Files = obj;
              this.toastProvider.presentTranslatedToast("SuccessReceiptUpload");
              console.log(obj.response + " Uploaded Successfully");
          }
          //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
        },
        err => {
          this.loadingProvider.dismissLoading();
          console.log(err);
          this.toastProvider.presentTranslatedToast("ErrorMessage");
        }
      );
  }

  ionViewDidLoad() {
    //console.log("ionViewDidLoad ModalLogisticPage");
  }

  onCloseModal() {
    this.navCtrl.pop();
  }
}
