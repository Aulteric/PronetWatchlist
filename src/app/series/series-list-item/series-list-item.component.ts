import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ISeries } from '../../shared/interfaces/ISeries';

@Component({
  selector: 'app-series-list-item',
  templateUrl: './series-list-item.component.html',
  styleUrl: './series-list-item.component.scss'
})
export class SeriesListItemComponent {

  @Input() show?: ISeries;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(): void {
    if(this.show){
      this.router.navigate(['/tv-series', this.show.id]);
    }
  }

}
