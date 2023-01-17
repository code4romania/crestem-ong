package org.crestemong.backend.exception;

public class ActionAlreadyPerformedException extends AppException {

    public ActionAlreadyPerformedException(String messageKey) {
        super(messageKey);
    }
}
