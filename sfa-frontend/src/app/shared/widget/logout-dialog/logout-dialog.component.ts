import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LogoutDialogComponent>);
}
