package com.navigation.entity.concretes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "drivers_of_vehicles", schema = "public")
public class DriversOfVehicles {

    @EmbeddedId
    private DriversOfVehiclesId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("vehicleId")
    @JoinColumn(name = "vehicle_id",referencedColumnName = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("driverId")
    @JoinColumn(name = "driver_id",referencedColumnName = "driver_id")
    private Driver driver;

    @OneToOne
    @JoinColumn(name = "driver_type_id",referencedColumnName = "driver_type_id")
    private DriverType type;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;


}
