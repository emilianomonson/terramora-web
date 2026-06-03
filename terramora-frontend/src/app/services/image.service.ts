import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  optimizeCloudinaryImage(
    imageUrl: string,
    width = 900,
    height = 620,
    crop = 'fill'
  ): string {
    if (!imageUrl) {
      return '';
    }

    const isCloudinaryImage = imageUrl.includes('res.cloudinary.com') && imageUrl.includes('/upload/');

    if (!isCloudinaryImage) {
      return imageUrl;
    }

    const transformation = `f_auto,q_auto,w_${width},h_${height},c_${crop}`;

    return imageUrl.replace('/upload/', `/upload/${transformation}/`);
  }

  getCardImage(imageUrl: string): string {
    return this.optimizeCloudinaryImage(imageUrl, 900, 620, 'fill');
  }

  getDetailImage(imageUrl: string): string {
    return this.optimizeCloudinaryImage(imageUrl, 1600, 950, 'fill');
  }

  getThumbnailImage(imageUrl: string): string {
    return this.optimizeCloudinaryImage(imageUrl, 420, 280, 'fill');
  }
}