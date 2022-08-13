package com.navigation.entity.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;
import org.hibernate.annotations.Type;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "route", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","addressList"})
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="route_id")
    private Long routeId;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "avg_distance")
    private Long averageDistance;

    @Column(name = "avg_duration")
    private Long averageDuration;

    @Column(name = "map_data",columnDefinition = "TEXT")
    private String mapData;

    @OneToMany(mappedBy = "route",targetEntity = Address.class)
    private List<Address> addressList;

    @ManyToOne()
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @OneToOne
    @JoinColumn(name = "origin_id",referencedColumnName = "warehouse_id")
    private Warehouse origin;

    @OneToOne
    @JoinColumn(name = "destination_id",referencedColumnName = "warehouse_id")
    private Warehouse destination;

}
