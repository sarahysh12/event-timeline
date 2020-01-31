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
  categories: any[] = [];
  events: TimelineEvent[] = [];

  constructor() { }

  ngOnInit() {
    this.timeLineEvents = timelineItems;
    this.timelineSize = timelineItems.length;

    this.sortDates(this.timeLineEvents);


    // this.timeLineEvents.forEach(element => {
    //   // console.log(this.categories);
    //   // console.log('--------------------');
    //   // First element
    //   if (this.categories.length === 0) {
    //     this.events.push(element);
    //     this.categories.push(this.events);
    //     console.log(this.categories);
    //     console.log('**********');
    //   } else {
    //     for (const category of this.categories) {
    //       for (const event of category) {
    //         if (element.start < event.end) {
    //           this.events = [element];
    //           this.categories.push(this.events);
    //           break;
    //         } else {
    //           category.push(element);
    //         }
    //       }
    //     }

    //   }

    // });

  }



  //TODO type??
  sortDates(events: TimelineEvent[]) {
    console.log(JSON.stringify(events));
    console.log('---------------------');
    for (let i = 1; i < events.length; i++) {
      let key = events[i];
      console.log(key);
      let j = i - 1;
      while (events[j].start > key.start && j >= 0) {
        events[j + 1] = events[j];
        j -= 1;
      }
      events[j + 1] = key;
    }
    // console.log(events);
    // console.log(new Date(events[0].start) < new Date(events[1].start));

  }

}
