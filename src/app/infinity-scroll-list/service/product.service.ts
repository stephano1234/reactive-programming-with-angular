import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../api/service/api.service";
import { InfinityScrollableService } from "../../interfaces/infinity-scrollable-service";
import Product from "../../api/model/product.model";

@Injectable()
export class ProductService implements InfinityScrollableService<Product> {

  readonly pageSize = 100;

  constructor(private readonly apiService: ApiService) { }

  public loadPage(page: number, pageSize: number): Observable<Product[]> {
    return this.apiService.findPageableProducts(page, pageSize);
  }

}
