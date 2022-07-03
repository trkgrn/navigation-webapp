package com.example.navigation.core.utilities.results;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Result {
    private boolean success;
    private String message;

    public Result(boolean success){
        this.success = success;
    }
    public Result(boolean success, String message){
        this(success);
        this.message = message;
    }
}
