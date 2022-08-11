export interface Placeholder {
    title?: string,
    email?: string,
    contact: string,
    barber: string,
    service: string,
    time: string,
    date: string,
    price: string,
    book: string,
}

export function changeText(): Placeholder {
   
    if (window.innerWidth >= 450) {
        return  { 
            contact: "Contact Number",               
            barber: "Select Barber",               
            service: "Select Service",            
            date: "Select Date",               
            time: "Select Time",
            price: "Select any Service",               
            book: "BOOK APPOINTMENT"             
            }
    } else {
        return  {
            contact: "Phone",
            barber: "Barber",
            service: "Service",
            date: "Date",
            time: "Time",
            price: "Price",
            book: "BOOK"
        }
    }    
}