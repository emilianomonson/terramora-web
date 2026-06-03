package com.terramora.backend.controller;

import com.terramora.backend.model.Property;
import com.terramora.backend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/featured")
    public List<Property> getFeaturedProperties() {
        return propertyService.getFeaturedProperties();
    }

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public Property updateProperty(
            @PathVariable Long id,
            @RequestBody Property property
    ) {
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
}