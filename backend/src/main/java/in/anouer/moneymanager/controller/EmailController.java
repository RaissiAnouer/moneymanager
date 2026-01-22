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
        emailService.sendEmailWithAttachment(profile.getEmail(),"Your Incomes Excel Report",
                "This is your incomes report",
                boas.toByteArray(),"incomes-report.xlsx"
                );

        return ResponseEntity.ok(null);
    }

    @GetMapping("/expense-excel")
    public ResponseEntity<Void> emailExpenseExcel() throws IOException {
        ProfileEntity profile= profileService.getCurrentProfile();
        ByteArrayOutputStream boas=new ByteArrayOutputStream();
        excelService.writeExpensesToExel(boas,expenseService.getCurrentMonthExpensesForCurrentUser());
        emailService.sendEmailWithAttachment(profile.getEmail(),"Your Expenses Excel Report",
                "This is your expenses report",
                boas.toByteArray(),"expenses-report.xlsx"
        );

        return ResponseEntity.ok(null);
    }


}
