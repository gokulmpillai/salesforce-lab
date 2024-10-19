public with sharing class AccountDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name, AnnualRevenue, Phone, NumberOfEmployees, Industry FROM Account WHERE NumberOfEmployees > 0 WITH USER_MODE LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}