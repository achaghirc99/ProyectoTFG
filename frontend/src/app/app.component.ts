import { Component, OnInit } from '@angular/core';
import { UserAuthenticateService } from './services/user-authenticate.service';
import { HomeComponent } from './components/home/home.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserAuthenticateService]
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(public userAuthService: UserAuthenticateService, private spinner: NgxSpinnerService){
    
  }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {  
      this.spinner.hide();
    }, 1000);
  }


}
