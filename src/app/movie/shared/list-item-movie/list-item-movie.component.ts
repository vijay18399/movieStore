import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-list-item-movie',
  templateUrl: './list-item-movie.component.html',
  styleUrls: ['./list-item-movie.component.css'],
})
export class ListItemMovieComponent implements OnInit {
  constructor() {}
  @Input() movie!: Movie;
  ngOnInit(): void {}
}
