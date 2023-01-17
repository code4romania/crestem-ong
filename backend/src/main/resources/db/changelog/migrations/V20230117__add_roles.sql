--liquibase formatted sql
--changeset ab:1

INSERT INTO role (id, status, name, created_at)
VALUES
    (1, 'VISIBLE', 'ROLE_USER_PARTIAL', now()),
    (2, 'VISIBLE', 'ROLE_USER_FULL', now()),
    (3, 'VISIBLE', 'ROLE_ADMIN', now()),
    (4, 'VISIBLE', 'ROLE_MENTOR', now());