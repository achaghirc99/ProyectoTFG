import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[UserAuthenticateService]
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  constructor(public userAuthService:UserAuthenticateService) { 
    this.currentUser = new User;
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if(this.userAuthService.loggedIn()){
      this.userAuthService.getOneUser()
        .subscribe (user => {
          this.currentUser = user as User;
          console.log(this.currentUser);
        })
    }
  }

}
