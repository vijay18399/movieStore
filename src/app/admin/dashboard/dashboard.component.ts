import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isModerator: Boolean = false;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private tokenStorageService: TokenStorageService
  ) {}
  isAdmin: Boolean = false;
  movie_count = 0;
  user_count = 0;
  ngOnInit(): void {
    this.isAdmin = this.tokenStorageService.getUser().roles.includes('admin');
    this.isModerator = this.tokenStorageService
      .getUser()
      .roles.includes('moderator');
    this.apiService.getMovieCount().subscribe((data: any) => {
      this.movie_count = data.movie_count;
    });
    this.authService.getUserCount().subscribe((data: any) => {
      this.user_count = data.user_count;
    });
  }
}
