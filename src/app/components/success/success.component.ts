import { Component, OnInit } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent implements OnInit {
  gif: any;
  randomGif: any;
  width: any;
  height: any;
  title: string = "APPOINTMENT SUCCESSFULLY BOOKED";

  constructor(private barberService: BarberService) { 
  }

  ngOnInit(): void {
    // dobimo random gife
    this.barberService.getGifs().subscribe((api) => {
      this.gif = api.data[Math.floor(Math.random() * (api.data.length - 1))];
      this.randomGif = this.gif.embed_url;
      this.width = this.gif.images.original.width;
      this.height = this.gif.images.original.height;
    });
  }
}
