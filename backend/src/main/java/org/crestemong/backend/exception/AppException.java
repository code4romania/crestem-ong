package org.crestemong.backend.exception;

import org.crestemong.backend.model.MessageKey;

public abstract class AppException extends RuntimeException {

    private String messageKey;

    public AppException(String messageKey) {
        super(messageKey != null ? messageKey : MessageKey.GENERIC_ERROR);
    }
}
