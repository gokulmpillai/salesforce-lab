public with sharing class GridController {
    @AuraEnabled
    public static List<Account> getAccountWithRelatedContacts(){
        try {
            return [SELECT Id, Name, (SELECT FirstName, LastName, Email FROM Contacts) FROM Account LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}