import { Injectable } from "@angular/core";
import { Observable, distinctUntilChanged, filter, fromEvent, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WindowScrollService {

  private readonly _scroll$: Observable<Event>;
  private readonly _scrollBottom$: Observable<void>;

  constructor() {
    this._scroll$ = fromEvent(window, 'scroll');
    this._scrollBottom$ = this._scroll$.pipe(
      distinctUntilChanged(),
      filter(() => {
        const scrolledHeight = document.documentElement.scrollTop + document.documentElement.clientHeight;
        // console.log('window.document.body.offsetHeight', window.document.body.offsetHeight);
        // console.log('window.document.body.scrollHeight', window.document.body.scrollHeight);
        // console.log('window.document.body.clientHeight', window.document.body.clientHeight);
        // console.log('window.document.body.scrollTop', window.document.body.scrollTop);
        // console.log('window.document.documentElement.offsetHeight', window.document.documentElement.offsetHeight);
        // console.log('window.document.documentElement.scrollHeight', window.document.documentElement.scrollHeight);
        // console.log('window.document.documentElement.clientHeight', window.document.documentElement.clientHeight);
        // console.log('window.document.documentElement.scrollTop', window.document.documentElement.scrollTop);
        // console.log('window.scrollY', window.scrollY);
        // console.log('window.innerHeight', window.innerHeight);
        // console.log('window.outerHeight', window.outerHeight);
        // console.log(`${scrolledHeight} === ${this.getScrollHeight()}`);
        return scrolledHeight === document.documentElement.scrollHeight;
      }),
      map(() => undefined),
    );
  }

  public get scroll$(): Observable<Event> {
    return this._scroll$;
  }

  public get scrollBottom$(): Observable<void> {
    return this._scrollBottom$;
  }

}
