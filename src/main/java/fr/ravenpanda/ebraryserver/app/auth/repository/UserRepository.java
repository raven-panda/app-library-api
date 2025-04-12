package fr.ravenpanda.ebraryserver.app.auth.repository;

import fr.ravenpanda.ebraryserver.app.auth.entity.UserEntity;
import fr.ravenpanda.ebraryserver.app.auth.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findAllByRole(UserRoleEntity role);
}
