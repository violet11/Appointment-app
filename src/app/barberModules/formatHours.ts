   import { DateTime } from "luxon";
   
   export class FormatHours {

    constructor(public array: any[]) {}
    
   // iz desetminutnih intervalov dobimo seznam prostih terminov v obliki hh:mm
    formatHours() {
        let workingHours: any[] = [];
        let len = this.array.length;

        this.array.forEach((item) => this.array.push(item.start.toLocaleString(DateTime.TIME_SIMPLE), 
            item.end.toLocaleString(DateTime.TIME_SIMPLE)));
        this.array.splice(0, len);
        
        // metoda Set avtomatsko filtrira array tako, da izloči duplikate
        workingHours = Array.from(new Set(this.array));

        return workingHours;
    }
}