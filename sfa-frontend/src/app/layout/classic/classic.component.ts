import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from '../../components/common-ui/header/header.component';
import { FooterComponent } from '../../components/common-ui/footer/footer.component';
import { SidenavComponent } from '../../components/common-ui/sidenav/sidenav.component';

@Component({
  selector: 'app-classic',
  standalone: true,
  imports: [RouterOutlet, SharedModule, HeaderComponent, FooterComponent, SidenavComponent],
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.scss'
})
export class ClassicComponent {

}
