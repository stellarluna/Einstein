import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { App, Refresher, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

import { AskQuestionPage } from './ask-question/ask-question';
import { AnswerPage } from '../answer/answer';
import { StreamData } from '../../providers/questions-stream';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  questions: any = [];
  queryText = '';
  tester = 'unanswered';
  filter = 'all';

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public app: App,
    public streamData: StreamData,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {

  }
  ionViewDidLoad() {
    this.app.setTitle('Questions');
    this.updateQuestionStream();
  }

  updateQuestionStream () {
    this.streamData.load()
      .subscribe ((data: any) => {
        this.questions = data;
        console.log(this.questions)
    });

  }

  onAskQuestion() {
    let user = this.afAuth.auth.currentUser;
    if(user != null) {
      // don't show tabs on the Ask Question Page (works but animation is lost)
      // this.app.getRootNavs()[0].setRoot(AskQuestionPage)
      this.navCtrl.push(AskQuestionPage);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please Log In to Post Questions.',
        duration: 2500
      });
      toast.present();
    }

  }

  onQuestionClick(question) {
    let storeObj = question;
    storeObj.key = question.$key;
    this.storage.set('answerPageCurrQuestion', storeObj);
    this.navCtrl.push(AnswerPage);
  }

  doRefresh(refresher: Refresher) { // to avoid refresh errors for now
    this.streamData.load()
      .subscribe ((data: any) => {
        this.questions = data;
        refresher.complete ();
        // const toast = this.toastCtrl.create({
        //   message: 'Questions have been updated.',
        //   duration: 3000
        // });
        // toast.present();
        console.log('content updated');
    });

  }

  search() {
    this.streamData.filterItems(this.queryText)
      .subscribe ((data: any) => {
        this.questions = data;
        console.log(this.questions)
    });
  }

   filterQuestions() {
    if(this.filter === 'all'){
      this.updateQuestionStream();
    } else {
      this.streamData.filterAnswerUnanswer(this.filter)
        .subscribe ((data: any) => {
          this.questions = data;
          console.log(this.questions)
      });
    }
  }
}
