import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Property, PropertyService } from '../../services/property.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [NavbarComponent, FormsModule, RouterLink],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent implements OnInit {
  searchTerm = '';
  selectedOperation = '';
  selectedType = '';
  selectedLocation = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy = '';

  properties: Property[] = [];
  isLoading = true;

  currentPage = 1;
  itemsPerPage = 9;

  constructor(
    private propertyService: PropertyService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar propiedades', error);
        this.isLoading = false;
      }
    });
  }

  get filteredProperties(): Property[] {
    let result = this.properties.filter(property => {
      const search = this.searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        property.title.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search) ||
        property.city.toLowerCase().includes(search) ||
        property.type.toLowerCase().includes(search) ||
        property.operation.toLowerCase().includes(search);

      const matchesOperation =
        !this.selectedOperation || property.operation === this.selectedOperation;

      const matchesType =
        !this.selectedType || property.type === this.selectedType;

      const matchesLocation =
        !this.selectedLocation || property.city === this.selectedLocation;

      const matchesMinPrice =
        this.minPrice === null || property.price >= this.minPrice;

      const matchesMaxPrice =
        this.maxPrice === null || property.price <= this.maxPrice;

      return (
        matchesSearch &&
        matchesOperation &&
        matchesType &&
        matchesLocation &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    if (this.sortBy === 'Menor precio') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (this.sortBy === 'Mayor precio') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (this.sortBy === 'Más recientes') {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }

  get paginatedProperties(): Property[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProperties.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProperties.length / this.itemsPerPage));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  getCardImage(property: Property): string {
    const imageUrl = property.images && property.images.length > 0 ? property.images[0] : '';
    return this.imageService.getCardImage(imageUrl);
  }

  onFiltersChange(): void {
    this.currentPage = 1;
  }

  setType(type: string): void {
    this.selectedType = type;
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedOperation = '';
    this.selectedType = '';
    this.selectedLocation = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = '';
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    const section = document.getElementById('resultados-propiedades');

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
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