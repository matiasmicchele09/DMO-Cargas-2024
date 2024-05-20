import { Component, OnInit } from '@angular/core';
import { DmoService } from '../../services/dmo.service';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit{

  constructor(private dmoService: DmoService){}

  ngOnInit(): void {

    this.dmoService.getTrucks(1)
  }



}
