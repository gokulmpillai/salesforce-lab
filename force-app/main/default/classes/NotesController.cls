public with sharing class NotesController {
    @AuraEnabled
    public static List<Note__c> getCurrentUserNotes(String userId){
        try {
            return [SELECT Id, Description__c, Status__c FROM Note__c WHERE CreatedById=: userId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}