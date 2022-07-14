package com.example.navigation.entity.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
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

    @Column(name = "route_date")
    private Date routeDate;

    @OneToMany(mappedBy = "route",targetEntity = Address.class)
    private List<Address> addressList;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;
}
