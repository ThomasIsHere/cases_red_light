public with sharing class CaseRedLightController {
    public CaseRedLightController() {

    }

    @AuraEnabled(cacheable=true)
    public static Integer countTotalCases() {
        Integer totalCases = [SELECT COUNT() FROM Case];
        return totalCases;
    }
}