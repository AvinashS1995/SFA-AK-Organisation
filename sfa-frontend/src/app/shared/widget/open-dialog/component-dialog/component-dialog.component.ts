import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'ak-component-dialog',
  standalone: true,
  imports: [],
  templateUrl: './component-dialog.component.html',
  styleUrl: './component-dialog.component.scss'
})
export class ComponentDialogComponent {

  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef!: ViewContainerRef;

  componentRef!: ComponentRef<any>;
  dialogCallback$ = new ReplaySubject<any>();
  dialogCallback$$ = this.dialogCallback$.asObservable();
  constructor(
    public dialogRef: MatDialogRef<ComponentDialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cs: CommonService) {

    this.dialogCallback$$.subscribe((data: any) => {
      this.dialogRef.close(data);
    })

  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
    let componentInstance = this.componentRef.instance;
    componentInstance.data = { ...this.data.data, callback: this.dialogCallback$ };
  }


  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
