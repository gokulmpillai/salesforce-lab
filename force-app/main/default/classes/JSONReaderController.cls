/**
 * JSONReaderController
 *
 * This class is responsible for reading JSON data from a ContentVersion record, 
 * deserializing it into Account and Contact records, and inserting them into Salesforce.
 *
 * Author: Gokul M Pillai
 * Created by: Gokul M Pillai
 * Creation Date: 28/07/2024
 * Description: This class processes JSON data to create Account and Contact records.
 */

public with sharing class JSONReaderController {
    @AuraEnabled
    public static ResultWrapper createRecords(String contentVersionId){
        try {
            List<Account> listOfAccounts = new List<Account>();
            List<Contact> listOfContacts = new List<Contact>();

            //Fetching the file uploaded from the lwc and storing it in a variable
            ContentVersion cv = [SELECT Id, VersionData FROM ContentVersion WHERE Id =: contentVersionId];
            Blob fileBody = cv.VersionData;

            //Converting the body from blob to string
            String jsonResponse = fileBody.toString();
            System.debug('************jsonResponse****************: '+ jsonResponse);

            //Deserializing the content through a wrapper class
            List<RecordsWrapper> records = (List<RecordsWrapper>)JSON.deserialize(jsonResponse, List<RecordsWrapper>.class);

            System.debug('********************records***********************: ' + records);

            //Iterating over the content to create account and contact records in salesforce
            for(RecordsWrapper record : records){
                Account acc = new Account();
                acc.Name = record.company;
                acc.Phone = record.phone;
                acc.NumberOfEmployees = record.numberOfEmployees;
                listOfAccounts.add(acc);
            }

            insert listOfAccounts;  

            for(Integer i = 0; i < listOfAccounts.size(); i++) {
                Account acc = listOfAccounts[i];
                RecordsWrapper record = records[i];
                for (ContactWrapper conWrapperObj : record.contacts) {
                    Contact conObj = new Contact();
                    conObj.FirstName = conWrapperObj.firstName;
                    conObj.LastName = conWrapperObj.lastName;
                    conObj.Email = conWrapperObj.email;
                    conObj.AccountId = acc.Id;
                    listOfContacts.add(conObj);
                }
            }
            insert listOfContacts;
        
        //Returning the number of records inserted back to lwc
        ResultWrapper res = new ResultWrapper();
        res.accountCount = listOfAccounts.size();
        res.contactCount = listOfContacts.size();

        return res;
        
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class RecordsWrapper{
        @AuraEnabled
        public string company;
        @AuraEnabled
        public string phone;
        @AuraEnabled
        public Integer numberOfEmployees;
        @AuraEnabled
        public List<ContactWrapper> contacts;
    }

    public class ContactWrapper{
        @AuraEnabled
        public string firstName;
        @AuraEnabled
        public string lastName;
        @AuraEnabled
        public string email;
    }

    public class ResultWrapper{
        @AuraEnabled
        public integer accountCount;
        @AuraEnabled
        public integer contactCount;
    }
}