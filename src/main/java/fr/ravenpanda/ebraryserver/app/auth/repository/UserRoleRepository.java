package fr.ravenpanda.ebraryserver.app.auth.repository;

import fr.ravenpanda.ebraryserver.app.auth.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {
    Optional<UserRoleEntity> findByName(String name);
}
