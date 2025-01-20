public with sharing class GridController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name, AnnualRevenue FROM Account WHERE AnnualRevenue!= NULL];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<Account> getAccountWithRelatedContacts(){
        try {
            return [SELECT Id, Name, (SELECT FirstName, LastName, Email FROM Contacts) FROM Account LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}