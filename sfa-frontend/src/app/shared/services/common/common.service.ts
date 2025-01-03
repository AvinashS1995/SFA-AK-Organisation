import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentDialogComponent } from '../../widget/open-dialog/component-dialog/component-dialog.component';
import { AlertDialogComponent } from '../../widget/open-dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from '../../widget/open-dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../interfaces/common';
import { IconSnackBarComponent } from '../../widget/icon-snack-bar/icon-snack-bar.component';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private snackBarOptions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: "end",
    verticalPosition: "bottom",
    panelClass: 'error-msg-snackbar'
};

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  	 // Dialogs Methods
     showConfirmationDialog(data: ConfirmDialogData): MatDialogRef<any> {
      return this.dialog.open(ConfirmationDialogComponent, {
          width: "500px",
          data
      });
  }

  showAlertDialog(data: any, isDisableClose: boolean = false): MatDialogRef<any> {
      return this.dialog.open(AlertDialogComponent, {
          width: "500px",
          disableClose: isDisableClose ? true : false,
          data
      });
  }

  showComponentDialog(data: MatDialogConfig): MatDialogRef<any> {
    
      return this.dialog.open(ComponentDialogComponent, data);
  }

openSnackBar(message: string, actionName: string = "", options: MatSnackBarConfig = {}) {
      this.resetSnackBarOptions();
      this.snackBarOptions = options ? { ...this.snackBarOptions, ...options } : this.snackBarOptions;
      const snackBarRef = this.snackBar.openFromComponent(IconSnackBarComponent, {
          data: {
              message: message,
              icon: this.snackBarOptions.panelClass === "error-msg-snackbar" ? "cancel" : "check_circle"
          },
          ...this.snackBarOptions
      });
      snackBarRef.afterDismissed().subscribe(info => {
          this.resetSnackBarOptions();
      });
  }

  resetSnackBarOptions() {
      this.snackBarOptions = {
          duration: 5000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: 'error-msg-snackbar'
      };
  }

  getFieldErrorDesc(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('maxlength')) {
      return `Maximum length is ${control.getError('maxlength').requiredLength} characters.`;
    }
    // Add more error cases as needed
    return 'Invalid field value.';
  }
}
