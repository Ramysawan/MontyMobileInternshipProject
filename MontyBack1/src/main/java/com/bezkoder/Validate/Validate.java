package com.bezkoder.Validate;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberToCarrierMapper;
import com.google.i18n.phonenumbers.PhoneNumberUtil;  
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;  
import java.util.*;

public class Validate {
    
    public String number;
    public Validate(String number){
        this.number=number;
    }
   
	public void checkNumber() {
	    //insert number here  
        PhoneNumberUtil phoneUtil = PhoneNumberUtil.getInstance(); 
        PhoneNumberToCarrierMapper phoneCarr = PhoneNumberToCarrierMapper.getInstance();
        
         
        try {  
            PhoneNumber numberProto = phoneUtil.parse(number, "");  
            if(phoneUtil.isValidNumber(numberProto) == true){
            
                System.out.println("Number Valid : Yes");
                System.out.println("Country code : " + phoneUtil.getRegionCodeForNumber(numberProto));  
                Locale l = new Locale("", phoneUtil.getRegionCodeForNumber(numberProto));
                System.out.println("Country name : " + l.getDisplayCountry());
                if((l.getDisplayCountry().equals("Lebanon"))) {
                    number = number.replaceAll(" ", "");

                    if ((number.length() == 11 && (Integer.parseInt(String.valueOf(number.charAt(4))) == 3 )) && ((Integer.parseInt(String.valueOf(number.charAt(5))) >= 6 || Integer.parseInt(String.valueOf(number.charAt(5))) == 0))){
                        System.out.println("Operator name : touch");

                    }
    
                    else if((((Integer.parseInt(number.substring(4,6)) == 70) || (Integer.parseInt(number.substring(4,6)) == 76) || (Integer.parseInt(number.substring(4,6)) == 03) ) && (Integer.parseInt(String.valueOf(number.charAt(6))) >= 6 || Integer.parseInt(String.valueOf(number.charAt(6))) == 0)) || (Integer.parseInt(number.substring(4,6)) == 78)){
                        System.out.println("Operator name : touch");

                    } 
                    else if(Integer.parseInt(number.substring(4,6)) == 71 && (Integer.parseInt(String.valueOf(number.charAt(6))) >= 1 && Integer.parseInt(String.valueOf(number.charAt(6))) <= 5)){
                        System.out.println("Operator name : touch");

                    }
                    else if(Integer.parseInt(number.substring(4,6)) == 81 && (Integer.parseInt(String.valueOf(number.charAt(6))) >= 6 )){
                        System.out.println("Operator name : touch");

                    }   
                    else if((number.length() == 11 && (Integer.parseInt(String.valueOf(number.charAt(4))) == 1) || Integer.parseInt(String.valueOf(number.charAt(4))) == 4 || Integer.parseInt(String.valueOf(number.charAt(4))) == 5 || Integer.parseInt(String.valueOf(number.charAt(4))) == 6 || Integer.parseInt(String.valueOf(number.charAt(4))) == 7 || Integer.parseInt(String.valueOf(number.charAt(4))) == 8 || Integer.parseInt(String.valueOf(number.charAt(4))) == 9)){
                        System.out.println("Operator name : Ogero LandLine");
                    
                    }
                    else if(number.substring(4,6).equals("08") || number.substring(4,6).equals("01") || number.substring(4,6).equals("04") || number.substring(4,6).equals("09") || number.substring(4,6).equals("05") || number.substring(4,6).equals("06")){
                        System.out.println("Operator name : Ogero LandLine");

                    }

                    else {
                        System.out.println("Operator name : Alfa");
                    }
                }
                else if(phoneCarr.getNameForValidNumber(numberProto, l).equals("")){
                    System.out.println("Operator name : Unknown");

                }
                else {
                System.out.println("Operator name : " + phoneCarr.getNameForValidNumber(numberProto, l));
                }
            } else {
                System.out.println("Phone Number Invalid");
        }
            
              
           } catch (NumberParseException e) {  
                System.err.println("NumberParseException was thrown: "  
                          + e.toString());  
           }  
	}
    
}

