import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { Platform } from './dtos/add-streamer.dto.';

export interface StreamerUpdated {
  id: number;
  streamerName: string;
  platform: Platform;
  description: string;
  upvotes: number;
  downvotes: number;
}

@Injectable()
export class StreamerSseService {
  private eventSubject = new Subject<MessageEvent<StreamerUpdated>>();

  pushEvent(event: StreamerUpdated) {
    this.eventSubject.next({ data: event } as MessageEvent<StreamerUpdated>);
  }

  sse(): Observable<MessageEvent<StreamerUpdated>> {
    return this.eventSubject.asObservable();
  }
}
