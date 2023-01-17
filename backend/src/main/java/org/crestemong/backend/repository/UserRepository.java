package org.crestemong.backend.repository;

import org.crestemong.backend.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends AppRepository<User> {

    User findByEmail(final String email);

    @Modifying
    @Query("UPDATE User user SET user.password = :password WHERE user.id=:id")
    void updatePasswordById(final @Param("id") Long id, final @Param("password") String password);

    @Modifying
    @Query("UPDATE User user SET user.email = :email WHERE user.id=:id")
    void updateEmailById(final @Param("id") Long id, final @Param("email") String email);
}
