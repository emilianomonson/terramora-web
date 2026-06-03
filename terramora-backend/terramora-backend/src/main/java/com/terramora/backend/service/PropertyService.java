package com.terramora.backend.service;

import com.terramora.backend.model.Property;
import com.terramora.backend.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Transactional(readOnly = true)
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Property> getFeaturedProperties() {
        return propertyRepository.findByFeaturedTrue();
    }

    @Transactional(readOnly = true)
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Propiedad no encontrada con id: " + id
                ));
    }

    @Transactional
    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Transactional
    public Property updateProperty(Long id, Property updatedProperty) {
        Property property = getPropertyById(id);

        property.setTitle(updatedProperty.getTitle());
        property.setDescription(updatedProperty.getDescription());
        property.setOperation(updatedProperty.getOperation());
        property.setType(updatedProperty.getType());
        property.setPrice(updatedProperty.getPrice());
        property.setCurrency(updatedProperty.getCurrency());
        property.setLocation(updatedProperty.getLocation());
        property.setCity(updatedProperty.getCity());
        property.setProvince(updatedProperty.getProvince());
        property.setBedrooms(updatedProperty.getBedrooms());
        property.setBathrooms(updatedProperty.getBathrooms());
        property.setArea(updatedProperty.getArea());
        property.setCoveredArea(updatedProperty.getCoveredArea());
        property.setFeatured(updatedProperty.getFeatured());
        property.setImages(updatedProperty.getImages());
        property.setFeatures(updatedProperty.getFeatures());

        return propertyRepository.save(property);
    }

    @Transactional
    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se puede eliminar. Propiedad no encontrada con id: " + id
                ));

        propertyRepository.delete(property);
    }
}