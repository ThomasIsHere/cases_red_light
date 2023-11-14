import { LightningElement, wire } from 'lwc';
import countTotalCases from '@salesforce/apex/CaseRedLightController.countTotalCases';

export default class CasesRedLight extends LightningElement {
    totalCases;

    @wire(countTotalCases)
    wiredTotalCases({ error, data }) {
        if (data) {
            this.totalCases = data;
        } else if (error) {
            console.error(error);
        }
    }
}