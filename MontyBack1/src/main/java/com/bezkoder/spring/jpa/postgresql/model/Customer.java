package com.bezkoder.spring.jpa.postgresql.model;

import javax.persistence.*;
import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberToCarrierMapper;
import com.google.i18n.phonenumbers.PhoneNumberUtil;  
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;



import java.util.*;

@Entity
@Table(name = "customers")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "PhoneNumber")
	private String phoneNumber;

	@Column(name = "countryCode")
	private String countryCode;

	@Column(name = "countryName")
	private String countryName;

	@Column(name = "operatorName")
	private String operatorName;

	@Column(name = "published")
	private boolean published;

	public Customer() {

	}

	public Customer(String title, String description, String phoneNumber, String countryName, String countryCode, String operatorName, boolean published) {
		this.title = title;
		this.description = description;
		this.phoneNumber = phoneNumber;
		this.published = published;
		this.operatorName = operatorName;
		this.countryName = countryName;
		this.countryCode = countryCode;
	}

	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber= phoneNumber;
		this.isValid(phoneNumber);
		
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean isPublished) {
		this.published = isPublished;
	}
	public String getCountryCode() throws NumberParseException {
		PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance(); 
		PhoneNumber numberProto = phoneUtil.parse(phoneNumber, ""); 
		
		return phoneUtil.getRegionCodeForNumber(numberProto);
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	public String getCountryName() throws NumberParseException {
		PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance(); 
		PhoneNumber numberProto = phoneUtil.parse(phoneNumber, "");
		Locale l = new Locale("", phoneUtil.getRegionCodeForNumber(numberProto));
		return l.getDisplayCountry();
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public String getOperatorName() throws NumberParseException {
		PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance(); 
		PhoneNumber numberProto = phoneUtil.parse(phoneNumber, "");
		PhoneNumberToCarrierMapper phoneCarr = PhoneNumberToCarrierMapper.getInstance();
		Locale l = new Locale("", phoneUtil.getRegionCodeForNumber(numberProto));
		if((l.getDisplayCountry().equals("Lebanon"))) {
			phoneNumber = phoneNumber.replaceAll(" ", "");

			if ((phoneNumber.length() == 11 && (Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 3 )) && ((Integer.parseInt(String.valueOf(phoneNumber.charAt(5))) >= 6 || Integer.parseInt(String.valueOf(phoneNumber.charAt(5))) == 0))){
				return("Touch");

			}

			else if((((Integer.parseInt(phoneNumber.substring(4,6)) == 70) || (Integer.parseInt(phoneNumber.substring(4,6)) == 76) || (Integer.parseInt(phoneNumber.substring(4,6)) == 03) ) && (Integer.parseInt(String.valueOf(phoneNumber.charAt(6))) >= 6 || Integer.parseInt(String.valueOf(phoneNumber.charAt(6))) == 0)) || (Integer.parseInt(phoneNumber.substring(4,6)) == 78)){
				return("Touch");
				

			} 
			else if(Integer.parseInt(phoneNumber.substring(4,6)) == 71 && (Integer.parseInt(String.valueOf(phoneNumber.charAt(6))) >= 1 && Integer.parseInt(String.valueOf(phoneNumber.charAt(6))) <= 5)){
				return("Touch");

			}
			else if(Integer.parseInt(phoneNumber.substring(4,6)) == 81 && (Integer.parseInt(String.valueOf(phoneNumber.charAt(6))) >= 6 )){
				return("Touch");

			}   
			else if((phoneNumber.length() == 11 && ((Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 1) || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 4 || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 5 || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 6 || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 7 || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 8 || Integer.parseInt(String.valueOf(phoneNumber.charAt(4))) == 9))){
				return("Ogero Landline");
			
			}
			else if(phoneNumber.substring(4,6).equals("08") || phoneNumber.substring(4,6).equals("01") || phoneNumber.substring(4,6).equals("04") || phoneNumber.substring(4,6).equals("09") || phoneNumber.substring(4,6).equals("05") || phoneNumber.substring(4,6).equals("06")){
				return("Ogero Landline");

			}
			else if(phoneNumber.length() <= 11){
				return("Unknown/Number Invalid");

			}

			else {
				return("Alfa");
			}
		}
		else if(phoneCarr.getNameForValidNumber(numberProto, l).equals("")){
			return("Unknown");

		}
		else {
		return(phoneCarr.getNameForValidNumber(numberProto, l));
		}
	}

	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	


	@Override
	public String toString() {
		return "Customer [id=" + id + ", title=" + title + ", desc=" + description  + " ,countryCode" + countryCode + " ,countryName" + countryName + " ,operatorName" + operatorName + ", published=" + published  + "]";
	}
	public void isValid(String phoneNumber){
		try{
			PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance(); 
			PhoneNumber numberProto = phoneUtil.parse(phoneNumber, ""); 
			if(phoneUtil.isValidNumber(numberProto) == true){
				System.out.println("Number is Valid!");
			
			} else {
				System.out.println("Number invalid!");
			}
		}catch (NumberParseException e) {  
			System.err.println("NumberParseException was thrown: "  
				  	+ e.toString());  
   		}  

	}

	
                    
                 

}
