import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getOpenCasesWithOpenedSinceDays from '@salesforce/apex/CaseRedLightController.getOpenCasesWithOpenedSinceDays';

export default class CasesRedLight extends LightningElement {
    @api limitOne;
    @api limitTow;
    mapCasesAlertColors;
    wiredReponse;
    error;
    ageDays = '';

    @wire(getOpenCasesWithOpenedSinceDays, {limit1: '$limitOne', limit2: '$limitTow'})
    wiredGetOpenCasesWithOpenedSinceDays(response) {
        this.wiredReponse = response;
        if (response.data) {
            this.mapCasesAlertColors = [];
            for (let key of Object.keys(response.data)) {
                if(key =='GREEN'){
                    this.ageDays = 'Age <= '+ this.limitOne + ' days';
                }else if(key =='ORANGE'){
                    this.ageDays = this.limitOne +' days < Age <= '+ this.limitTow + ' days';
                }else{
                    this.ageDays = this.limitTow +' days < Age';
                }
                this.mapCasesAlertColors.push({ key: key, value: response.data[key], age: this.ageDays});
            }
        } else if (response.error) {
            this.error = response.error;
        }
    }

    clickRefresh(){
        refreshApex(this.wiredReponse);
    }
}