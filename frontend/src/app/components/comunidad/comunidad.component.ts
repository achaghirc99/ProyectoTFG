import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { ComunidadService } from 'src/app/services/comunidad.service';
import { Comunidad } from 'src/app/models/comunidad';

declare var M : any;

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
  providers: [UserAuthenticateService, ComunidadService]
})

export class ComunidadComponent implements OnInit {


  enum:string[] = ['Public', 'Private'];
  loggedUser;
  comunidad : Comunidad;
  constructor(private router: ActivatedRoute,private route : Router ,private authService:UserAuthenticateService,public comunidadService : ComunidadService) {
    this.loggedUser = new User;
    this.comunidad = new Comunidad; 
    this.enum = ['Public', 'Private'];
   }

  ngOnInit(): void {
    this.getUser(); 
  }

  createNewComunity(form : NgForm){
    this.comunidadService.createComunity(form.value, this.loggedUser._id)
        .subscribe(res => {
          this.comunidad = res as Comunidad;
          this.comunidad.users.push(this.loggedUser);
          M.toast({html: "Comunidad creada correctamente"})
          this.signInUser(this.loggedUser);
        })
  }

  resetForm(form : NgForm) { 

  }

  signInUser(user: User) {
    this.authService.onLogin(user)
      .subscribe(user => {
        localStorage.setItem('token',user.dataUser.accessToken);
        localStorage.setItem('id', user.dataUser.id);
        this.route.navigate([`/home`], {skipLocationChange: false});
      })
  }

  getUser() {
    const email = localStorage.getItem('email'); 
    this.authService.getUserByEmail(email)
      .subscribe(res => {
        this.loggedUser = res;
        console.log(this.loggedUser);
    })
  }


}
