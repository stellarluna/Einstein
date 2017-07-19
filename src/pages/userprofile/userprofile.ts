import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  // username: string = '';
  // name: string = this.user.details.name;
  // email: string = this.user.details.email;
  country = 'Country';

  constructor(
    public auth: Auth,
    public user: User,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    console.log('this.user', this.user);
    console.log('this.user.details.email', this.user.details.email);
    // ionic 3 makes you have your email as your e
    console.log('this.user.details.name', this.user.details.name);
    // console.log('this.details.password', this.details.password);

  }
  // ngAfterViewInit() {
  //   this.getUsername();
  // }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  onChangeName() {
    console.log('in onChangeName');
    var field = 'Name';

    this.onChangeUserInfo(field, (info) => {
      this.user.details.name = info;
      this.user.save();
    });

    console.log('this.user.details object after setting newName', this.user.details);
    // ^ PROBLEM: this runs before the call to `onChangeUserInfo` returns the newName,
    // we need a callback
  }

  onChangeCountry(updatedCountry) {

  }

  onChangeLanguage(updatedLanguage) {

  }


  onChangeSubjects(updatedSubjects) {

  }

  // onChangeName() {
  //   // console.log('field', field);
  //   // console.log('property', property);
  //   let alert = this.alertCtrl.create({
  //     title: 'Update ' + 'Name',
  //     inputs: [
  //       {
  //         name: 'Name',
  //         placeholder: 'Name'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //           console.log(JSON.stringify(data));
  //           console.log(data.Name);
  //           // console.log('property', property);
  //           this.user.details.name = data.Name;
  //           this.user.save();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // radio alert function:

  showRadio() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Country');

      alert.addInput({
        type: 'radio',
        label: 'USA',
        value: 'USA',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Canada',
        value: 'Canada',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'India',
        value: 'India',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Bangladesh',
        value: 'Bangaldesh',
        // checked: true
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log('data', data);
          this.country = data;
          this.user.set('country', data);
          this.user.save();
        }
      });
      alert.present();
  }


  // prompt alert function:
  // will be called by some wrapper method to supply the
  // right data for inputs and string interpolation

  // PIVOT: breaking out the alert prompt method may not be necessary
  // if none of the other options in the user profile need an alert
  // prompt box. In any case, I will need to break out the
  // onChangeCountry, onChangeLanguage, and onChangeSubjects methods
  // from the method that generates the radio alert box

  onChangeUserInfo(field, cb) {

    let alert = this.alertCtrl.create({
      title: 'Update ' + field,
      inputs: [
        {
          name: field,
          placeholder: field
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('data[field] on line 200', data[field]);

            console.log('type of data[field]', typeof data[field]);
            console.log('this.user in callback', this.user);
            cb(data[field]);
          }
        }
      ]
    });
    alert.present();
  }




  // onUpdateName(event: any) {
  //   this.name = event.target.value;
  // }
  //
  // changeName(newName) {
  //   this.user.set('name', newName);
  // }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  // changeUsername() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Change Username',
  //     buttons: [
  //       'Cancel'
  //     ]
  //   });
  //   alert.addInput({
  //     name: 'username',
  //     value: this.username,
  //     placeholder: 'username'
  //   });
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: (data: any) => {
  //       this.user.set(data.username);
  //       this.getUsername();
  //     }
  //   });
  //
  //   alert.present();
  // }

}
