public with sharing class CaseRedLightJob implements Queueable {

    private Integer limitTow;

    public CaseRedLightJob(Integer limitTow){
        this.limitTow = limitTow;
    }

    public void execute(QueueableContext context) {
        System.debug('queuable method called: ' + String.valueOf(limitTow));
    }
}