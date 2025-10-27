import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, CommonModule]
})
export class SignupComponent {
  private router = inject(Router);
  
  submitted = signal(false);

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    this.submitted.set(true);
    
    if (this.signupForm.invalid) {
      return;
    }

    // Handle signup logic here
    console.log('Signup form submitted:', this.signupForm.value);
    
    // On success, navigate to dashboard to provide feedback
    this.router.navigate(['/dashboard']);
  }
}
