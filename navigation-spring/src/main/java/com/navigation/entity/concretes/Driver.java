package com.navigation.entity.concretes;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "driver", schema = "public")
public class Driver {
    @Id
    @Column(name = "driver_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;

    @OneToOne()
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private User user;


    @OneToMany(
            mappedBy = "driver",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            targetEntity = DriversOfVehicles.class
    )
    private List<DriversOfVehicles> vehicles = new ArrayList<>();
}
