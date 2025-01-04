import { Component, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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

    }else{
      this.loginForm.markAllAsTouched();
    }
    
  }
  
  onSignupSubmit(){
    console.log(this.signupForm);
    if(this.signupForm.valid){
      
    }else{
      this.signupForm.markAllAsTouched();
    }

  }


}
