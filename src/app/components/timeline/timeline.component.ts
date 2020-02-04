import { Component, OnInit } from '@angular/core';

import timelineItems from './timelineItems';
import { TimelineEvent } from 'src/app/models/timeline-event';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  timelineSize: string;
  timeLineEvents: TimelineEvent[];

  overlappedEvents: TimelineEvent[] = [];
  sequentialEvents: TimelineEvent[] = [];


  private rangeStart: Date;
  private rangeEnd: Date;
  private months: number;

  constructor() { }

  ngOnInit() {
    this.timeLineEvents = timelineItems;
    this.timelineSize = timelineItems.length;
    this.categorizeEvents(this.timeLineEvents);
    this.getEventsRange(this.timeLineEvents);
    this.months = this.calculateMonths(this.rangeStart, this.rangeEnd);
    
    //TODO do we need sort events???
  }

  categorizeEvents(events: TimelineEvent[]){
    events.forEach(event => {
      let isOverlapped = false;
      if (this.sequentialEvents.length > 0){
        for(let item of this.sequentialEvents){
          if (event.start >= item.start && event.start <= item.end  || event.end >= item.start && event.end <= item.end ){
            this.overlappedEvents.push(event);
            isOverlapped = true;
            break;
          }
    }
  }
    if(!isOverlapped)
      this.sequentialEvents.push(event);
    });
  }

  getEventsRange(events: TimelineEvent[]){
    events.forEach(event => {
      if (!this.rangeEnd && !this.rangeStart){
        this.rangeStart = event.start;
        this.rangeEnd = event.end;
      } 
      else{
        if (event.start < this.rangeStart)
          this.rangeStart = event.start;
        if (event.end > this.rangeEnd)
          this.rangeEnd = event.end;;
      }
    });
  }

  calculateMonths(start: Date, end: Date) {
    start = new Date(start);
    end = new Date(end);
    let months;
    months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth() + 1;
    months += end.getMonth();
    return months <= 0 ? 0 : months;
}


  printEvents(){
    console.log('------------NORMAL----------------');
    this.sequentialEvents.forEach(n =>{
      console.log(n.start, n.end);
    })
    console.log('------------OVERLAPPED----------------');
    this.overlappedEvents.forEach(o =>{
      console.log(o.start, o.end);
    })
  }

}
