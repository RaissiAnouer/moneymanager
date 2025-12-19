package in.anouer.moneymanager.controller;

import in.anouer.moneymanager.dto.ExpenseDTO;
import in.anouer.moneymanager.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO dto){
        ExpenseDTO saved = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
