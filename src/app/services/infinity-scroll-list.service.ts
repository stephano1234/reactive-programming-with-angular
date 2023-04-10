import { Inject, Injectable, InjectionToken, Self } from "@angular/core";
import { Observable, exhaustMap, scan, startWith, tap } from "rxjs";
import { InfinityScrollableService } from "../interfaces/infinity-scrollable-service";
import { WindowScrollService } from "./window-scroll.service";

export const INFINITY_SCROLLABLE_SERVICE = new InjectionToken<InfinityScrollableService<unknown>>(
  'INFINITY_SCROLLABLE_SERVICE'
);

@Injectable()
export class InfinityScrollListService<T> {

  private _page = 0;
  private readonly _list$: Observable<T[]>;

  constructor(
    @Inject(INFINITY_SCROLLABLE_SERVICE) @Self() service: InfinityScrollableService<T>,
    scrollService: WindowScrollService,
  ) {
    this._list$ = scrollService.scrollBottom$.pipe(
      startWith(undefined),
      exhaustMap(() => service.loadPage(this._page, service.pageSize)),
      tap(() => ++this._page),
      scan((list, newPage) => [...list, ...newPage], [] as T[]),
    );
  }

  public get page(): number {
    return this._page;
  }

  public get list$(): Observable<T[]> {
    return this._list$;
  }

}
