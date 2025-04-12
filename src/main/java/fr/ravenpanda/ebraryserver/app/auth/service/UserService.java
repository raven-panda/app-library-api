package fr.ravenpanda.ebraryserver.app.auth.service;

import fr.ravenpanda.ebraryserver.app.auth.dto.UserDto;
import fr.ravenpanda.ebraryserver.app.auth.entity.UserEntity;
import fr.ravenpanda.ebraryserver.app.auth.entity.UserRoleEntity;
import fr.ravenpanda.ebraryserver.app.auth.repository.UserRepository;
import fr.ravenpanda.ebraryserver.app.auth.repository.UserRoleRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    public UserService(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    public UserDto findById(Long id) {
        return userRepository.findById(id).map(this::toDto).orElse(null);
    }

    public Boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public Boolean checkPassword(Long id, String password) {
        Optional<String> storedHashPw = userRepository.findById(id).map(UserEntity::getPassword);
        if (!userRepository.existsById(id) || storedHashPw.isEmpty()) return false;

        return new BCryptPasswordEncoder().matches(password, storedHashPw.get());
    }

    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(this::toDto).toList();
    }

    public UserDto findByEmail(String email) {
        return userRepository.findByEmail(email).map(this::toDto).orElse(null);
    }

    public Boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserDto findByUsername(String username) {
        return userRepository.findByUsername(username).map(this::toDto).orElse(null);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public List<UserDto> findAllByRole(UserRoleEntity role) {
        return userRepository.findAllByRole(role).stream().map(this::toDto).toList();
    }

    public Boolean deleteById(Long id) {
        if (!userRepository.existsById(id)) return false;

        userRepository.deleteById(id);
        return true;
    }

    public UserDto save(UserDto user) {
        UserEntity savedUser = userRepository.save(toEntity(user));
        return toDto(savedUser);
    }

    public UserDto update(Long id, UserDto user) {
        if (!userRepository.existsById(id)) return null;
        user.setId(id);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        UserEntity savedUser = userRepository.save(toEntity(user));
        return toDto(savedUser);
    }

    public UserDto toDto(UserEntity user) {
        return UserDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .password(user.getPassword())
            .role(user.getRole().getName())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .build();
    }

    public UserEntity toEntity(UserDto dto) {
        return UserEntity.builder()
            .id(dto.getId())
            .username(dto.getUsername())
            .email(dto.getEmail())
            .password(dto.getPassword())
            .role(userRoleRepository.findByName(dto.getRole()).orElse(null))
            .createdAt(dto.getCreatedAt())
            .updatedAt(dto.getUpdatedAt())
            .build();
    }
}
