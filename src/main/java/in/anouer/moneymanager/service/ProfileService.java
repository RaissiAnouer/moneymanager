package in.anouer.moneymanager.service;


import in.anouer.moneymanager.dto.ProfileDTO;
import in.anouer.moneymanager.entity.ProfileEntity;
import in.anouer.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;

    public ProfileDTO registerProfile(ProfileDTO profileDTO){
        ProfileEntity newProfile=toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);
        //send activation email
        String activationLink="http://localhost:9090/api/v1.0/activate?token="+newProfile.getActivationToken();
        String subject= "Active your money manager acount";
        String body="Click on the following link to activate your account: "+activationLink;
        emailService.sendEmail(newProfile.getEmail(),subject,body);
        return toDto(newProfile);
    }

    public ProfileEntity toEntity(ProfileDTO profileDTO){
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(profileDTO.getPassword())
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }
    public ProfileDTO toDto(ProfileEntity profileEntity){
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }


    public  boolean activateProfile(String activationToken){
        return profileRepository.findByActivationToken(activationToken)
                .map(profile->{
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                }).orElse(false);
    }
}
