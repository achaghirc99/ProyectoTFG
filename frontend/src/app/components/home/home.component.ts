import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserAuthenticateService]
})
export class HomeComponent implements OnInit {

  constructor(public userAuthService: UserAuthenticateService) { }
  loggedUser: User; 
  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() { 
    this.userAuthService.getOneUser()
      .subscribe(user => {
        console.log(user);
        this.loggedUser = user as User;
        console.log(this.loggedUser.email);
      })
  }

}
