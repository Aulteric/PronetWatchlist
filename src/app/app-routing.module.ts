import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) }, 
    { path: 'series', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule) },
    { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
