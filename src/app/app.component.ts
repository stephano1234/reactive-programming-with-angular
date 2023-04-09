import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="top-menu">
      <div
        class="project-option"
        routerLink="checkbox-filter-list"
        routerLinkActive="active-project"
      >
        Checkbox Filter List
      </div>
      <div
        class="project-option"
        routerLink="infinity-scroll-list"
        routerLinkActive="active-project"
      >
        Infinity Scroll List
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .top-menu {
      display: flex;
      flex-direction: row;
      column-gap: 1rem;
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background-color: gray;
      border-bottom: 2px solid black;
      color: yellow;
      .project-option {
        cursor: pointer;
      }
      .active-project {
        color: blue;
        text-decoration: underline;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent {

  constructor() { }

}
