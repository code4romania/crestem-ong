package org.crestemong.backend.model;

public class MessageKey {
    public static String GENERIC_ERROR = "generic.error";

    public static class Auth {
        public static final String EMAIL_ALREADY_TAKEN = "auth.email.already.taken";
        public static final String LOGIN_SUCCESSFUL = "auth.login.successful";
        public static final String LOGIN_FAILURE = "auth.login.failure";
    }

    public static class Entity {
        public static final String NOT_FOUND = "entity.not.found";
    }

    public static class User {
        public static final String NOT_FOUND = "user.not.found";
    }
}
