public with sharing class CaseRedLightController {

    @AuraEnabled(cacheable=true)
    public static Map<String,Integer> getOpenCasesWithOpenedSinceDays(Integer limit1, Integer limit2) {
        List<Case> openCases = [SELECT Id, Subject, CreatedDate FROM Case WHERE IsClosed = false];
        Integer redCases = 0, orangeCases = 0, greenCases = 0;
        
        for (Case openCase : openCases) {
            Integer openedSinceDays = openCase.CreatedDate.date().daysBetween(Date.today());

            if(openedSinceDays <= limit1){
                greenCases += 1;
            } else if(openedSinceDays > limit1 && openedSinceDays <= limit2){
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

    @AuraEnabled(cacheable=true)
    public static Id raiseRedAlert(Integer limitTow) {
        CaseRedLightJob crlj = new CaseRedLightJob(limitTow);
        ID jobID = System.enqueueJob(crlj);
        return jobID;
    }
}