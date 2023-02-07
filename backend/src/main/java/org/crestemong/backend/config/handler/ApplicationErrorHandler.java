package org.crestemong.backend.config.handler;

import com.google.common.base.CaseFormat;
import org.crestemong.api.model.ApiResponseDTO;
import org.crestemong.api.model.FieldErrorDTO;
import org.crestemong.backend.exception.ActionAlreadyPerformedException;
import org.crestemong.backend.exception.ResourceNotFoundException;
import org.crestemong.backend.model.MessageKey;
import org.crestemong.backend.service.MessagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class ApplicationErrorHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(ApplicationErrorHandler.class);
    private final MessagesService messagesService;

    @Autowired
    public ApplicationErrorHandler(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    // 403
    @ResponseBody
    @ExceptionHandler({ActionAlreadyPerformedException.class})
    public ResponseEntity<ApiResponseDTO> handleForbiddenException(final Throwable throwable) {
        logException(throwable);
        final ApiResponseDTO apiResponseDTO = buildApiResponseDTO(throwable.getMessage());
        return buildResponseEntity(HttpStatus.FORBIDDEN, apiResponseDTO);
    }

    // 404
    @ResponseBody
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ApiResponseDTO> handleResourceNotFound(final Throwable throwable) {
        logException(throwable);
        final ApiResponseDTO apiResponseDTO = buildApiResponseDTO(throwable.getMessage());
        return buildResponseEntity(HttpStatus.NOT_FOUND, apiResponseDTO);
    }

    // 422
    @ResponseBody
    @ExceptionHandler({MethodArgumentNotValidException.class, MaxUploadSizeExceededException.class})
    public ResponseEntity<ApiResponseDTO> handleMethodArgumentNotValid(final Throwable throwable) {
        logException(throwable);
        ApiResponseDTO apiResponseDTO = null;
        if (throwable instanceof MethodArgumentNotValidException) {
            apiResponseDTO = buildApiResponseDTO((MethodArgumentNotValidException) throwable);
        }
        if (apiResponseDTO == null) {
            apiResponseDTO = buildApiResponseDTO(throwable.getMessage());
        }
        return buildResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY, apiResponseDTO);
    }

    // 500
    @ResponseBody
    @ExceptionHandler({Throwable.class})
    public ResponseEntity<ApiResponseDTO> handleException(final Throwable throwable) {
        logException(throwable);
        throwable.printStackTrace();
        final ApiResponseDTO apiResponseDTO = buildApiResponseDTO(throwable.getMessage());
        return buildResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, apiResponseDTO);
    }

    private ApiResponseDTO buildApiResponseDTO(final String messageKeyValue) {
        final ApiResponseDTO apiResponseDTO = new ApiResponseDTO();
        apiResponseDTO.setMessage(messagesService.getMessage(messageKeyValue));
        return apiResponseDTO;
    }

    private ApiResponseDTO buildApiResponseDTO(final MethodArgumentNotValidException throwable) {
        ApiResponseDTO apiResponseDTO = buildApiResponseDTO(MessageKey.VALIDATION_FAILURE);
        List<ObjectError> allErrors = throwable.getBindingResult().getAllErrors();
        for (ObjectError objectError : allErrors) {
            String field;
            String errorCode;
            if (objectError instanceof FieldError fieldError) {
                field = fieldError.getField();
                errorCode = fieldError.getDefaultMessage();
            } else {
                field = objectError.getObjectName();
                errorCode = objectError.getDefaultMessage();
            }
            apiResponseDTO.addFieldErrorsItem(getFieldErrorDTO(field, errorCode));
        }
        return apiResponseDTO;
    }

    private FieldErrorDTO getFieldErrorDTO(String field, String messageKeyValue) {
        final FieldErrorDTO fieldErrorDTO = new FieldErrorDTO();
        fieldErrorDTO.setField(field);
        fieldErrorDTO.setMessage(messagesService.getMessage(messageKeyValue));
        return fieldErrorDTO;
    }

    private ResponseEntity<ApiResponseDTO> buildResponseEntity(
            final HttpStatus httpStatus,
            final ApiResponseDTO apiResponseDTO) {
        final MultiValueMap<String, String> headers = buildResponseHeaders();
        return new ResponseEntity<>(apiResponseDTO, headers, httpStatus);
    }

    private MultiValueMap<String, String> buildResponseHeaders() {
        final MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.put("Content-Type", Collections.singletonList(MediaType.APPLICATION_JSON.toString()));
        return headers;
    }

    private void logException(Throwable throwable) {
        LOGGER.warn(throwable.getMessage());
        LOGGER.debug(throwable.getMessage(), throwable);
    }
}
