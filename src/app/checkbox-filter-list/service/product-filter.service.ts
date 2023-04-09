import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, combineLatestWith, map, scan } from "rxjs";
import { ApiService } from "../../api/service/api.service";
import ProductFilter from "../../api/model/product-filter.model";

@Injectable({ providedIn: 'root' })
export class ProductFilterService implements OnDestroy {

  private readonly filters = new BehaviorSubject<ProductFilter[]>([]);
  private readonly filterSub: Subscription;
  private readonly _filter$: Observable<ProductFilter[]>;
  private readonly selectedFilters = new BehaviorSubject<ProductFilter | null>(null);
  private readonly _selectedFilter$: Observable<ProductFilter[]>;

  constructor(apiService: ApiService) {
    this.filterSub = apiService.findAllProductFilters()
      .subscribe((products: ProductFilter[]) => this.filters.next(products));
    this._selectedFilter$ = this.selectedFilters.asObservable().pipe(
      scan((selectedFilters, filter) => {
        if (!filter) {
          return selectedFilters;
        }
        if (filter.isSelected) {
          return selectedFilters.filter(selectedFilter => selectedFilter.type !== filter.type);
        }
        return [...selectedFilters, filter];
      }, ([] as ProductFilter[])),
    );
    this._filter$ = this.filters.asObservable().pipe(
      combineLatestWith(this._selectedFilter$),
      map(([filters, selectedFilters]) => {
        if (!selectedFilters.length) {
          return filters;
        }
        return filters.map(filter => {
          return {
            ...filter,
            isSelected: selectedFilters.some(selectedFilter => selectedFilter.type === filter.type)
          };
        });
      }),
    );
  }

  public get filter$(): Observable<ProductFilter[]> {
    return this._filter$;
  }

  public get selectedFilter$(): Observable<ProductFilter[]> {
    return this._selectedFilter$;
  }

  public changeFilterSelection(filter: ProductFilter): void {
    this.selectedFilters.next(filter);
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }

}
