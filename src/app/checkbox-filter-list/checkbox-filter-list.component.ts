import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from './service/product.service';
import { ProductFilterService } from './service/product-filter.service';
import Product from '../api/model/product.model';
import ProductFilter from '../api/model/product-filter.model';

@Component({
  selector: 'app-checkbox-filter-list',
  template: `
    <div *ngIf="filter$ | async as filters" class="filter-container">
      <label *ngFor="let filter of filters" [for]="filter.type">
        <input
          type="checkbox"
          name="filters"
          [id]="filter.type"
          [checked]="filter.isSelected"
          (click)="changeFilterSelection(filter)"
        >
        <span>{{ filter.name }}</span>
      </label>
    </div>
    <table *ngIf="product$ | async as products">
      <tr>
        <th>Name</th>
        <th>Type</th>
      </tr>
      <tr *ngFor="let product of products">
        <td>{{ product.name }}</td>
        <td>{{ product.type }}</td>
      </tr>
    </table>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
    .filter-container {
      display: flex;
      flex-direction: row;
      column-gap: 1rem;
      label {
        cursor: pointer;
        font-weight: 600;
        input {
          cursor: inherit;
        }
      }
    }
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
    }
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 0.25rem;
    }
    tr:nth-child(even) {
      background-color: #dddddd;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class CheckboxFilterListComponent {

  readonly product$: Observable<Product[]>;
  readonly filter$: Observable<ProductFilter[]>;

  constructor(
    private readonly productService: ProductService,
    private readonly productFilterService: ProductFilterService,
  ) {
    this.product$ = this.productService.product$;
    this.filter$ = this.productFilterService.filter$;
  }

  changeFilterSelection(filter: ProductFilter): void {
    this.productFilterService.changeFilterSelection(filter);
  }

}
