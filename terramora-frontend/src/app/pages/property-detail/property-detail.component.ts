import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Property, PropertyService } from '../../services/property.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  property?: Property;
  selectedImage = '';
  isLoading = true;

  whatsappNumber = '5493571614279';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.propertyService.getPropertyById(id).subscribe({
      next: (data) => {
        this.property = data;
        this.selectedImage = data.images && data.images.length > 0 ? data.images[0] : '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar detalle de propiedad', error);
        this.isLoading = false;
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  getDetailImage(imageUrl: string): string {
    return this.imageService.getDetailImage(imageUrl);
  }

  getThumbnailImage(imageUrl: string): string {
    return this.imageService.getThumbnailImage(imageUrl);
  }

  openWhatsApp(): void {
    if (!this.property) {
      return;
    }

    const currentUrl = window.location.href;

    const message = `
Hola, quiero consultar por esta propiedad:

${this.property.title}

Tipo: ${this.formatType(this.property.type)}
Operación: ${this.formatOperation(this.property.operation)}
Ubicación: ${this.property.location} · ${this.property.city}
Precio: ${this.property.currency} ${this.property.price.toLocaleString('es-AR')}

Link: ${currentUrl}

¿Podrían brindarme más información?
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }

  formatOperation(operation: string): string {
    const values: Record<string, string> = {
      VENTA: 'Venta',
      ALQUILER: 'Alquiler'
    };

    return values[operation] || operation;
  }

  formatType(type: string): string {
    const values: Record<string, string> = {
      CASA: 'Casa',
      DEPARTAMENTO: 'Departamento',
      TERRENO: 'Terreno',
      LOCAL: 'Local',
      CAMPO: 'Campo',
      GALPON: 'Galpón',
      COCHERA: 'Cochera'
    };

    return values[type] || type;
  }
}