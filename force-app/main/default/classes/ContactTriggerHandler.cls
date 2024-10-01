/*  Component Type: Apex Class
    Description: Apex class to prevent the creation of duplicate contacts in the system
    Author: Gokul Pillai
    Created Date: 8/31/2024
*/
    
public class ContactTriggerHandler {
    public static void duplicateCheckForInsertUndelete(List<Contact> newContactList){
        Set<String> contactEmailIds = new Set<String>();
        // for(Contact con : newContactList){
        //     if(!String.isEmpty(con.Email)){
        //         contactEmailIds.add(con.Email);
        //     }
        // }
        
        // Map<String, Contact> existingEmailIdMap = new Map<String, Contact>();
        // for(Contact con : [SELECT Id, Name, Email FROM Contact WHERE Email IN :contactEmailIds]){
        //     existingEmailIdMap.put(con.Email, con);
        // }

        for(Contact con : [SELECT Id, Name, Email FROM Contact WHERE Email !=NULL]){
            contactEmailIds.add(con.Email);
        }
        
        for(Contact con: newContactList){
            if(!String.isEmpty(con.Email)){
                if(contactEmailIds.contains(con.Email)){
                    con.Email.addError('A Contact with this email address already exists. Please check your information and try again.');
                }
            }
        }
    }
    
    public static void beforeUpdateCheck(List<Contact> newContactList, List<Contact> oldContactList, Map<Id, Contact> newContactMap, Map<Id, Contact> oldContactMap){
        Map<String, Contact> existingEmailMap = new Map<String, Contact>();
        for(Contact con : [SELECT Id, Name, Email FROM Contact WHERE Email != NULL]){
            existingEmailMap.put(con.Email, con);
        }
        
        for(Contact conObj : newContactList){
            Contact con = existingEmailMap.get(conObj.Email);
            System.debug('************Debug***********'+ con);
            if(!String.isEmpty(conObj.Email) && (con !=null)){
                if(conObj.Email == con.Email){
                    //if(existingEmailMap.get(conObj.Email) != conObj.Id){
                    conObj.Email.addError('A Contact with this email address already exists. Please check your information and try again.');
                }
            }
            //}
        }
    } 
}