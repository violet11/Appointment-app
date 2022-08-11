import { Interval } from "luxon";
import { Duration } from "luxon";
import { FormatHours } from "./formatHours";

export class CalculateIntervals {

    constructor( public mainInterval: Interval, public lunchInterval: Interval, public bookedIntervals: Interval[]) {}

    calculateIntervals() {
        let newIntervals: any[] = [];
        let newHours: any = [];
        let tenMinuteInterval: any = Duration.fromObject({ minutes: 10 });
        let overlapIntervals = this.bookedIntervals.concat(this.lunchInterval);

        this.bookedIntervals.length > 0 ? newIntervals = this.mainInterval.difference(...overlapIntervals):
            newIntervals = this.mainInterval.difference(this.lunchInterval);              
        
        for(let interval of newIntervals) {
            newHours = newHours.concat(interval.splitBy(tenMinuteInterval));            
        }
        return new FormatHours(newHours).formatHours();
    }
}