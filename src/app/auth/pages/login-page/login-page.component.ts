import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private router = inject( Router );
  //user?:User;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private authService: AuthService){}

  get user():User[] | undefined{
    return this.authService.currentUser;
  }

  login(){
    const { email, password } = this.myForm.value;

    this.authService.login(email, password) //el login es el observable, ya que devuelve un obj. observable
    .subscribe({
      next: () => this.router.navigateByUrl('dashboard') //* o tambien --> this.router.navigate(['/dashboard']);
      //* El next sería el observer
      //     error: (message) => {    //       Swal.fire('Error', message, 'error' )    //     }
    })
  }
}
