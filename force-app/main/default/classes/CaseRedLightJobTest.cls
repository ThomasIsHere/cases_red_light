@isTest
public with sharing class CaseRedLightJobTest {
    
    @TestSetup
    public static void setup(){
        Account a = new Account(Name='Test');
        insert a;
        Case c = new Case(AccountId = a.Id);
        insert c;
    }

    static testmethod void testQueueable() { 
        CaseRedLightJob crlj = new CaseRedLightJob(-1);
        Test.startTest();
        System.enqueueJob(crlj);
        Test.stopTest();

        List<Case> lc = [SELECT Id, CreatedDate FROM Case WHERE IsClosed = false];
        System.assertEquals(1, [SELECT count() FROM FeedItem WHERE ParentId = :lc[0].Id]);
    }
}