import { Observable } from "rxjs";

export interface InfinityScrollableService<T> {

  readonly pageSize: number;

  loadPage(page: number, pageSize: number): Observable<T[]>;

}
