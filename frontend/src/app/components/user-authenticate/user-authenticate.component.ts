import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserAuthenticateService } from '../../services/user-authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var M : any;

@Component({
  selector: 'app-user-authenticate',
  templateUrl: './user-authenticate.component.html',
  styleUrls: ['./user-authenticate.component.scss'],
  providers: [UserAuthenticateService],
})
export class UserAuthenticateComponent implements OnInit {
  loggedUser: User;
  isError: boolean;
  constructor(public userAuthService: UserAuthenticateService, private route : ActivatedRoute, private router : Router) { 
    this.loggedUser = new User();
    this.isError = false;
  }

  ngOnInit(): void {
    this.getAuthenticatedUsers();
  
  }

  getAuthenticatedUsers() { 
    this.userAuthService.getAllAuthenticatedUsers()
        .subscribe(res => {
          this.userAuthService.users = res as User[];
          console.log(res);
        });
  }

  authenticateUser( form : NgForm) {
    if(form.value._id){
      this.userAuthService.putAuthenticatedUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Usuario actualizado correctamente'});
          this.getAuthenticatedUsers();
        });
    }else {
      this.userAuthService.postAuthenticateUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html:'Usuario creado correctamente'});
          this.loggedUser = res as User;
          localStorage.setItem('email', this.loggedUser.email.toString());
          this.router.navigate([`/comunidad`], {relativeTo : this.route});
      });
      
    }
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
        this.router.navigate(['/comunidad'], { skipLocationChange: false }); // Con el skipLocationChange a false obligamos a que se cargue la configuracion de la ruta a la que queremos navegar. 
      },
      err => console.log(err))
  }

  resetForm(form?: NgForm){
    if(form) {
      form.reset;
      this.userAuthService.selectedUser = new User();
      M.toast({html: "Formulario limpiado correctamente"});
    }
  }

  editUser(user : User){
    this.userAuthService.selectedUser = user;
  }

  deleteUser(_id:string){
    if(confirm('¿Estas seguro de que quieres eliminarlo?')){
      this.userAuthService.deleteUser(_id)
        .subscribe(res => {
          this.getAuthenticatedUsers();
          M.toast({html:'Usuario eliminado correctamente'})
        });
    }
  } 



}
