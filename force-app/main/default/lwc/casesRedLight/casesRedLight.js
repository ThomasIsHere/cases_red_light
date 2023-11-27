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
    wiredGetOpenCasesWithOpenedSinceDays({error, data}) {
        this.wiredReponse = {error, data};
        if (data) {
            this.mapCasesAlertColors = [];
            for (let key of Object.keys(data)) {
                this.mapCasesAlertColors.push({ key: key, value: data[key] });
            }
        } else if (error) {
            this.error(error);
        }
    }

    clickRefresh(){
        refreshApex(this.wiredReponse);
    }
}