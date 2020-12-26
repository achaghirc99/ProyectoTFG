import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { Comunidad } from 'src/app/models/comunidad';
import { ComunidadService } from 'src/app/services/comunidad.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserAuthenticateService, ComunidadService]
})
export class HomeComponent implements OnInit {
  
  loggedUser: User;
  comunidad: Comunidad;
  idComunidad: string;
  constructor(public userAuthService: UserAuthenticateService, public comunityService:ComunidadService) { 
    this.loggedUser = new User();
    this.idComunidad = "";
  }
   
  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() { 
    this.userAuthService.getOneUser()
      .subscribe(user => {
        this.loggedUser = user as User;
        this.idComunidad = this.loggedUser.comunidad.toString();
        console.log(this.loggedUser.email);
        this.getComunityOfLoggedUser();
      })
  }

  getComunityOfLoggedUser(){
    this.comunityService.getOneComunity(this.loggedUser.comunidad.toString())
      .subscribe(comunidad => {
        this.comunidad = comunidad;
        console.log(comunidad);
      })
  }

}
