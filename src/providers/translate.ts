import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


// Builds the translation object for a piece of text and adds it to Firebase as
// an object under the 'translations/' endpoint
@Injectable()
export class TranslateService {
  constructor(
    private afDB: AngularFireDatabase
  ) {

  }
  // push user text to firebase and return an object observable to
  // update the view asynchronously
  createTranslation(text: string): FirebaseObjectObservable<any> {
    // create new translation, then return it as an object observable
    const data = {'english': text}
    const key = this.afDB.list('/translations').push(data).key
    return this.afDB.object('translations/' + key);
  }
}
