trigger ContactTrigger on Contact (after insert, after update, after delete, after undelete){
    Set<Id> accountId = new Set<Id>();
    for(Contact con : Trigger.new){
        accountId.add(con.accountId);
        List<AggregateResult> accountWithContacts = [SELECT AccountId, Count(Id) totalContacts FROM Contact WHERE Active__c = TRUE AND ID IN :accountId GROUP BY AccountId];
        if(!accountId.isEmpty()){
            
        }
        
    }

}