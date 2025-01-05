import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../../../shared/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  Lhide = signal(true);
  Rhide1 = signal(true);
  Rhide2 = signal(true);

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.buildForm();
  }
  
  buildForm(){
    // Login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // Sign Up form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  onTabChange(event: any){
    // console.log(event);
    if(event.index === 0){
      this.loginForm.reset();
    }else{
      this.signupForm.reset();
    }
    
  }

  clickEvent(event: MouseEvent, btn: string) {
    if(btn === 'Lbtn'){
      this.Lhide.set(!this.Lhide());
      event.stopPropagation();
    }else if(btn === 'Rbtn1'){
      this.Rhide1.set(!this.Rhide1());
      event.stopPropagation();
      
    }else{
      this.Rhide2.set(!this.Rhide2());
      event.stopPropagation();

    }
  }

  onLoginSubmit(){
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_login, this.loginForm.value).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_login} Response : `, resp);
        if(resp.responseCode === '00'){
          this.router.navigateByUrl('/dashboard')
        }else{
          alert(`${resp.message}`)
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
    
  }
  
  onSignupSubmit(){
    console.log(this.signupForm);
    if(this.signupForm.valid){
      let params = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password
      }
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_signup, params).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_signup} Response : `, resp);
        if(resp.responseCode === '00'){
          // this.router.navigateByUrl('login')
        }else{
          alert(`${resp.message}`)
        }
      })
    }else{
      this.signupForm.markAllAsTouched();
    }

  }


}
