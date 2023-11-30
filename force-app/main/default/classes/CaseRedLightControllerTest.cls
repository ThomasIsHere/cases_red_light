@isTest
public with sharing class CaseRedLightControllerTest {
    
    @isTest public static void testMapSizeGetOpenCasesWithOpenedSinceDays(){
        Map<String,Integer> mCasesColors = CaseRedLightController.getOpenCasesWithOpenedSinceDays(1, 2);
        System.assertEquals(3, mCasesColors.size());
    }

    @isTest public static void testGreenGetOpenCasesWithOpenedSinceDays(){
        Account a = new Account(Name='Test');
        insert a;
        Case c = new Case(AccountId = a.Id);
        insert c;
        Map<String,Integer> mCasesColors = CaseRedLightController.getOpenCasesWithOpenedSinceDays(1, 2);
        System.assertEquals(1, mCasesColors.get('GREEN'));
    }

    @isTest public static void testOrangeGetOpenCasesWithOpenedSinceDays(){
        Account a = new Account(Name='Test');
        insert a;
        Case c = new Case(AccountId = a.Id);
        insert c;
        Map<String,Integer> mCasesColors = CaseRedLightController.getOpenCasesWithOpenedSinceDays(-1, 1);
        System.assertEquals(1, mCasesColors.get('ORANGE'));
    }

    @isTest public static void testRedGetOpenCasesWithOpenedSinceDays(){
        Account a = new Account(Name='Test');
        insert a;
        Case c = new Case(AccountId = a.Id);
        insert c;
        Map<String,Integer> mCasesColors = CaseRedLightController.getOpenCasesWithOpenedSinceDays(-2, -1);
        System.assertEquals(1, mCasesColors.get('RED'));
    }

    @isTest public static void testRaiseRedAlert(){
        Id jobId = CaseRedLightController.raiseRedAlert(2);
        List<AggregateResult> agResultCountId =[SELECT count(Id) countId FROM AsyncApexJob WHERE Id = :jobId];
        System.assertEquals(1, agResultCountId[0].get('countId'));
    }

}