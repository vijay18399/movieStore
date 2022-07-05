import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie_id: any;
  loading: boolean = true;
  errorMessage = '';
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  movie!: Movie;
  ngOnInit(): void {
    this.movie_id = this.route.snapshot.params['movie_id'];
    this.getMovie(this.movie_id);
  }
  getMovie(movie_id: string) {
    this.loading = true;
    this.apiService.getMovieById(movie_id).subscribe(
      (data: any) => {
        console.log(data);
        this.loading = false;
        this.movie = data;
      },
      (error: any) => {
        this.loading = false;
        this.errorMessage = error.error.message;
      }
    );
  }
}
