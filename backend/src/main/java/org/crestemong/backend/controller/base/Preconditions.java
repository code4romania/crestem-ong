package org.crestemong.backend.controller.base;

import org.apache.commons.lang3.BooleanUtils;
import org.crestemong.backend.exception.ResourceNotFoundException;

public final class Preconditions {

    public static <T> T exists(T entity, String messageKey) {
        if (entity == null) {
            throw new ResourceNotFoundException(messageKey);
        }
        return entity;
    }

    public static void exists(Boolean entity, String messageKey) {
        if (BooleanUtils.isNotTrue(entity)) {
            throw new ResourceNotFoundException(messageKey);
        }
    }
}
