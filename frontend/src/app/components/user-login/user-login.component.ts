import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  providers:[UserAuthenticateService]
})
export class UserLoginComponent implements OnInit {

  loggedUser: User;
  isError: boolean;
  constructor(private userAuthService: UserAuthenticateService, private router:Router) { 
    this.loggedUser = new User();
    this.isError = false;
  }

  ngOnInit(): void {
    
  }

  onLogin(form :NgForm) {
    this.userAuthService.onLogin(form.value)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('token',res.dataUser.accessToken);
        localStorage.setItem('id',res.dataUser.id.toString());
        this.loggedUser._id = res.dataUser.id;
        this.loggedUser.name = res.dataUser.name;
        this.loggedUser.email = res.dataUser.email; 
        if(this.loggedUser == undefined){
          this.isError = true;
        }       
        this.router.navigate([`/home`], { skipLocationChange: false }); // Con el skipLocationChange a false obligamos a que se cargue la configuracion de la ruta a la que queremos navegar. 
      },
      err => console.log(err))
  }

  

  getUserLogged() { 
    this.userAuthService.getOneUser()
      .subscribe(user => {
        this.loggedUser = user as User;
      })
  }

}
