import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'ak-icon-snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './icon-snack-bar.component.html',
  styleUrl: './icon-snack-bar.component.scss'
})
export class IconSnackBarComponent {

  constructor(public snackBarRef: MatSnackBarRef<IconSnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
