package org.crestemong.backend.service;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Date;

public final class AppTimeService {

    public static OffsetDateTime toOffsetDateTime(Date date) {
        if (date == null) {
            return null;
        }
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toOffsetDateTime();
    }

    public static Date toDate(OffsetDateTime offsetDateTime) {
        return Date.from(
                offsetDateTime
                        .atZoneSameInstant(ZoneId.systemDefault())
                        .toInstant()
        );
    }
}
