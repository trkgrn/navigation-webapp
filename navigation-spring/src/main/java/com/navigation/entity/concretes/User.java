package com.navigation.entity.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","userList"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "username",unique = true)
    @NotNull
    @NotEmpty
    private String username;

    @Column(name = "password")
    @NotNull
    @NotEmpty
    private String password;

    @OneToOne()
    @JoinColumn(name = "role_id",referencedColumnName = "role_id")
    private Role role;

}
