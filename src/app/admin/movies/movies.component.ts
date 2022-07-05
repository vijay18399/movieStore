import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  totalCount = 0;
  currentpage = 1;
  perPage = 8;
  successMessage = '';
  loading: boolean = false;
  displayedColumns: string[] = ['_id', 'name', 'rating'];
  isAdmin: Boolean = false;

  constructor(
    private apiService: ApiService,
    private tokenStorageService: TokenStorageService
  ) {}
  movieList!: Movie[];
  sortBy = 'year-desc';
  ngOnInit(): void {
    this.getMovies();
    this.isAdmin = this.tokenStorageService.getUser().roles.includes('admin');
  }
  getMovies() {
    this.loading = true;
    this.apiService
      .getMovies(this.currentpage, this.sortBy, 8, 0)
      .subscribe((data: any) => {
        console.log(data);
        this.movieList = data.movies;
        this.totalCount = data.totalItems;
        this.loading = false;
      });
  }
  pageChanged(currentpage: string) {
    this.loading = true;
    this.apiService
      .getMovies(Number(currentpage), this.sortBy, 8, 1)
      .subscribe((data: any) => {
        this.currentpage = Number(currentpage);
        this.movieList = data.movies;
        this.totalCount = data.totalItems;
        this.loading = false;
      });
  }
  deleteMovie(_id: string) {
    this.apiService.deleteMovie(_id).subscribe((data: any) => {
      this.successMessage = data.message;
    });
  }
}
