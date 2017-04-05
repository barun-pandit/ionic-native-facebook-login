import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	loggedInUserDetails: any;
	constructor(public navCtrl: NavController,private fb: Facebook) {
    
	}
	socialLogin(){
		this.fb.login(['public_profile', 'user_friends', 'email'])
		.then((response: FacebookLoginResponse) => alert('Logged into Facebook!'))
		.catch(e => alert('Error logging into Facebook'+JSON.stringify(e)));
	}
	
	getUserDetails(){
		this.fb.getLoginStatus().then((response) =>{
			if(response.status == 'connected'){
				this.fb.api('/me?fields=picture,name,email',['public_profile', 'user_friends', 'email'])
				.then((response) =>{ this.loggedInUserDetails = response;})
				.catch(e => alert('Error Getting User Data Facebook'+JSON.stringify(e)));
			}else {
				this.socialLogin();	
			}
		});
	}
}
