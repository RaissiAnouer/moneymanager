
package in.anouer.moneymanager.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // Inject your secret key from Render Environment Variables
    @Value("${resend.api.key}")
    private String apiKey;

    public void sendEmail(String to, String subject, String body) {
        Resend resend = new Resend(apiKey);

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Money Manager <onboarding@resend.dev>")
                .to(to)
                .subject(subject)
                .html(body)
                .build();
        try {
            CreateEmailResponse response = resend.emails().send(params);
            System.out.println("Email sent successfully! ID: " + response.getId());
        } catch (ResendException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
