import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../../widget/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string, action: string, backgroundColor: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message, action, backgroundColor },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar-panel']
    });
  }
  
}
