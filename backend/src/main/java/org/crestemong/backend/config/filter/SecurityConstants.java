package org.crestemong.backend.config.filter;

import java.util.concurrent.TimeUnit;

public class SecurityConstants {

    public static final String TOKEN_SECRET = "SecretKeyToGenJWTs";
    public static final String COOKIE_SECRET = "SecretKeyToGenJWTs";
    public static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = TimeUnit.HOURS.toSeconds(1); // 1 hour
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = Integer.MAX_VALUE;
}
