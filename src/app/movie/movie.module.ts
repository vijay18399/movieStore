import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { SearchComponent } from './search/search.component';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AboutComponent } from './about/about.component';
import { MovieComponent } from './movie/movie.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemMovieComponent } from './shared/list-item-movie/list-item-movie.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AddMovieComponent,
    SearchComponent,
    ListMovieComponent,
    EditMovieComponent,
    AboutComponent,
    MovieComponent,
    ListItemMovieComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MovieRoutingModule,
  ],
})
export class MovieModule {}
