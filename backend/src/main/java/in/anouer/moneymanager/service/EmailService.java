package in.anouer.moneymanager.service;

import brevo.ApiClient;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;
import brevoModel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    private String fromEmail= "raissianouer@gmail.com";

    /**
     * Standard HTML Email
     */
    public void sendEmail(String to, String subject, String body) {
        // Initialize Client
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        // Sender & Recipient
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail(fromEmail);
        sender.setName("Money Manager");

        SendSmtpEmailTo recipient = new SendSmtpEmailTo();
        recipient.setEmail(to);

        // Build Email
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(sender);
        sendSmtpEmail.setTo(List.of(recipient));
        sendSmtpEmail.setHtmlContent(body);
        sendSmtpEmail.setSubject(subject);

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println("Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Email with Attachment
     */
    public void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment, String filename) {
        // Initialize Client
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        // Sender & Recipient
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail(fromEmail);
        sender.setName("Money Manager");

        SendSmtpEmailTo recipient = new SendSmtpEmailTo();
        recipient.setEmail(to);

        // Attachment Logic
        SendSmtpEmailAttachment brevoAttachment = new SendSmtpEmailAttachment();
        brevoAttachment.setName(filename);
        // CRITICAL: Brevo API requires Base64 encoded string for the file content
        brevoAttachment.setContent(attachment);

        // Build Email
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(sender);
        sendSmtpEmail.setTo(List.of(recipient));
        sendSmtpEmail.setSubject(subject);
        sendSmtpEmail.setHtmlContent(body);
        sendSmtpEmail.setAttachment(List.of(brevoAttachment));

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println("Attachment email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Error sending attachment email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}