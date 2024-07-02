import { LightningElement } from 'lwc';
import { subscribe} from 'lightning/empApi';
export default class LiveCaseTracker extends LightningElement {

    channelName = '/event/Case_Update__e';
    results = [];


    connectedCallback(){
        this.showNewCases();
    }

    showNewCases(){
            subscribe(this.channelName, -1, this.messageCallback).then(response => {
            console.log('Successfully subscribed to : '+this.channelName);
            console.log('response.channel: '+JSON.stringify(response.channel));         
        })
    }

    messageCallback = (response) => {
            let caseId = response.data.payload.Case_Id__c;
            let caseNumber = response.data.payload.Case_Number__c;
            let description = response.data.payload.Description__c;
            let caseDetails = {'caseId': caseId, 'caseNumber': caseNumber, 'description' : description};
            // this.results.push(caseDetails);
            this.results = [...this.results, caseDetails];
            console.log(this.results);
        }
}
