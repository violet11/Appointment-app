import { DateTime } from "luxon";

export interface Appointment {
    id: number,
    startDate: number,
    barberId: number,
    serviceId: number
}
