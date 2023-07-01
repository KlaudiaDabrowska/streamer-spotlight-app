import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Sse,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { AddStreamerDto } from './dtos/add-streamer.dto.';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { Observable } from 'rxjs';
import {
  StreamerEventsService,
  StreamerUpdated,
} from './streamers_events.service';
import { PageOptionsDto } from 'src/shared/dtos/PageMetaDtoParameters';

@Controller('/streamers')
export class StreamersController {
  constructor(
    private streamersService: StreamersService,
    private streamerEventsService: StreamerEventsService,
  ) {}

  @Get()
  getStreamers(@Query() pageOptions: PageOptionsDto) {
    return this.streamersService.getAll(pageOptions);
  }

  @Sse('/streamer-events')
  subscribeToStreamerEvents(): Observable<MessageEvent<StreamerUpdated>> {
    return this.streamerEventsService.subscribe();
  }

  @Get('/:id')
  getStreamerById(@Param('id') id: string) {
    return this.streamersService.getById(id);
  }

  @Post()
  addStreamer(@Body() body: AddStreamerDto) {
    return this.streamersService.add(
      body.streamerName,
      body.platform,
      body.description,
      'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
    );
  }

  @Put('/:id/vote')
  updateVote(@Param('id') id: string, @Body() body: UpdateVoteDto) {
    return this.streamersService.updateVote(id, body.type);
  }
}
