package com.navigation.entity.concretes;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "address", schema = "public")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="address_id")
    private Long addressId;

    @Column(name = "order_no")
    private Integer orderNo;

    @Column(name = "sehir")
    private String sehir;

    @Column(name = "ilce")
    private String ilce;

    @Column(name = "mahalle")
    private String mahalle;

    @Column(name = "sokak")
    private String sokak;

    @Column(name = "bina_no")
    private String binaNo;

    @Column(name = "daire_no")
    private String daireNo;

    @ManyToOne()
    @JoinColumn(name = "route_id")
    private Route route;

    @OneToOne()
    @JoinColumn(name = "coordinate_id",referencedColumnName = "coordinate_id")
    private Coordinate coordinate;

}
