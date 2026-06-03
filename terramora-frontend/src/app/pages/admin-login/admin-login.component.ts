import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NavbarComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Completá email y contraseña.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;

        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/propiedades';

        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Email o contraseña incorrectos.';
      }
    });
  }
}