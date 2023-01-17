package org.crestemong.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

@Service
public class MessagesService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private final ResourceBundleMessageSource messageSource;

    @Autowired
    public MessagesService(final ResourceBundleMessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String getMessage(final String code) {
        return doGetMessage(code, null);
    }

    public String getMessage(final String code, Object... varArgs) {
        final Object[] args = new Object[varArgs.length];
        int i = 0;
        for (final Object varArg : varArgs) {
            args[i++] = varArg;
        }
        return doGetMessage(code, args);
    }

    private String doGetMessage(final String code, Object[] args) {
        try {
            return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException exception) {
            LOGGER.warn("No message found for message key: " + code);
        }
        return code;
    }

    public String getMessage(final FieldError fieldError) {
        try {
            return messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
        } catch (NoSuchMessageException exception) {
            LOGGER.warn("No message found for message key: " + fieldError.getCode());
        }
        return fieldError.getCode();
    }
}
