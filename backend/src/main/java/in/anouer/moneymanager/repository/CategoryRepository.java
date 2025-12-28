package in.anouer.moneymanager.repository;

import in.anouer.moneymanager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

    //select * from tbl_categories where profile_id=?1
    List<CategoryEntity> findByProfileId(Long id);


    //select * from tbl_categories where profile_id=?
    Optional<CategoryEntity> findByIdAndProfileId(Long id,Long profileId);

    //select * from tbl_categories where name=?1 and profile_id=?2
    List<CategoryEntity>findByTypeAndProfileId(String type,Long profileId);

    Boolean existsByNameAndProfileId(String name,Long profileId);
}

