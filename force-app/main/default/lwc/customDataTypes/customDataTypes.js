import LightningDatatable from 'lightning/datatable';
import picklistType from './picklistType.html';

export default class CustomDataTypes extends LightningDatatable {
    static customTypes = {
        customPicklist: {
            template: picklistType,
            standardCellLayout: true,
            typeAttributes: ['options', 'value']
        }
    };
}