import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMovie } from '../../shared/interfaces/IMovie';
import { ISeries } from '../../shared/interfaces/ISeries';
import { selectFavorites } from '../store/favorites.selectors';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {
  favorites$: Observable<(IMovie | ISeries)[]>;

  constructor(private store: Store) {
    this.favorites$ = this.store.pipe(select(selectFavorites));
  }
}
