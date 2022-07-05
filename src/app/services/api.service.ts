import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Main api url to call api
  url = 'https://movies-store-api.herokuapp.com';
  // url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  // To Get The List Of Movie
  getMovies(page: number, sortBy?: string, perPage = 8, noYear = 1) {
    let sort = '';
    let asc = 1;
    if (sortBy == 'year-asc') {
      sort = 'year';
      asc = 1;
    }
    if (sortBy == 'year-desc') {
      sort = 'year';
      asc = -1;
    }
    if (sortBy == 'name-asc') {
      sort = 'name';
      asc = 1;
    }
    if (sortBy == 'name-desc') {
      sort = 'name';
      asc = -1;
    }
    return this.http.get(
      `${this.url}/movies/?page=${page}&sortBy=${sort}&asc=${asc}&perPage=${perPage}&noYear=${noYear}`
    );
  }
  // To filter Movies
  filterMovies(page: number, sortBy: string, filterparams: any) {
    let perPage = 14;
    let sort = '';
    let asc = 1;
    if (sortBy == 'year-asc') {
      sort = 'year';
      asc = 1;
    }
    if (sortBy == 'year-desc') {
      sort = 'year';
      asc = -1;
    }
    if (sortBy == 'name-asc') {
      sort = 'name';
      asc = 1;
    }
    if (sortBy == 'name-desc') {
      sort = 'name';
      asc = -1;
    }
    return this.http.post(
      `${this.url}/filter/?page=${page}&sortBy=${sort}&asc=${asc}&perPage=${perPage}`,
      filterparams
    );
  }

  // To Get Movie Details For Single Record Using Id
  getMovieById(movie_id: string) {
    return this.http.get(`${this.url}/movies/${movie_id}`);
  }

  // To Updated Specific Movie
  updateMovie(movie_id: string, body: any) {
    return this.http.put(`${this.url}/movies/${movie_id}`, body);
  }

  // To Create/Add New Movie
  addMovie(movie: Movie) {
    return this.http.post(`${this.url}/movies`, movie);
  }

  // To Delete Any Movie
  deleteMovie(movie_id: string) {
    return this.http.delete(`${this.url}/movies/${movie_id}`);
  }
  search(
    key: string,
    page: number = 1,
    perPage: number = 10,
    searchFor = 'name'
  ) {
    return this.http.get(
      `${this.url}/search/${key}?page=${page}&perPage=${perPage}&searchFor=${searchFor}`
    );
  }
  getMovieCount() {
    return this.http.get(`${this.url}/movie-count`);
  }
  webScarp(_id: string) {
    return this.http.get(`${this.url}/web/scrap/${_id}`);
  }
}
