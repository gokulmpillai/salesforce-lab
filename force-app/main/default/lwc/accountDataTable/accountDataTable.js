import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEE_COUNT from '@salesforce/schema/Account.NumberOfEmployees';
import getAccounts from '@salesforce/apex/AccountDatatableController.getAccounts';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

const COLUMNS = [{label: 'Name', fieldName: ACCOUNT_NAME.fieldApiName, type: 'text'},
                 {label: 'Annual Revenue', fieldName: ACCOUNT_ANNUAL_REVENUE.fieldApiName, type: 'text'},
                 {label: 'Number of Employees', fieldName: ACCOUNT_EMPLOYEE_COUNT.fieldApiName},
                 {label: 'Phone', fieldName: ACCOUNT_PHONE.fieldApiName},
                 {label: 'Industry', fieldName: ACCOUNT_INDUSTRY.fieldApiName, type: 'customPicklist', wrapText: true,
                  typeAttributes:{
                    options : {fieldName: 'industryOptions'},
                    value : {fieldName: ACCOUNT_INDUSTRY.fieldApiName }
                  }}
                ];

export default class AccountDataTable extends LightningElement {
    industries=[];
    columns=COLUMNS;
    accounts=[];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT})
    accountInfo;

    @wire(getPicklistValues, {recordTypeId: '$accountInfo.data.defaultRecordTypeId',fieldApiName: ACCOUNT_INDUSTRY})
    industryPicklistValues({data, error}){
        if(data){
            this.industries = data.values;
            this.accountList();
            console.log('Industry Options: ' + JSON.stringify(this.industries));
        }
        else{
            this.error = error;
            console.log(this.error);
        }
    }

    accountList(){
        getAccounts().then(result => {
            let options = [];
            this.industries.forEach(element => {
                options.push({'label' : element.label, 'value': element.value})
            });
            console.log('Industries: ' + JSON.stringify(this.industries));
            this.accounts = result.map((element =>{
                return {...element, 'industryOptions' :options}
            })
            )
            console.log('Accounts: ' + JSON.stringify(this.accounts));
        }) 
    }

    // @wire(getAccounts)
    // accounts;

}