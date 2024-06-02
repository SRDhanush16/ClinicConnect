package com.example.UsersServer.service;

import com.example.UsersServer.model.Appointments;
import com.example.UsersServer.model.Users;
import com.example.UsersServer.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UsersRepository usersRepository;

    public void sendBookingConfirmation(Appointments appointments){
        String usremail = usersRepository.findUemailByUid(appointments.getAuid());
        try{
            SimpleMailMessage mailAppointment = new SimpleMailMessage();
            mailAppointment.setFrom("Dhanush SR<"+sender+">");
            mailAppointment.setTo(usremail);
            mailAppointment.setSubject("Your Appointment Confirmation");
            String str = appointments.getAuname() + " your appointment to visit " + appointments.getAdname()+" on "+appointments.getAdate()+" at "+appointments.getAslot()+" is confirmed. "+" If you have any other queries feel free to contact us. \n"+" Thank You ";
            mailAppointment.setText(str);
            javaMailSender.send(mailAppointment);
            System.out.println("Email Sent successfully");
        }catch(Exception e){
            System.out.println("error in sending email to " + usremail);
            e.printStackTrace();
        }
    }

    public void sendBookingCancellationConfirmation(Appointments appointments){
        String usremail = usersRepository.findUemailByUid(appointments.getAuid());
        try{
            SimpleMailMessage mailAppointment = new SimpleMailMessage();
            mailAppointment.setFrom("Dhanush SR<"+sender+">");
            mailAppointment.setTo(usremail);
            mailAppointment.setSubject("Your  Cancellation Request for Appointment =" +appointments.getAid()+" is Done");
            String msg = "Dear "+appointments.getAuname()+" your appointment with id = "+appointments.getAid()+ "and appointment details : "+appointments.getAdname()+" "+appointments.getAdate() + " "+appointments.getAslot() +"  is Successfully Cancelled  ";
            mailAppointment.setText(msg);
            javaMailSender.send(mailAppointment);
            System.out.println("Email Sent successfully");
        }catch(Exception e){
            System.out.println("error in sending email to " + usremail);
            e.printStackTrace();
        }
    }

    public void CreateAccountConfirmation(Users register){
        try{
            SimpleMailMessage mailAppointment = new SimpleMailMessage();
            mailAppointment.setFrom("Dhanush SR<"+sender+">");
            mailAppointment.setTo(register.getUemail());
            mailAppointment.setSubject("Your Account has been Created");
            String msg = "Dear "+register.getUname()+" Your Account has been Created Successfullt" ;
            javaMailSender.send(mailAppointment);
        }catch(Exception e){
            System.out.println("error in sending email to " + register.getUemail());
            e.printStackTrace();
        }
    }

}
