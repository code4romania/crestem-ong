package org.crestemong.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class NewsletterSubscription extends AbstractEntity {
    @Column(nullable = false, unique = true)
    private String email;
}
