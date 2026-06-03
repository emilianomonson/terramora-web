package com.terramora.backend.config;

import com.terramora.backend.enums.OperationType;
import com.terramora.backend.enums.PropertyType;
import com.terramora.backend.model.Property;
import com.terramora.backend.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PropertyRepository propertyRepository;

    @Override
    public void run(String... args) {
        if (propertyRepository.count() > 0) {
            return;
        }

        Property casa = Property.builder()
                .title("Casa moderna premium")
                .description("Propiedad moderna con espacios amplios, excelente iluminación natural y terminaciones premium.")
                .operation(OperationType.VENTA)
                .type(PropertyType.CASA)
                .price(new BigDecimal("180000"))
                .currency("USD")
                .location("Zona residencial")
                .city("Río Tercero")
                .province("Córdoba")
                .bedrooms(3)
                .bathrooms(2)
                .area(280)
                .coveredArea(180)
                .featured(true)
                .images(List.of(
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
                ))
                .features(List.of("Cochera", "Patio", "Cocina integrada", "Living amplio", "Excelente iluminación"))
                .build();

        Property departamento = Property.builder()
                .title("Depto luminoso céntrico")
                .description("Departamento cómodo, luminoso y funcional, ubicado cerca de comercios y puntos clave.")
                .operation(OperationType.ALQUILER)
                .type(PropertyType.DEPARTAMENTO)
                .price(new BigDecimal("450000"))
                .currency("$")
                .location("Centro")
                .city("Córdoba")
                .province("Córdoba")
                .bedrooms(2)
                .bathrooms(1)
                .area(75)
                .coveredArea(70)
                .featured(true)
                .images(List.of(
                        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop"
                ))
                .features(List.of("Balcón", "Cocina separada", "Ascensor", "Buena ubicación", "Luminoso"))
                .build();

        Property terreno = Property.builder()
                .title("Terreno en zona estratégica")
                .description("Terreno con excelente ubicación, ideal para construir vivienda familiar o inversión.")
                .operation(OperationType.VENTA)
                .type(PropertyType.TERRENO)
                .price(new BigDecimal("35000"))
                .currency("USD")
                .location("Loteo abierto")
                .city("Almafuerte")
                .province("Córdoba")
                .area(600)
                .featured(true)
                .images(List.of(
                        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop"
                ))
                .features(List.of("600m²", "Zona en crecimiento", "Acceso rápido", "Ideal inversión", "Entorno natural"))
                .build();

        propertyRepository.saveAll(List.of(casa, departamento, terreno));
    }
}