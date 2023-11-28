public with sharing class CaseRedLightJob implements Queueable {
    public void execute(QueueableContext context) {
        System.debug('queuable method called');
    }
}