import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
  providers: [UserAuthenticateService]
})
export class ComunidadComponent implements OnInit {


  enum:string[] = ['Public', 'Private'];
  loggedUser;
  constructor(private router: ActivatedRoute, private authService:UserAuthenticateService) {
    this.loggedUser = new User; 
   }

  ngOnInit(): void {
    let id = this.router.snapshot.params.id;
    console.log(localStorage.getItem('id'));
  }



  getUser() {
    const email = localStorage.getItem('email'); 
    this.authService.getUserByEmail(email)
      .subscribe(res => {
        this.loggedUser = res as User;
        return this.loggedUser;
      })
  }


}
