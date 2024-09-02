Trigger ContactTrigger on Contact(before insert, before update, after undelete){
    if((Trigger.isBefore && Trigger.isInsert) || (Trigger.isAfter && Trigger.isUndelete)){
        ContactTriggerHandler.duplicateCheckForInsertUndelete(Trigger.new);
    }
    if(Trigger.isBefore && Trigger.isUpdate){
        ContactTriggerHandler.beforeUpdateCheck(Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap);
    }
}