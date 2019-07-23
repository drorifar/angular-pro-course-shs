import {
  Directive,
  AfterViewInit,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appNgNotIf]'
})
export class NgNotIfDirective implements AfterViewInit {

  @Input() condition: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {

    if (this.condition) {
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }
  }
}
