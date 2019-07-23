import {
  Directive,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective  {

  @Output() scrollEnded: EventEmitter < boolean > = new EventEmitter();

  constructor() {}

  // ngAfterViewInit(): void {

  //   window.onscroll = () => {
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //       this.scrollEnded.emit(true);
  //     }
  //   };
  // }

  @HostListener('window:scroll', [])
  onScroll(): void {

    const scrollpos = window.pageYOffset;
    const winSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    const distance = Math.max(bodyHeight - (scrollpos + winSize), 0);

    if (distance < 20) {
      this.scrollEnded.emit(true);
    }
    // if ((window.innerHeight + window.pageYOffset + 250) >= document.body.offsetHeight) {
    //   this.scrollEnded.emit(true);
    // }
  }

}
