import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IAutoCompleteProvider } from 'src/app/models/iAutoCompleteProvider';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnDestroy {

  @Input() acProvider: IAutoCompleteProvider;

  userSub: Subscription;

  search$: Subject<string> = new Subject<string>();
  options: import("c:/Users/Win7/shs-course-project/src/app/models/iAutoCompleteProvider").IAutoCompleteItem[];

  constructor() { }

  ngOnInit() {

    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        console.log(term);
        return this.acProvider.getItems(term);
      })
    ).subscribe( options => {
      this.options = options;
    });
  }

  search(term) {
    if (this.acProvider && this.acProvider.getItems) {
      this.search$.next(term);
    }
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
