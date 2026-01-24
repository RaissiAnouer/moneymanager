package in.anouer.moneymanager.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import in.anouer.moneymanager.dto.CategoryDTO;
import in.anouer.moneymanager.dto.ExpenseDTO;
import in.anouer.moneymanager.dto.IncomeDTO;
import in.anouer.moneymanager.entity.CategoryEntity;
import in.anouer.moneymanager.entity.ProfileEntity;
import in.anouer.moneymanager.repository.CategoryRepository;
import io.micrometer.core.instrument.search.Search;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.StreamSupport;


@Service
@RequiredArgsConstructor
public class SmartInputService {
    private final CategoryService categoryService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    private final ObjectMapper mapper =  new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS);

    private final ChatModel chatModel;

    public ResponseEntity<Object> getResponse(String prompt) throws JsonProcessingException {
        String today=LocalDate.now().toString();
        String finalPrompt="You are a financial data extractor. " +
                "I will provide a sentence describing an expense. Your response must be a valid JSON object only. " +
                "Do not include " +
                "any markdown formatting, preamble, or postscript. " +
                "if no date used use this "+today+
                "Extract the transaction date in YYYY-MM-DD format."+
                "Use the following keys: amount, name (merchant or source name),categoryName MUST be exactly one of the following values:" +
                "[freelance, rent, transportation, groceries, salary, bonus, food, utilities, entertainment, healthcare, education, shopping, subscription]. , date,type: either income or expense this is the prompt : "+prompt;
        String response = chatModel.call(finalPrompt);
         JsonNode responseToJson = mapper.readTree(response);
         String type = responseToJson.get("type").asText();
         String categoryName=responseToJson.get("categoryName").asText();
         String name=responseToJson.get("name").asText();



        //getting the profile id
         ProfileEntity profile = profileService.getCurrentProfile();
         Long profileid= profile.getId();


        CategoryDTO categoryDTO = CategoryDTO.builder()
                .profileId(profileid)
                .name(name)
                .type(type)
                .build();



         Long categoryId=categoryRepository.findByNameIgnoreCaseAndProfileId(name,profileid).map(CategoryEntity::getId)
                 .orElseGet(()->{
                     CategoryDTO newCategory = categoryService.saveCategory(categoryDTO);
                     return newCategory.getId();
         });



         if("expense".equalsIgnoreCase(type)){
            ExpenseDTO expenseDTO =  mapper.treeToValue(responseToJson,ExpenseDTO.class);
            expenseDTO.setCategoryId(categoryId);
                return ResponseEntity.ok(expenseService.addExpense(expenseDTO));
         }else if ("income".equalsIgnoreCase(type)){
             IncomeDTO incomeDTO= mapper.treeToValue(responseToJson,IncomeDTO.class);
             incomeDTO.setCategoryId(categoryId);
             return ResponseEntity.ok(incomeService.addIncome(incomeDTO));

         }else {
             throw new RuntimeException("Couldn't parse the transaction type : "+ type );
         }


    }

}
