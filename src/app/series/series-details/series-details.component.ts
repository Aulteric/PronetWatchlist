import { Component } from '@angular/core';
import { ISeriesState } from '../store/series.reducers';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ISeries } from '../../shared/interfaces/ISeries';
import { addSeriesToFavorite, loadSeriesById, removeSeriesFromFavorite } from '../store/series.actions';
import { selectSelectedSeries, selectSeriesFavorites } from '../store/series.selectors';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.scss'
})
export class SeriesDetailsComponent {
  show$: Observable<ISeries>;
  show: ISeries | null = null;
  routerParameterId: number;
  genres: { id: number; name: string }[] = []; 
  isFavorite: boolean = true;
  private subs = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<ISeriesState>
  ) {
    this.routerParameterId = activatedRoute.snapshot.params['id'];
    this.store.dispatch(loadSeriesById({ id: this.routerParameterId }));
    
    this.show$ = this.store.pipe(select(selectSelectedSeries));
    this.subs.add(this.show$.subscribe(show => {
      this.show = show;
      this.subs.add(
        this.store.pipe(
          select(selectSeriesFavorites),
          map(favorites => favorites.some(fav => fav.id === show.id))
        ).subscribe(isFavorite => {
          this.isFavorite = isFavorite;
        })
      );
    }));


   }
   
   ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

  toggleFavorite(series: ISeries): void {
      if (this.isFavorite) {
        this.store.dispatch(removeSeriesFromFavorite({ seriesId: series.id }));
      } else {
        this.store.dispatch(addSeriesToFavorite({ series }));
      }
  }
}
