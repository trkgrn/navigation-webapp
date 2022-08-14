package com.navigation.entity.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {
    private Long vehicleId;
    private String name;
    private String modelName;
    private String license;
}
