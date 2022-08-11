import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quote: string = "";
  
  constructor() { }

  ngOnInit(): void {
    if (!(window.innerWidth <= 450)) {
      this.quote = "So Don't Wait And Book Your Appointment Now!";
    } 
  }
}
