/**
 * login.component.ts
 *
 * WHY:
 * Login page component.
 * Uses Angular Material form fields, buttons, icons, and validation.
 */

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  /**
   * Typed reactive login form.
   *
   * WHY:
   * Using a typed form prevents template errors for:
   * `loginForm.controls.email`
   * and
   * `loginForm.controls.password`
   */
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    /**
     * Initialize form inside constructor.
     *
     * WHY:
     * `this.fb` is available only after dependency injection.
     * Prevents:
     * "Property 'fb' is used before its initialization"
     */
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Submit login form and navigate to dashboard on success.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;

          // Navigate to dashboard/home
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;

          // Show backend error if available
          this.errorMessage =
            error.error?.message || 'Login failed. Please try again.';
        },
      });
  }
}