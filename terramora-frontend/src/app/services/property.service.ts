import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type OperationType = 'VENTA' | 'ALQUILER';
export type PropertyType = 'CASA' | 'DEPARTAMENTO' | 'TERRENO' | 'LOCAL' | 'CAMPO' | 'GALPON' | 'COCHERA';

export interface Property {
  id: number;
  title: string;
  description: string;
  operation: OperationType;
  type: PropertyType;
  price: number;
  currency: 'USD' | '$';
  location: string;
  city: string;
  province: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area: number;
  coveredArea?: number | null;
  featured: boolean;
  images: string[];
  features: string[];
}

export type PropertyPayload = Omit<Property, 'id'>;

interface UploadImagesResponse {
  urls: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly apiUrl = `${environment.apiUrl}/properties`;
  private readonly uploadUrl = `${environment.apiUrl}/uploads/images`;

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getFeaturedProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/featured`);
  }

  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  createProperty(property: PropertyPayload): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  updateProperty(id: number, property: PropertyPayload): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImages(files: File[]): Observable<UploadImagesResponse> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post<UploadImagesResponse>(this.uploadUrl, formData);
  }
}