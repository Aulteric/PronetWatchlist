import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrendingMedia } from '../shared/interfaces/ITrendingMedia';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from '../shared/services/tmdb/tmdb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  trendingMedia: ITrendingMedia[] = [];
  private subs = new Subscription();
  
  constructor(
    private router: Router,
    private tmdbService: TmdbService
  ) {}
  ngOnInit(): void {
    this.subs.add(this.tmdbService.getTrendingMedia()
    .subscribe(response => {
      this.trendingMedia = response.results;
    }));
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  

  redirectToMedia(mediaType: string, mediaId: number){
    const route = mediaType === 'movie' ? '/movies' : '/series';
    this.router.navigate([route, mediaId]);
  }
}
