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
    this.sortEvents();
    console.log(this.findNumberOfRows());
  }


  sortEvents() {
    //TODO do I need to sort by end if starts are the same
    let i = 1;
    let j = 0;
    for (i = 0; i < this.timeLineEvents.length; i++) {
      let key = this.timeLineEvents[i];
      j = i - 1;
      while (j >= 0 && key.start < this.timeLineEvents[j].start) {
        this.timeLineEvents[j + 1] = this.timeLineEvents[j]
        j -= 1
      }
      this.timeLineEvents[j + 1] = key;
    }
  }

  findNumberOfRows() {
    // let intervals = [[1, 2], [1, 2], [1, 2]];
    let count = 0
    let i = 0;
    for (i = 0; i < this.timeLineEvents.length - 1; i++) {
      if (this.timeLineEvents[i].end > this.timeLineEvents[i + 1].start) {
        if (this.timeLineEvents[i].end > this.timeLineEvents[i + 1].end) {
          this.timeLineEvents[i + 1].end = this.timeLineEvents[i + 1].end;
        }
        else {
          this.timeLineEvents[i + 1].end = this.timeLineEvents[i].end;
        }
        count += 1;
      }
    }
    return count;

  }

}
