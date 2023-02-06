package org.crestemong.backend.mapper;

import org.crestemong.api.model.NewsletterSubscriptionDTO;
import org.crestemong.backend.model.NewsletterSubscription;
import org.mapstruct.Mapper;

@Mapper
public interface NewsletterSubscriptionMapper extends AppMapper<NewsletterSubscription, NewsletterSubscriptionDTO> {
}
