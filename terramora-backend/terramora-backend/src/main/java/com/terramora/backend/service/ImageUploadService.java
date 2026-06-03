package com.terramora.backend.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageUploadService {

    private final Cloudinary cloudinary;

    public List<String> uploadImages(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            throw new RuntimeException("No se recibieron imágenes para subir.");
        }

        List<String> imageUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            validateImage(file);

            try {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        Map.of(
                                "folder", "terramora/properties",
                                "resource_type", "image"
                        )
                );

                String secureUrl = uploadResult.get("secure_url").toString();
                imageUrls.add(secureUrl);

            } catch (IOException e) {
                throw new RuntimeException("Error al leer la imagen: " + file.getOriginalFilename(), e);
            } catch (Exception e) {
                throw new RuntimeException("Error al subir imagen a Cloudinary: " + file.getOriginalFilename(), e);
            }
        }

        return imageUrls;
    }

    private void validateImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Una de las imágenes está vacía.");
        }

        String contentType = file.getContentType();

        if (contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("El archivo no es una imagen válida: " + file.getOriginalFilename());
        }
    }
}