import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpenCasesWithOpenedSinceDays from '@salesforce/apex/CaseRedLightController.getOpenCasesWithOpenedSinceDays';

export default class CasesRedLight extends LightningElement {
    @api limitOne;
    @api limitTow;
    mapCasesAlertColors;
    wiredReponse;
    error;

    @wire(getOpenCasesWithOpenedSinceDays, {limit1: '$limitOne', limit2: '$limitTow'})
    wiredGetOpenCasesWithOpenedSinceDays(response) {
        this.wiredReponse = response;
        if (response.data) {
            this.mapCasesAlertColors = [];
            for (let key of Object.keys(response.data)) {
                this.mapCasesAlertColors.push({ key: key, value: response.data[key] });
            }
        } else if (response.error) {
            this.error = response.error;
        }
    }

    clickRefresh(){
        refreshApex(this.wiredReponse);
    }
}