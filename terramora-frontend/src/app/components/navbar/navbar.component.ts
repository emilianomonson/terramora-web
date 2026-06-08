import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;

  private readonly whatsappNumber = '5493571614279';

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  goToHome(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    this.closeMenu();
  }

  goToHomeSection(sectionId: string): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 150);
    });

    this.closeMenu();
  }

  openWhatsApp(): void {
    const message = `
Hola, quiero agendar una asesoría inmobiliaria con Terramora.

¿Podrían brindarme más información?
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    this.closeMenu();
  }
}