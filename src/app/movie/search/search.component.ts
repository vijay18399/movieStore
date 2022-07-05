import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}
  movieList!: Movie[];
  key = '';
  perPage = 7;
  message = '';
  loading = false;
  totalCount = 0;
  currentpage = 1;
  searchFor = 'name';
  filters = [
    {
      viewValue: 'Movie Name',
      value: 'name',
    },
    {
      viewValue: 'Actors',
      value: 'actors',
    },
    {
      viewValue: 'Directors',
      value: 'directors',
    },
  ];
  ngOnInit(): void {}
  onSearch() {
    this.pageChanged('1');
  }
  pageChanged(currentpage: string) {
    this.loading = true;
    this.apiService
      .search(this.key, Number(currentpage), 7, this.searchFor)
      .subscribe((data: any) => {
        this.currentpage = Number(currentpage);
        this.movieList = data.movies;
        this.totalCount = data.totalItems;
        this.loading = false;
      });
  }
}
