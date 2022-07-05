import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });
  loading = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  onSubmit(): void {
    this.loading = true;
    const { username, email, password } = this.registerForm.value;
    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.loading = false;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.successMessage = data.message;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
