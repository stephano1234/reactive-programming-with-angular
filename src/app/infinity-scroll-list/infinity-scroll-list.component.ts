import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { INFINITY_SCROLLABLE_SERVICE, InfinityScrollListService } from '../services/infinity-scroll-list.service';
import { ProductService } from './service/product.service';
import Product from '../api/model/product.model';

@Component({
  selector: 'app-infinity-scroll-list',
  template: `
    <table *ngIf="(product$ | async) as products">
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
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      max-height: 70%;
      overflow-y: auto;
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
  providers: [
    InfinityScrollListService,
    {
      provide: INFINITY_SCROLLABLE_SERVICE,
      useClass: ProductService
    }
  ],
})
export class InfinityScrollListComponent {

  readonly product$: Observable<Product[]>;

  constructor(infinityScrollService: InfinityScrollListService<Product>) {
    this.product$ = infinityScrollService.list$;
  }

}
