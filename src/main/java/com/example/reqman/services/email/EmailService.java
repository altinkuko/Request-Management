package com.example.reqman.services.email;

import com.example.reqman.mapper.EmailParam;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendCreationEmail(EmailParam emailParam){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("ikonsjavainterns@gmail.com");
        mailMessage.setTo(emailParam.getTo().toArray(String[]::new));
        mailMessage.setSubject(emailParam.getTopic());
        mailMessage.setText("A new request with description "+ emailParam.getMessage()+" has been created");
        javaMailSender.send(mailMessage);
    }

}
