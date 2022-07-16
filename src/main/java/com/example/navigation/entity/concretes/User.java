package com.example.navigation.entity.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;


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

    @Column(name = "username")
    @NotNull
    @NotEmpty
    private String username;

    @Column(name = "password")
    @NotNull
    @NotEmpty
    private String password;

    @Column(name = "role")
    @NotNull
    @NotEmpty
    private String role;

    @OneToMany(mappedBy = "user",targetEntity = Route.class)
    private List<User> userList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
