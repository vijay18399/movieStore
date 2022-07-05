import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/shared/dialog-message/dialog-message.component';
@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movie_id: any;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private matDialog: MatDialog
  ) {}
  genre = '';
  actor = '';
  director = '';
  movie!: Movie;
  ngOnInit(): void {
    this.movie_id = this.route.snapshot.params['movie_id'];
    this.getMovie(this.movie_id);
  }
  getMovie(movie_id: string) {
    this.loading = true;
    this.apiService.getMovieById(movie_id).subscribe((data: any) => {
      this.loading = false;
      this.movie = data;
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
  Update() {
    this.loading = true;
    this.apiService
      .updateMovie(this.movie_id, this.movie)
      .subscribe((data: any) => {
        this.loading = false;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = 'Movie Updated Successfully';
        this.matDialog.open(DialogMessageComponent, dialogConfig);
        this.movie = data;
      });
  }
  formatdate(date: any) {
    return formatDate(date, 'dd-MM-yyyy', 'en');
  }
}
