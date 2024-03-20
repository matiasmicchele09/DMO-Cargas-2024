import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private authService: AuthService){}

  login(){
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
    .subscribe(user =>{
      console.log(user);
      }
    )

    // this.authService.login(email, password)
    //   .subscribe({
    //     next: () => this.router.navigateByUrl('/dashboard'),
    //     error: (message) => {
    //       Swal.fire('Error', message, 'error' )
    //     }
    //   })
  }
}
