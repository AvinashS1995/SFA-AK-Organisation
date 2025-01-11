import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/api/auth.service';
import { API_ENDPOINTS } from '../../constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {

  readonly dialogRef = inject(MatDialogRef<LogoutDialogComponent>);

  constructor(
    private AuthService: AuthService,
    private router: Router
  ){}

  logout(){
    console.log('logout btn clicked');
    
    this.AuthService.logoutApiCall(API_ENDPOINTS.serviceName_logout,{}).subscribe((resp: any) => {
      console.log(resp);
      if(resp.responseCode === '200'){
        sessionStorage.clear();
        this.router.navigateByUrl('/login')
      }

      
    })
  }



}
