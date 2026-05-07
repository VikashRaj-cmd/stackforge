/**
 * register.component.ts
 *
 * WHY:
 * Register page component.
 * Creates a new user using backend API.
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
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  /**
   * Register form instance.
   *
   * WHY:
   * Form must be initialized after dependency injection.
   */
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    /**
     * Initialize register form.
     *
     * WHY:
     * Prevents:
     * "Property 'fb' is used before its initialization"
     */
    this.registerForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Submit register form.
   * After successful registration, redirect user to login page.
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService
      .register({
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.successMessage =
            'Account created successfully. Please login.';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 800);
        },

        error: (error) => {
          this.isLoading = false;

          this.errorMessage =
            error.error?.message ||
            'Registration failed. Please try again.';
        },
      });
  }
}