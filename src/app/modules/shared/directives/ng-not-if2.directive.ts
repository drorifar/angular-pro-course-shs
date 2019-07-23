import {
  Directive,
  AfterViewInit,
  ViewContainerRef,
  TemplateRef,
  Input,
  ComponentFactoryResolver,
  Inject
} from '@angular/core';

@Directive({
  selector: '[appNgNotIf2]'
})
export class NgNotIf2Directive implements AfterViewInit {
  @Input() set appNgNotIf2(condition: boolean) {
    this.condition = condition;
    if (this.condition){ 
    this.addDynamicComponent();
    } else {
    this.clearDynamicComponent();
    }
  }

  condition: boolean;
  constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<any>) {
    }

  ngAfterViewInit(): void {
    // if (!this.condition) {
    //   this.addDynamicComponent();
    // }
  }

  addDynamicComponent() {
    this.viewContainer.createEmbeddedView(this.template, null);
  }

  clearDynamicComponent() {
    this.viewContainer.clear();
  }
}
