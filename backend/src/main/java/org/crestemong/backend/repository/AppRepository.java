package org.crestemong.backend.repository;

import org.crestemong.api.model.AppEntityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

@NoRepositoryBean
public interface AppRepository<T> extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {

    Page<T> findAllByCreatedBy(Long createdBy, Pageable pageable);

    @Modifying
    @Query("UPDATE #{#entityName} abstractEntity SET abstractEntity.status = :status WHERE abstractEntity.id=:id")
    void updateStatusById(@Param("id") Long id, @Param("status") AppEntityStatus status);

    Page<T> findAllByIdIn(Iterable<Long> ids, Pageable pageable);

    @Query("SELECT abstractEntity.status FROM #{#entityName} abstractEntity WHERE abstractEntity.id = :id")
    AppEntityStatus findStatusById(Long id);
}
