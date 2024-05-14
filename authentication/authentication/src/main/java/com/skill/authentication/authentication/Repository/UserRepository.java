package com.skill.authentication.authentication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skill.authentication.authentication.Models.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmpId(String empId);

    Boolean existsByEmpId(String empId);

    Optional<User> findByEmail(String email);
}
