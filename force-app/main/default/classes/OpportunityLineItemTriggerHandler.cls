//A handler class to calculate the total products associated with the account whenever a product is added    

public class OpportunityLineItemTriggerHandler {
    public static void countTotalProductsOnInsert(List<OpportunityLineItem> insertedOli, Map<Id, OpportunityLineItem> mapOfOli){
        Set<Id> opportunityIds = new Set<Id>();
		Map<Id, Integer> mapOfOpportunityProductCount = new Map<Id, Integer>();
        Map<Id, Integer> mapOfAccountProductCount = new Map<Id, Integer>();
        List<Account> listOfContactsToUpdate = new List<Account>();
        Integer totalProducts;
        
        for(OpportunityLineItem oliObj : insertedOli){
            opportunityIds.add(oliObj.OpportunityId);
        }
        
        for(Opportunity opp : [SELECT Id, Opportunity.AccountId FROM Opportunity WHERE Id IN :opportunityIds]){
            mapOfAccountProductCount.put(opp.AccountId, 0);
        }
        
        
        for(AggregateResult aggr : [SELECT COUNT(Id)totalProducts, Opportunity.AccountId 
                                     FROM OpportunityLineItem 
                                     WHERE Opportunity.AccountId IN :mapOfAccountProductCount.keySet()
                                   GROUP BY Opportunity.AccountId]){
                                       
            totalProducts = (Integer)aggr.get('totalProducts');
            Id accId = (Id)aggr.get('AccountId');
            mapOfOpportunityProductCount.put(accId, totalProducts);
        }
        
        
        for(Account acc : [SELECT Id, Name, Number_of_products__c FROM Account WHERE Id IN : mapOfOpportunityProductCount.keySet()]){
                acc.Number_of_products__c = mapOfOpportunityProductCount.get(acc.Id); 
            	listOfContactsToUpdate.add(acc);
        }
        if(!listOfContactsToUpdate.isEmpty()){
        	update listOfContactsToUpdate;
        }
    }
}