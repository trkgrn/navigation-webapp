package com.navigation.entity.dtos;

import com.navigation.entity.concretes.Coordinate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private Long addressId;
    private Integer orderNo;
    private String sehir;
    private String ilce;
    private String mahalle;
    private String sokak;
    private String binaNo;
    private String daireNo;
    private Coordinate coordinate;

}
