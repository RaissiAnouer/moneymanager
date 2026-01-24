package in.anouer.moneymanager.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import in.anouer.moneymanager.service.SmartInputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SmartInputController {
    private final SmartInputService smartInputService;
    @PostMapping("/ai-input")
    public ResponseEntity<Object> getResponse(@RequestBody String prompt) throws JsonProcessingException {
        return smartInputService.getResponse(prompt);
    }

}
