package com.skill.authentication.authentication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.skill.authentication.authentication.Models.BlackList;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {
    Optional<BlackList> findByToken(String token);

    void deleteByToken(String token);
}