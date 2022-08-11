import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  // connect in html
  path: string = "../assets/images/image.jpg";
  altText: string = "Barber cutting client's beard"

  constructor() { }

  ngOnInit(): void {
  }

}
