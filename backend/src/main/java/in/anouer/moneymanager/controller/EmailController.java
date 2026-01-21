package in.anouer.moneymanager.controller;

import in.anouer.moneymanager.entity.ProfileEntity;
import in.anouer.moneymanager.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final EmailService emailService;
    private final ProfileService profileService;

    @GetMapping("/income-excel")
    public ResponseEntity<Void> emailIncomeExcel() throws IOException {
        ProfileEntity profile= profileService.getCurrentProfile();
        ByteArrayOutputStream boas=new ByteArrayOutputStream();
        excelService.writeIncomesToExel(boas,incomeService.getCurrentMonthIncomesForCurrentUser());
        emailService.sendEmailWithAttachment(profile.getEmail(),"Your Income Excel Report",
                "This is your income report",
                boas.toByteArray(),"income-report.xlsx"
                );

        return ResponseEntity.ok(null);
    }


}
