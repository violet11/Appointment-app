import { DateTime } from 'luxon';
import { Interval } from 'luxon';
import { CalculateIntervals } from './calculateIntervals';


export class WorkingTime {
    time: any;
    day = DateTime.fromJSDate(this.chosenDay);
    workHours = this.barbers[this.barberId - 1].workHours[DateTime.fromJSDate(this.chosenDay).weekday - 1];
    chosenDuration = this.services[this.serviceId - 1].durationMinutes;

    constructor(public barbers: any, public services: any, public appointments: any, 
            public barberId: number, public serviceId: number, public chosenDay: Date) {
            this.time = new CalculateIntervals(this.createMainInterval(), this.createLunchInterval(), 
            this.createBookedIntervals()).calculateIntervals();
        }
    
    createInterval(start: DateTime, end: DateTime): Interval {
        return Interval.fromDateTimes(start, end);
    }

    // dobimo seznam terminov prostega dne
    createMainInterval(): Interval {
        let startHour = this.workHours.startHour;
        let endHour = this.workHours.endHour;
        let startWork = this.day.set({hour : startHour, minute: 0 });
        let endWork = this.day.set({hour : endHour, minute: 0})
            .minus({minute: this.chosenDuration});
        return this.createInterval(startWork, endWork);
    }

    createLunchInterval(): Interval {
        let lunchHour = this.workHours.lunchTime.startHour;
        let lunchMinutes = this.workHours.lunchTime.durationMinutes;
        let startLunch = this.day.set({hour: lunchHour, minute: 0}).minus({minute: this.chosenDuration});
        let endLunch = startLunch.plus({minute: lunchMinutes + this.chosenDuration});
        return this.createInterval(startLunch, endLunch);
    }

    createBookedIntervals(): Interval[] {
        let bookedIntervals: Interval[] = [];
            for(let appointment of this.appointments) {
                    let bookedDate = DateTime.fromSeconds(appointment.startDate);
                    let bookedDuration = this.services[appointment.serviceId - 1].durationMinutes
                    let startAppointment = bookedDate.minus({minute: this.chosenDuration});
                    let endAppointment = bookedDate.plus({minute: bookedDuration});

                if (appointment.barberId == this.barberId) {
                    let intervalBooked = this.createInterval(startAppointment, endAppointment);
                    bookedIntervals.push(intervalBooked); // dobimo seznam intervalov naročenih terminov
                }
        }
        return bookedIntervals;
    }
}