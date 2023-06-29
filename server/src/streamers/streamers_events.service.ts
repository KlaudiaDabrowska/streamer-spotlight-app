import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { Platform } from './dtos/add-streamer.dto.';

export interface StreamerUpdated {
  id: string;
  streamerName: string;
  platform: Platform;
  description: string;
  image: string;
  upvotes: number;
  downvotes: number;
}

@Injectable()
export class StreamerEventsService {
  private eventSubject = new Subject<MessageEvent<StreamerUpdated>>();

  pushEvent(event: StreamerUpdated) {
    this.eventSubject.next({ data: event } as MessageEvent<StreamerUpdated>);
  }

  subscribe(): Observable<MessageEvent<StreamerUpdated>> {
    return this.eventSubject.asObservable();
  }
}
