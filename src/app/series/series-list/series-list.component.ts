import { Component } from '@angular/core';
import { ISeries } from '../../shared/interfaces/ISeries';
import * as fromSeriesActions from '../store/series.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISeriesState } from '../store/series.reducers';
import { selectError, selectSeries } from '../store/series.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.scss'
})
export class SeriesListComponent {
    series$: Observable<ISeries[]>;
    loadError$: Observable<string>;
    
    constructor(
      private store: Store<ISeriesState>,
      private router: Router
    ) { 
      this.series$ = this.store.pipe(select(selectSeries));
      this.loadError$ = this.store.pipe(select(selectError));
    }
    
    ngOnInit(): void {
      this.updateSeries();
    }
    
    updateSeries(): void {
      this.store.dispatch(fromSeriesActions.loadSeries());
    }
    
    onSearch($event: Event): void {
      const inputField = $event.target as HTMLInputElement;
      if(!!inputField.value){
        this.store.dispatch(fromSeriesActions.searchSeries({searchTerm: inputField.value}))
      } else {
        this.store.dispatch(fromSeriesActions.loadSeries());
      }
      }
      

  redirect(id: number): void {
    if(id)
    {
      this.router.navigate(['/series', id]);
    }
  }
  
}
  
