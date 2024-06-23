// A handler class to calculate the employees with the minimum and maximum salary associated with a firm
public with sharing class EmployeeTriggerHandler {
    public static void calculateMinMaxSalaryInsert(List<Employee__c> listOfNewEmployees, Map<Id, Employee__c> mapOfNewEmployees) {
        Set<Id> techFirmIds = new Set<Id>();
        List<Tech_Firm__c> techFirmsToUpdate = new List<Tech_Firm__c>();

        for(Employee__c empObj : listOfNewEmployees){
            if(empObj.Salary__c != null){
                techFirmIds.add(empObj.Tech_Firm__c);
            }
        }

        Map<Id, Decimal> minSalaryMap = new Map<Id, Decimal>();
        Map<Id, Decimal> maxSalaryMap = new Map<Id, Decimal>();


        List<AggregateResult> aggrList = [SELECT Tech_Firm__c, MIN(Salary__c) minSal, MAX(Salary__c) maxSal 
                                            FROM Employee__c 
                                            WHERE Tech_Firm__c 
                                            IN :techFirmIds
                                         GROUP BY Tech_Firm__c];

        System.debug('*******************aggrList***************'+aggrList);


        for(AggregateResult aggr : aggrList){
            if(techFirmIds.contains((Id)aggr.get('Tech_Firm__c'))){
                minSalaryMap.put((Id)aggr.get('Tech_Firm__c'), (Decimal)aggr.get('minSal'));
                maxSalaryMap.put((Id)aggr.get('Tech_Firm__c'), (Decimal)aggr.get('maxSal'));  
            }
        }    

        System.debug('*******************minSalaryMap***************'+minSalaryMap);
        System.debug('*******************maxSalaryMap***************'+maxSalaryMap);

        
        for(Tech_Firm__c techFirmObj : [SELECT Id, Name, Minimum_Salary__c, Maximum_Salary__c 
                                        FROM   Tech_Firm__c
                                        WHERE Id IN :techFirmIds]){

        	if(minSalaryMap.containsKey(techFirmObj.Id)){
                techFirmObj.Minimum_Salary__c = minSalaryMap.get(techFirmObj.Id);
            }

            if(maxSalaryMap.containsKey(techFirmObj.Id)){
                techFirmObj.Maximum_Salary__c = maxSalaryMap.get(techFirmObj.Id);
            }

            techFirmsToUpdate.add(techFirmObj);
        }

        if(!techFirmsToUpdate.isEmpty()){
            update techFirmsToUpdate;
        }
    }
}