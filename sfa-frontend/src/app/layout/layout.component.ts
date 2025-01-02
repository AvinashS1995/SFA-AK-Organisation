import { Component } from '@angular/core';
import { EmptyComponent } from './empty/empty.component';
import { ClassicComponent } from './classic/classic.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [EmptyComponent, ClassicComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  layout: string = ''

  constructor(
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this._updateLayout()
  }

  private _updateLayout(): void{
    this._activatedRoute.data.subscribe(params => {
      const layoutFromQueryParam = (params['layout'])
      console.log(layoutFromQueryParam);
      
      if(layoutFromQueryParam){
        this.layout = layoutFromQueryParam
      }
    })
  }

}
