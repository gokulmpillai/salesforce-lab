import { LightningElement } from 'lwc';
import createRecords from '@salesforce/apex/JSONReaderController.createRecords';
export default class JsonReader extends LightningElement {

    contentVersionId;

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
                console.log('Success!!!!')
            })
            .catch((error)=> {
                console.log('Error');
            })
    }
}