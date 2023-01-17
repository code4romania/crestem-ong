package org.crestemong.backend.exception;

import org.crestemong.backend.model.MessageKey;

public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String messageKey) {
        super(messageKey);
    }
}
