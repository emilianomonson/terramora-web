package com.terramora.backend.repository;

import com.terramora.backend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByFeaturedTrue();

}