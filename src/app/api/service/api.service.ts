import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import Product from "../model/product.model";
import ProductFilter from "../model/product-filter.model";

@Injectable({ providedIn: 'root' })
export class ApiService {

  public findAllProducts(): Observable<Product[]> {
    return of([
      new Product('PRODUCT A', 'ELETRONIC'),
      new Product('PRODUCT B', 'CLOTH'),
      new Product('PRODUCT C', 'CLOTH'),
      new Product('PRODUCT D', 'ELETRONIC'),
      new Product('PRODUCT E', 'ELETRONIC'),
      new Product('PRODUCT F', 'FOOD'),
      new Product('PRODUCT G', 'CLOTH'),
      new Product('PRODUCT H', 'FOOD'),
      new Product('PRODUCT I', 'ELETRONIC'),
      new Product('PRODUCT J', 'CLOTH'),
      new Product('PRODUCT K', 'CLOTH'),
    ]).pipe(delay(1000));
  }

  public findPageableProducts(page: number, pageSize: number): Observable<Product[]> {
    const types = ['ELETRONIC', 'CLOTH', 'FOOD'];
    return of(Array.from({ length: pageSize }, (_, index) => {
      return new Product(
        `PRODUCT ${index + (pageSize * page)}`,
        types[Math.floor(Math.random() * types.length)],
      );
    })).pipe(delay(1000));
  }

  public findAllProductFilters(): Observable<ProductFilter[]> {
    return of([
      new ProductFilter('Eletronics', 'ELETRONIC'),
      new ProductFilter('Clothes', 'CLOTH'),
      new ProductFilter('Foods', 'FOOD'),
    ]).pipe(delay(500));
  }

}
