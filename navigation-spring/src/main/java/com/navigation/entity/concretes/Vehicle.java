package com.navigation.entity.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "vehicle", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","drivers"})
public class Vehicle {
    @Id
    @Column(name = "vehicle_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @Column(name = "name",unique = true)
    private String name;

    @Column(name = "model")
    private String modelName;

    @Column (name = "license",unique = true)
    private String license;

    @OneToMany(
            mappedBy = "vehicle",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            targetEntity = DriversOfVehicles.class
    )
    private List<DriversOfVehicles> drivers = new ArrayList<>();

}
