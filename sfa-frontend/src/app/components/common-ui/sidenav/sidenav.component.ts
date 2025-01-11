import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MenuItem } from '../../../shared/interfaces/menu';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../../shared/widget/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'group_add',
      label: 'Employee Management',
      // route: 'content'
    },
    {
      icon: 'currency_exchange',
      label: 'Sales',
      // route: ''
    },
    {
      icon: 'description',
      label: 'Reports',
      // route: ''
    },
    {
      icon: 'notifications_active',
      label: 'Notifications',
      // route: ''
    },
  ])

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LogoutDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
