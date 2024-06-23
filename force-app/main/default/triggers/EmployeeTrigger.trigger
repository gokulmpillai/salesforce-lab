trigger EmployeeTrigger on Employee__c (after insert, after update, after delete, after undelete) {

    if(Trigger.isAfter && Trigger.isInsert){
        EmployeeTriggerHandler.calculateMinMaxSalaryInsert(Trigger.new, Trigger.newMap);
    }
    // if(Trigger.isAfter && Trigger.isUpdate)){
    //     EmployeeTriggerHandler.calculateMinMaxSalaryUpdate(Trigger.new, Trigger.newMap, Trigger.old, Trigger.oldMap);
    // }
}