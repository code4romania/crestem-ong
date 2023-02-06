package org.crestemong.backend.controller;

import org.crestemong.api.NewsletterApi;
import org.crestemong.api.model.NewsletterSubscriptionDTO;
import org.crestemong.backend.controller.base.ApiV1Controller;
import org.crestemong.backend.service.NewsletterSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsletterSubscriptionController extends ApiV1Controller implements NewsletterApi {
    private final NewsletterSubscriptionService service;

    @Autowired
    public NewsletterSubscriptionController(
            final NewsletterSubscriptionService service
    ) {
        this.service = service;
    }

    @Override
    public ResponseEntity<NewsletterSubscriptionDTO> subscribe(NewsletterSubscriptionDTO newsletterSubscriptionDTO) {
        NewsletterSubscriptionDTO savedNewsletterSubscriptionDTO = service.save(newsletterSubscriptionDTO);
        return ResponseEntity.ok().body(savedNewsletterSubscriptionDTO);
    }
}
