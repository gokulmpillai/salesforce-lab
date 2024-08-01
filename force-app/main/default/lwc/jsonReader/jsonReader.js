import { LightningElement } from 'lwc';
import createRecords from '@salesforce/apex/JSONReaderController.createRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class JsonReader extends LightningElement {

    contentVersionId;
    showResults=false;
    totalAccounts=0;
    totalContacts=0;
    

    get acceptedFormat(){ 
        return  ['.json'];
    };

    uploadHandler(event){
        const uploadedFiles = event.detail.files;
        console.log('Uploaded Files: ' + JSON.stringify(uploadedFiles));
        this.contentVersionId = uploadedFiles[0].contentVersionId;
        console.log('Content Version Id: ' + this.contentVersionId);
    }

    submitHandler(){
        createRecords({contentVersionId: this.contentVersionId})
            .then((result) => {
                if(result){
                    this.showResults =true;
                    this.totalAccounts = result.accountCount;
                    this.totalContacts = result.contactCount;
                }
            })
            .catch((error)=> {
                console.log('Error');
            })
    }
}