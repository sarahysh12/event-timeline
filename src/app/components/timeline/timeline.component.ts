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

  constructor() { }

  ngOnInit() {
    this.timeLineEvents = timelineItems;
    this.timelineSize = timelineItems.length;
    this.categorizeEvents(this.timeLineEvents);
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
