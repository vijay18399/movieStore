import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SearchComponent } from './search/search.component';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AboutComponent } from './about/about.component';
import { MovieComponent } from './movie/movie.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListMovieComponent,
  },
  {
    path: 'movie/:movie_id',
    component: MovieComponent,
  },
  {
    path: 'add',
    component: AddMovieComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'moderator',
    },
  },
  {
    path: 'edit/:movie_id',
    component: EditMovieComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'moderator',
    },
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
