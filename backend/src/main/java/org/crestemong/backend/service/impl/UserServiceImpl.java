package org.crestemong.backend.service.impl;

import jakarta.transaction.Transactional;
import org.crestemong.api.model.UserDTO;
import org.crestemong.backend.mapper.UserMapper;
import org.crestemong.backend.model.User;
import org.crestemong.backend.repository.UserRepository;
import org.crestemong.backend.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends AbstractServiceImpl<User, UserDTO> implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(
            final UserRepository repository,
            final UserMapper mapper,
            final BCryptPasswordEncoder bCryptPasswordEncoder
    ) {
        super(repository, mapper);
        this.repository = repository;
        this.mapper = mapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDTO findByEmail(String email) {
        return mapper.mapToDTO(repository.findByEmail(email));
    }

    @Override
    @Transactional
    public UserDTO save(UserDTO userDTO) {
        final User existingUser = repository.findByEmail(userDTO.getEmail());

        final String encodedPassword = getEncodedPassword(existingUser, userDTO);
        final UserDTO tempUserDTO = new UserDTO();
        BeanUtils.copyProperties(userDTO, tempUserDTO);
        tempUserDTO.setPassword(encodedPassword);

        return super.save(tempUserDTO);
    }

    @Override
    public UserDTO update(Long id, UserDTO userDTO) {
        final User existingUser = repository.findByEmail(userDTO.getEmail());

        final String encodedPassword = getEncodedPassword(existingUser, userDTO);
        userDTO.setPassword(encodedPassword);

        return super.update(id, userDTO);
    }

    private String getEncodedPassword(User existingUser, UserDTO userDTO) {
        final String rawPassword = userDTO.getPassword();
        if (existingUser != null) {
            final String oldPassword = existingUser.getPassword();
            if (oldPassword.equals(rawPassword)) {
                return oldPassword;
            }
        }
        return bCryptPasswordEncoder.encode(rawPassword);
    }
}
