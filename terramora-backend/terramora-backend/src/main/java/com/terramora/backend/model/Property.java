package com.terramora.backend.model;

import com.terramora.backend.enums.OperationType;
import com.terramora.backend.enums.PropertyType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OperationType operation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType type;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String city;

    private String province;

    private Integer bedrooms;

    private Integer bathrooms;

    private Integer area;

    private Integer coveredArea;

    private Boolean featured;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "property_images",
            joinColumns = @JoinColumn(name = "property_id")
    )
    @Column(name = "image_url", length = 1200)
    private List<String> images = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "property_features",
            joinColumns = @JoinColumn(name = "property_id")
    )
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();
}