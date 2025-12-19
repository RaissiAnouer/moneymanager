package in.anouer.moneymanager.service;

import in.anouer.moneymanager.dto.IncomeDTO;
import in.anouer.moneymanager.entity.CategoryEntity;
import in.anouer.moneymanager.entity.IncomeEntity;
import in.anouer.moneymanager.entity.ProfileEntity;
import in.anouer.moneymanager.repository.CategoryRepository;
import in.anouer.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(()->new RuntimeException("Category not found"));
        IncomeEntity newIncome=toEntity(dto,profile,category);
        newIncome=incomeRepository.save(newIncome);
        return toDTO(newIncome);
    }


    private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category) {
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity entity) {
        return IncomeDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .amount((entity.getAmount()))
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
