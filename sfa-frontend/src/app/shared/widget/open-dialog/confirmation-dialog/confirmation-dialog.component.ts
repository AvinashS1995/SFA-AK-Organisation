import { Component, OnInit, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../../interfaces/common';

@Component({
  selector: 'ak-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  public dialogData: ConfirmDialogData = {
    title: "Confirmation",
    message: "Are you sure want to continue?",
    btnPositive: "Yes",
    btnNegative: "No",
    btnPositiveColor: "primary",
    btnNegativeColor: ""
  }

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MatDialogConfig,) {
  }

  ngOnInit(): void {
    this.dialogData = {
      ...this.dialogData, ...this.data
    }
  }

  onPositiveClick() {
    this.dialogRef.close(true)
  }

  onNegativeClick() {
    this.dialogRef.close(false)
  }

}
