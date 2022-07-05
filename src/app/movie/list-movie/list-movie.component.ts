import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
})
export class ListMovieComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}
  movieList!: Movie[];
  array!: number[];
  innerWidth: any;
  loading = false;
  totalCount = 0;
  currentPage = 1;
  sortBy = 'year-desc';
  addOnBlur = true;
  perPage = 14;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.perPage = this.getPerPage(this.innerWidth);
    this.array = [...Array(this.perPage).keys()];
    this.getMovies();
  }

  tabChanged(index: number) {
    console.log(index);
    if (index == 0) {
      this.sortBy = 'year-desc';
      this.getMovies();
    } else if (index == 1) {
      this.sortBy = 'year-asc';
      this.getMovies();
    } else if (index == 2) {
      this.sortBy = 'name-asc';
      this.getMovies();
    } else {
      this.sortBy = 'name-desc';
      this.getMovies();
    }
  }

  getMovies() {
    this.loading = true;
    this.pageChanged('1');
  }
  pageChanged(currentPage: string) {
    this.loading = true;
    this.apiService
      .getMovies(Number(currentPage), this.sortBy, this.perPage, 1)
      .subscribe((data: any) => {
        this.currentPage = Number(currentPage);
        this.movieList = data.movies;
        this.totalCount = data.totalItems;
        this.loading = false;
      });
  }
  getPerPage(innerWidth: number) {
    if (innerWidth >= 1180) {
      return 14;
    } else if (innerWidth >= 1000) {
      return 12;
    } else if (innerWidth >= 700) {
      return 10;
    } else if (innerWidth >= 800) {
      return 8;
    } else if (innerWidth > 500) {
      return 6;
    } else {
      return 4;
    }
  }
}
