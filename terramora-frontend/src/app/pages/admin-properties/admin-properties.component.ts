import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Property, PropertyPayload, PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './admin-properties.component.html',
  styleUrl: './admin-properties.component.css'
})
export class AdminPropertiesComponent implements OnInit {
  properties: Property[] = [];
  isLoading = true;
  isEditing = false;
  editingId: number | null = null;

  validationErrors: string[] = [];
  successMessage = '';
  errorMessage = '';

  selectedFiles: File[] = [];
  isUploadingImages = false;
  uploadSuccessMessage = '';
  uploadErrorMessage = '';

  readonly maxImages = 10;
  readonly maxImageSizeMb = 8;

  adminSearchTerm = '';
  adminFilterOperation = '';
  adminFilterType = '';
  currentPage = 1;
  itemsPerPage = 6;

  form = {
    title: '',
    description: '',
    operation: 'VENTA',
    type: 'CASA',
    price: 0,
    currency: 'USD',
    location: '',
    city: '',
    province: 'Córdoba',
    bedrooms: null as number | null,
    bathrooms: null as number | null,
    area: 0,
    coveredArea: null as number | null,
    featured: false,
    imagesText: '',
    featuresText: ''
  };

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  get filteredAdminProperties(): Property[] {
    const search = this.adminSearchTerm.toLowerCase().trim();

    return this.properties.filter(property => {
      const matchesSearch =
        !search ||
        property.title.toLowerCase().includes(search) ||
        property.city.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search) ||
        property.type.toLowerCase().includes(search) ||
        property.operation.toLowerCase().includes(search);

      const matchesOperation =
        !this.adminFilterOperation || property.operation === this.adminFilterOperation;

      const matchesType =
        !this.adminFilterType || property.type === this.adminFilterType;

      return matchesSearch && matchesOperation && matchesType;
    });
  }

  get paginatedAdminProperties(): Property[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAdminProperties.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAdminProperties.length / this.itemsPerPage));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  loadProperties(): void {
    this.isLoading = true;

    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.currentPage = 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar propiedades', error);
        this.isLoading = false;
        this.errorMessage = 'No se pudieron cargar las propiedades.';
      }
    });
  }

  saveProperty(): void {
    this.clearMessages();

    const errors = this.validateForm();

    if (errors.length > 0) {
      this.validationErrors = errors;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const payload: PropertyPayload = {
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      operation: this.form.operation as PropertyPayload['operation'],
      type: this.form.type as PropertyPayload['type'],
      price: Number(this.form.price),
      currency: this.form.currency as PropertyPayload['currency'],
      location: this.form.location.trim(),
      city: this.form.city.trim(),
      province: this.form.province.trim(),
      bedrooms: this.normalizeOptionalNumber(this.form.bedrooms),
      bathrooms: this.normalizeOptionalNumber(this.form.bathrooms),
      area: Number(this.form.area),
      coveredArea: this.normalizeOptionalNumber(this.form.coveredArea),
      featured: this.form.featured,
      images: this.parseLines(this.form.imagesText),
      features: this.parseLines(this.form.featuresText)
    };

    if (this.isEditing && this.editingId !== null) {
      this.propertyService.updateProperty(this.editingId, payload).subscribe({
        next: () => {
          this.loadProperties();
          this.resetForm();
          this.successMessage = 'Propiedad actualizada correctamente.';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (error) => {
          console.error('Error al actualizar propiedad', error);
          this.errorMessage = 'No se pudo actualizar la propiedad.';
        }
      });

      return;
    }

    this.propertyService.createProperty(payload).subscribe({
      next: () => {
        this.loadProperties();
        this.resetForm();
        this.successMessage = 'Propiedad creada correctamente.';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        console.error('Error al crear propiedad', error);
        this.errorMessage = 'No se pudo crear la propiedad.';
      }
    });
  }

  editProperty(property: Property): void {
    this.clearMessages();

    this.isEditing = true;
    this.editingId = property.id;

    this.form = {
      title: property.title,
      description: property.description,
      operation: property.operation,
      type: property.type,
      price: property.price,
      currency: property.currency,
      location: property.location,
      city: property.city,
      province: property.province,
      bedrooms: property.bedrooms ?? null,
      bathrooms: property.bathrooms ?? null,
      area: property.area,
      coveredArea: property.coveredArea ?? null,
      featured: property.featured,
      imagesText: property.images.join('\n'),
      featuresText: property.features.join('\n')
    };

    this.selectedFiles = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProperty(id: number): void {
    const confirmed = confirm('¿Seguro que querés eliminar esta propiedad?');

    if (!confirmed) {
      return;
    }

    this.clearMessages();

    this.propertyService.deleteProperty(id).subscribe({
      next: () => {
        this.properties = this.properties.filter(property => property.id !== id);

        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }

        this.successMessage = 'Propiedad eliminada correctamente.';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        console.error('Error al eliminar propiedad', error);
        this.errorMessage = 'No se pudo eliminar la propiedad.';
      }
    });
  }

  onAdminFiltersChange(): void {
    this.currentPage = 1;
  }

  clearAdminFilters(): void {
    this.adminSearchTerm = '';
    this.adminFilterOperation = '';
    this.adminFilterType = '';
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  onFilesSelected(event: Event): void {
    this.uploadSuccessMessage = '';
    this.uploadErrorMessage = '';

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFiles = [];
      return;
    }

    const files = Array.from(input.files);
    const currentImageCount = this.parseLines(this.form.imagesText).length;

    if (currentImageCount + files.length > this.maxImages) {
      this.selectedFiles = [];
      this.uploadErrorMessage = `Podés cargar como máximo ${this.maxImages} imágenes por propiedad.`;
      input.value = '';
      return;
    }

    const invalidFile = files.find(file => !file.type.startsWith('image/'));

    if (invalidFile) {
      this.selectedFiles = [];
      this.uploadErrorMessage = `El archivo "${invalidFile.name}" no es una imagen válida.`;
      input.value = '';
      return;
    }

    const maxSizeBytes = this.maxImageSizeMb * 1024 * 1024;
    const heavyFile = files.find(file => file.size > maxSizeBytes);

    if (heavyFile) {
      this.selectedFiles = [];
      this.uploadErrorMessage = `La imagen "${heavyFile.name}" supera los ${this.maxImageSizeMb}MB.`;
      input.value = '';
      return;
    }

    this.selectedFiles = files;
  }

  uploadSelectedImages(): void {
    this.uploadSuccessMessage = '';
    this.uploadErrorMessage = '';

    if (this.selectedFiles.length === 0) {
      this.uploadErrorMessage = 'Seleccioná al menos una imagen para subir.';
      return;
    }

    this.isUploadingImages = true;

    this.propertyService.uploadImages(this.selectedFiles).subscribe({
      next: (response) => {
        const currentImages = this.parseLines(this.form.imagesText);
        const newImages = response.urls;

        this.form.imagesText = [...currentImages, ...newImages].join('\n');

        this.selectedFiles = [];
        this.isUploadingImages = false;
        this.uploadSuccessMessage = 'Imágenes subidas correctamente a Cloudinary.';
      },
      error: (error) => {
        console.error('Error al subir imágenes', error);
        this.isUploadingImages = false;
        this.uploadErrorMessage = 'No se pudieron subir las imágenes.';
      }
    });
  }

  removeImageUrl(imageUrl: string): void {
    const images = this.parseLines(this.form.imagesText)
      .filter(image => image !== imageUrl);

    this.form.imagesText = images.join('\n');
  }

  moveImageUp(index: number): void {
    if (index <= 0) {
      return;
    }

    const images = this.parseLines(this.form.imagesText);
    const current = images[index];

    images[index] = images[index - 1];
    images[index - 1] = current;

    this.form.imagesText = images.join('\n');
  }

  moveImageDown(index: number): void {
    const images = this.parseLines(this.form.imagesText);

    if (index >= images.length - 1) {
      return;
    }

    const current = images[index];

    images[index] = images[index + 1];
    images[index + 1] = current;

    this.form.imagesText = images.join('\n');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;

    this.form = {
      title: '',
      description: '',
      operation: 'VENTA',
      type: 'CASA',
      price: 0,
      currency: 'USD',
      location: '',
      city: '',
      province: 'Córdoba',
      bedrooms: null,
      bathrooms: null,
      area: 0,
      coveredArea: null,
      featured: false,
      imagesText: '',
      featuresText: ''
    };

    this.validationErrors = [];
    this.selectedFiles = [];
    this.uploadSuccessMessage = '';
    this.uploadErrorMessage = '';
  }

  validateForm(): string[] {
    const errors: string[] = [];
    const images = this.parseLines(this.form.imagesText);

    if (!this.form.title.trim()) {
      errors.push('El título es obligatorio.');
    }

    if (!this.form.description.trim()) {
      errors.push('La descripción es obligatoria.');
    }

    if (!this.form.location.trim()) {
      errors.push('La ubicación o zona es obligatoria.');
    }

    if (!this.form.city.trim()) {
      errors.push('La ciudad es obligatoria.');
    }

    if (Number(this.form.price) <= 0) {
      errors.push('El precio debe ser mayor a 0.');
    }

    if (Number(this.form.area) <= 0) {
      errors.push('La superficie total debe ser mayor a 0.');
    }

    if (this.form.coveredArea !== null && Number(this.form.coveredArea) < 0) {
      errors.push('La superficie cubierta no puede ser negativa.');
    }

    if (this.form.bedrooms !== null && Number(this.form.bedrooms) < 0) {
      errors.push('La cantidad de dormitorios no puede ser negativa.');
    }

    if (this.form.bathrooms !== null && Number(this.form.bathrooms) < 0) {
      errors.push('La cantidad de baños no puede ser negativa.');
    }

    if (images.length === 0) {
      errors.push('Agregá al menos una imagen.');
    }

    if (images.length > this.maxImages) {
      errors.push(`La propiedad no puede tener más de ${this.maxImages} imágenes.`);
    }

    if (this.parseLines(this.form.featuresText).length === 0) {
      errors.push('Agregá al menos una característica.');
    }

    return errors;
  }

  clearMessages(): void {
    this.validationErrors = [];
    this.successMessage = '';
    this.errorMessage = '';
  }

  normalizeOptionalNumber(value: number | null): number | null {
    if (value === null || value === undefined) {
      return null;
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return null;
    }

    return numberValue;
  }

  parseLines(value: string): string[] {
    return value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
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