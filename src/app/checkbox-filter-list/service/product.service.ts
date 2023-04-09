import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, combineLatestWith, map } from "rxjs";
import { ApiService } from "../../api/service/api.service";
import Product from "../../api/model/product.model";
import { ProductFilterService } from "./product-filter.service";

@Injectable({ providedIn: 'root' })
export class ProductService implements OnDestroy {

  private readonly products = new BehaviorSubject<Product[]>([]);
  private readonly productSub: Subscription;
  private readonly _product$: Observable<Product[]>;

  constructor(apiService: ApiService, productFilterService: ProductFilterService) {
    this.productSub = apiService.findAllProducts()
      .subscribe((products: Product[]) => this.products.next(products));
    this._product$ = this.products.asObservable().pipe(
      combineLatestWith(productFilterService.selectedFilter$),
      map(([products, selectedFilters]) => {
        if (!selectedFilters.length) {
          return products;
        }
        return products.filter(
          product => selectedFilters.some(selectedFilter => selectedFilter.type === product.type)
        );
      }),
    );
  }

  public get product$(): Observable<Product[]> {
    return this._product$;
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
