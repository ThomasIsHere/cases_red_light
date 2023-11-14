public with sharing class CaseRedLightController {
    public CaseRedLightController() {

    }

    @AuraEnabled(cacheable=true)
    public static Integer countTotalCases() {
        Integer totalCases = [SELECT COUNT() FROM Case];
        return totalCases;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,Integer> getOpenCasesWithOpenedSinceDays() {
        List<Case> openCases = [SELECT Id, Subject, CreatedDate FROM Case WHERE IsClosed = false];
        Integer redCases = 0, orangeCases = 0, greenCases = 0;
        
        for (Case openCase : openCases) {
            Integer openedSinceDays = openCase.CreatedDate.date().daysBetween(Date.today());

            if(openedSinceDays <= 1){
                greenCases += 1;
            } else if(openedSinceDays > 1 && openedSinceDays <= 2){
                orangeCases += 1;
            } else {
                redCases += 1;
            }
        }

        Map<String,Integer> mCasesColors = new Map<String,Integer>();
        mCasesColors.put('GREEN', greenCases);
        mCasesColors.put('ORANGE', orangeCases);
        mCasesColors.put('RED', redCases);
        
        return mCasesColors;
    }
}