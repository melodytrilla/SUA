import { Injectable } from '@angular/core';
import * as json2csv from 'json2csv'; // convert json file to csv
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class DownloadService {

  Json2csvParser = json2csv.Parser;
    constructor() {

     }
     public downloadFile(data:any, filename? : string){
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(file,"solicitudes.csv");
    }



    public convertToCSV(objArray: any, fields?) {
        let json2csvParser = new this.Json2csvParser({ opts: fields });
        let csv = json2csvParser.parse(objArray);
        console.log(csv);
        return csv;
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
    
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      console.log('worksheet',worksheet);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}
