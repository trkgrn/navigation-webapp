package com.example.navigation.core.utilities.results;

public class ErrorDataResult<T> extends DataResult {
    public ErrorDataResult(T data, String message) {
        super(data,false, message);
    }

    public ErrorDataResult(T data) {
        super(data, false);
    }
}
