import { LightningElement, wire } from 'lwc';
import countTotalCases from '@salesforce/apex/CaseRedLightController.countTotalCases';
import getOpenCasesWithOpenedSinceDays from '@salesforce/apex/CaseRedLightController.getOpenCasesWithOpenedSinceDays';

export default class CasesRedLight extends LightningElement {
    totalCases;
    mapCasesAlertColors;

    @wire(countTotalCases)
    wiredTotalCases({ error, data }) {
        if (data) {
            this.totalCases = data;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getOpenCasesWithOpenedSinceDays)
    wiredGetOpenCasesWithOpenedSinceDays({ error, data }) {
        if (data) {
            this.mapCasesAlertColors = data;
        } else if (error) {
            console.error(error);
        }
    }
}