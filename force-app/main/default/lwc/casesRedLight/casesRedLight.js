import { LightningElement, wire, api } from 'lwc';

import countTotalCases from '@salesforce/apex/CaseRedLightController.countTotalCases';
import getOpenCasesWithOpenedSinceDays from '@salesforce/apex/CaseRedLightController.getOpenCasesWithOpenedSinceDays';

export default class CasesRedLight extends LightningElement {
    @api greenLimit;
    @api orangeLimit;
    @api redLimit;

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
            this.mapCasesAlertColors = [];
            for (let key of Object.keys(data)) {
                this.mapCasesAlertColors.push({ key: key, value: data[key] });
            }
        } else if (error) {
            console.error(error);
        }
    }
}