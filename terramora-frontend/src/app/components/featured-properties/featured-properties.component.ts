import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Property, PropertyService } from '../../services/property.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './featured-properties.component.html',
  styleUrl: './featured-properties.component.css'
})
export class FeaturedPropertiesComponent implements OnInit {
  featuredProperties: Property[] = [];
  isLoading = true;

  constructor(
    private propertyService: PropertyService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.propertyService.getFeaturedProperties().subscribe({
      next: (data) => {
        this.featuredProperties = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar propiedades destacadas', error);
        this.isLoading = false;
      }
    });
  }

  getCardImage(property: Property): string {
    const imageUrl = property.images && property.images.length > 0 ? property.images[0] : '';
    return this.imageService.getCardImage(imageUrl);
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