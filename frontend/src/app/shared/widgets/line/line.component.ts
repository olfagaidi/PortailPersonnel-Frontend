import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  highcharts = Highcharts;
   chartOptions = {};

  constructor() { }

  ngOnInit() {

    this.chartOptions = {
      
      chart: {
        type: "spline"
     },

     title: {
      text: "Nombre d'employés par année"
   },

     xAxis:{
      title:{
        text:"Années"
     } ,
      categories:["2021", "2022", "2023", "2024"]
   },

   yAxis: {          
    title:{
       text:"Nombre d'employés"
    } 
 }, 

 tooltip: {
  split: true,
  valueSuffix: ' personnes'
},

exporting: {
  split:true,
  valueSuffix: ' personnes' 
},

credits:{
  enabled:false
},

series: [
  {
     name:"Nombre d'employés",
     data: [8, 15, 20, 25]
  }]


};
  
    HC_exporting(Highcharts);

    setTimeout (() => {
      window.dispatchEvent(
        new Event ('resize')
      );
    },300);


  }

}
