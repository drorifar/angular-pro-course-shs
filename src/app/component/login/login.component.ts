import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/reducer/auth.reducer';
import { LoginUser } from 'src/app/store/action/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private store: Store<AuthState>) { }

  ngOnInit() {
  }

  submit(form) {
    // this.authService.login(form.value['email']);

    this.store.dispatch(new LoginUser(form.value['email']));

  }

  register() {
    this.router.navigateByUrl('register');
  }

}
