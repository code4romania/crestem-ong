package org.crestemong.backend.config.validation;

import jakarta.validation.MessageInterpolator;

import java.util.Locale;

public class AppMessageInterpolator implements MessageInterpolator {

    private final MessageInterpolator defaultInterpolator;

    public AppMessageInterpolator(MessageInterpolator interpolator) {
        this.defaultInterpolator = interpolator;
    }

    @Override
    public String interpolate(String messageTemplate, Context context) {
        messageTemplate = messageTemplate.toUpperCase();
        return defaultInterpolator.interpolate(messageTemplate, context);
    }

    @Override
    public String interpolate(String messageTemplate, Context context, Locale locale) {
        messageTemplate = messageTemplate.toUpperCase();
        return defaultInterpolator.interpolate(messageTemplate, context, locale);
    }
}
