trigger OpportunityLineItemTrigger on OpportunityLineItem (after insert, after delete) {
    if(Trigger.isAfter && Trigger.isInsert){
		OpportunityLineItemTriggerHandler.countTotalProductsOnInsert(Trigger.new, Trigger.newMap);
    }
}