package org.crestemong.backend.service.impl;

import org.crestemong.api.model.NewsletterSubscriptionDTO;
import org.crestemong.backend.mapper.NewsletterSubscriptionMapper;
import org.crestemong.backend.model.NewsletterSubscription;
import org.crestemong.backend.repository.NewsletterSubscriptionRepository;
import org.crestemong.backend.service.NewsletterSubscriptionService;
import org.springframework.stereotype.Service;

@Service
public class NewsletterSubscriptionServiceImpl extends AbstractServiceImpl<NewsletterSubscription, NewsletterSubscriptionDTO> implements NewsletterSubscriptionService {

    private final NewsletterSubscriptionRepository repository;
    private final NewsletterSubscriptionMapper mapper;

    public NewsletterSubscriptionServiceImpl(
            final NewsletterSubscriptionRepository repository,
            final NewsletterSubscriptionMapper mapper
    ) {
        super(repository, mapper);
        this.repository = repository;
        this.mapper = mapper;
    }
}
