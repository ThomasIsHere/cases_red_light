public with sharing class CaseRedLightJob implements Queueable {

    private Integer limitTow;

    public CaseRedLightJob(Integer limitTow){
        this.limitTow = limitTow;
    }

    public void execute(QueueableContext context) {
        Date limitDate = Date.today().addDays(-this.limitTow);
        List<Case> openRedCases = [SELECT Id FROM Case WHERE IsClosed = false and CreatedDate < :limitDate];

        List<FeedItem> lfi = new List<FeedItem>();

        for (Case c : openRedCases) {
            FeedItem caseFeedItem = new FeedItem(
                ParentId = c.Id, 
                Title='Red Alert', 
                Body = 'This case has been raised to red alert because it has been open for more than ' + this.limitTow +' days.', 
                Type='TextPost'
            );
            lfi.add(caseFeedItem);
        }
        insert lfi;
    }
}