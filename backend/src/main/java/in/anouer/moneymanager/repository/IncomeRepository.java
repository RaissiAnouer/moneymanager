package in.anouer.moneymanager.repository;

import in.anouer.moneymanager.entity.ExpenseEntity;
import in.anouer.moneymanager.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository  extends JpaRepository<IncomeEntity,Long> {

    //select * from tbl_incomes where profile_id=?1 order by date desc
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //select * from tbl_income where profile_id=?1 order by date desc limit 5
    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(i.amount) FROM IncomeEntity i where i.profile.id= :profileId")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId") Long profileId);


    //select * from tbl_income where profile_id= ?1 and date between ?2 and ?3 and name like %?4%
    List<IncomeEntity>  findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long ProfileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    //select * from tbl_income where profile_id=?1 and date between them ?2 and ?3
    List<IncomeEntity> findByProfileIdAndDateBetween(Long profile, LocalDate startDate, LocalDate endDate);
}
