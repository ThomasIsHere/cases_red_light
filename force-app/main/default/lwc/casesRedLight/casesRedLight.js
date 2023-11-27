import { LightningElement, wire, api } from 'lwc';

import countTotalCases from '@salesforce/apex/CaseRedLightController.countTotalCases';
import getOpenCasesWithOpenedSinceDays from '@salesforce/apex/CaseRedLightController.getOpenCasesWithOpenedSinceDays';

export default class CasesRedLight extends LightningElement {
    @api limitOne;
    @api limitTow;

    totalCases;
    mapCasesAlertColors;
    error;

    @wire(countTotalCases)
    wiredTotalCases({ error, data }) {
        if (data) {
            this.totalCases = data;
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getOpenCasesWithOpenedSinceDays, {limit1: '$limitOne', limit2: '$limitTow'})
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