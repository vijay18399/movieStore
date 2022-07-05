import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { MovieComponent } from '../movie/movie.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/shared/dialog-message/dialog-message.component';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movie_id: any;
  public genres: Array<string> = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'Western',
  ];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private matDialog: MatDialog
  ) {}
  genre = '';
  actor = '';
  director = '';
  loading = false;
  movie: Movie = {
    _id: '',
    name: '',
    year: undefined,
    genres: [],
    link: '',
    audience_rating: '',
    runtime: undefined,
    rating: undefined,
    votes: undefined,
    plot: '',
    poster: '',
    actors: [],
    directors: [],
    lq_poster: '',
    languages: [],
  };
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  ngOnInit(): void {
    console.log(this.movie);
    this.route.queryParams.subscribe((params: any) => {
      this.movie._id = params._id;

      if (this.movie._id) {
        this.webScrap();
      }
    });
  }

  addGenre(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.movie.genres.push(value);
    }
    event.chipInput!.clear();
  }
  removeGenre(index: number) {
    this.movie.genres.splice(index, 1);
  }
  addActor(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.movie.actors.push(value);
    }
    event.chipInput!.clear();
  }
  removeActor(index: number) {
    this.movie.actors.splice(index, 1);
  }

  addDirector(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.movie.directors.push(value);
    }
    event.chipInput!.clear();
  }
  removeDirector(index: number) {
    this.movie.directors.splice(index, 1);
  }
  addLanguage(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.movie.languages.push(value);
    }
    event.chipInput!.clear();
  }
  removeLanguage(index: number) {
    this.movie.languages.splice(index, 1);
  }
  addMovie() {
    this.loading = true;

    console.log(this.movie);
    this.apiService.addMovie(this.movie).subscribe((data: any) => {
      this.loading = false;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data.message;
      this.matDialog.open(DialogMessageComponent, dialogConfig);
      this.movie = {
        _id: '',
        name: '',
        year: undefined,
        genres: [],
        link: '',
        audience_rating: '',
        runtime: undefined,
        rating: undefined,
        votes: undefined,
        plot: '',
        poster: '',
        actors: [],
        directors: [],
        lq_poster: '',
        languages: [],
      };
    });
  }
  formatdate(date: any) {
    return formatDate(date, 'dd-MM-yyyy', 'en');
  }

  webScrap() {
    this.loading = true;
    this.apiService.webScarp(this.movie._id).subscribe((data: any) => {
      this.movie = {
        ...this.movie,
        ...data,
      };
      this.movie.link = `https://www.imdb.com/title/${this.movie._id}`;
      this.loading = false;
    });
  }
}
