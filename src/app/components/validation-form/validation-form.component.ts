import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { BarberService } from 'src/app/services/barber.service';
import { Appointment } from 'src/app/interfaces/appointment';
import { changeText, Placeholder } from 'src/app/interfaces/placeholder';
import { WorkingTime } from 'src/app/barberModules/workingTime';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css']
})


export class ValidationFormComponent implements OnInit {
  // ustvari skupino vseh elementov v formi - določimo isto ime kot v templatu v <form>
  form: any = FormGroup; 
  placeholder: Placeholder;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  barbers: any[] = [];
  services: any[] = [];
  appointments: Appointment[] = [];
  workingHours: any[] = [];
  
  // regex vzorec za email in slovensko mobilno številko
  emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
  contactNumberRegex = /^(([0-9]{3})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))|([0-9]{9})|([\+]?([0-9]{3})[ \-\/]?([0-9]{2})[ \-\/]?([0-9]{3})[ \-\/]?([0-9]{3}))$/;

  // za določanje razpoložljivosti datumov v datepicker
  minDate = new Date(); // naročiti se je možno od današnjega dneva naprej
  maxDate = new Date();

  // določimo spremenljivko glede na klik submit gumba
  submitted = false;

  // pomagamo si z FormBuilder service, da ne rabimo za vsako pisat x = new FormControl("")
  // BarberService uporabimo za menjavo podatkov s serverjem
  constructor(private fb: FormBuilder, private barberService: BarberService, private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 14); // naročiti se je možno do največ čez 14 dni
    this.placeholder = changeText(); // spremeni tekst glede na velikost ekrana
    this.resizeObservable$ = fromEvent(window, "resize");
    this.resizeSubscription$ = this.resizeObservable$
      .subscribe(() => {this.placeholder = changeText()});
  }
  
  ngOnInit() {
    this.initializeForm();
    this.barberService
      .getBarbers()
      .subscribe((data) => {this.barbers = data}); // iz serverja dobimo celoten array
    this.barberService
      .getServices()
      .subscribe((data) => {this.services = data});
    this.barberService
      .getAppointments()
      .subscribe((data) => {this.appointments = data});    
  }
    
  // obrazec postavi na začetno vrednost in določi validatorje
  initializeForm(): void {
    this.form = this.fb.group({
      firstName: ["", Validators.required], 
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
      contactNumber: ["", [Validators.required, Validators.pattern(this.contactNumberRegex)]],
      chosenBarber: [null, Validators.required],
      service: [null, Validators.required],
      date: ["", Validators.required],
      time: [null, Validators.required],
      price: {value: "", disabled: true},
    })
  }
 
  get firstName() { return this.form.get("firstName")}
  get lastName() { return this.form.get("lastName")}
  get email() { return this.form.get("email")}
  get contactNumber() { return this.form.get("contactNumber")}
  get chosenBarber() { return this.form.get("chosenBarber")}
  get service() { return this.form.get("service")}
  get date() { return this.form.get("date")}
  get time() { return this.form.get("time")}

  changeWorkingHours(): void {
    let value = this.form.value;

    if (value.chosenBarber && value.service && value.date ) {
      let newTime = new WorkingTime(this.barbers, this.services, this.appointments, 
        value.chosenBarber.id, value.service.id, value.date);
      this.workingHours = [...newTime.time];
    }
  }

  // v templatu pri select service funkcija change - spremeni value inputa select any service
  writePrice(): void {
    let serviceId = this.form.value.service.id;
    this.form.patchValue({
      price: "Price is" + " " + this.services[serviceId - 1].price
    });
  }

  // pošlje v bazo podatkov
  createAppointment(): void {
    let value = this.form.value;
    let time = DateTime.fromISO(value.time);
    let date = DateTime.fromJSDate(value.date);
    let appointment = {
      id: 0,
      startDate: date.set({hour: time.hour, minute: time.minute}).toUnixInteger(), // spremeni v unix
      barberId: this.form.value.chosenBarber.id,
      serviceId: this.form.value.service.id
    } 
    this.barberService.addAppointment(appointment).subscribe((data: Appointment) => data = appointment);    
  }

  // s klikom se podatki pošljejo naprej in obrazec se vrne v prvotno stanje
  onSubmit(success: any): void {
    this.submitted = true; // zato se prikažejo vsa invalid validation sporočila
    if(!this.form.invalid) {
      this.router.navigate([`${success}`]);
      this.createAppointment();
    }
  }

  ngOnDestroy(): void {
    // this.resizeSubscription$.unsubscribe();
  }
}