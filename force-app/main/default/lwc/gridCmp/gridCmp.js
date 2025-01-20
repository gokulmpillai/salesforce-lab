import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/GridController.getAccounts';

export default class GridCmp extends LightningElement {

    @wire(getAccounts)
    accounts;
}