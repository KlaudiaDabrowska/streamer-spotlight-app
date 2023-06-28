import { Body, Controller, Get, Param, Post, Put, Sse } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { AddStreamerDto } from './dtos/add-streamer.dto.';
import { UpdateVoteDto } from './dtos/update-vote.dto';
import { Observable } from 'rxjs';
import { StreamerSseService } from './streamers_sse.service';

@Controller('streamers')
export class StreamersController {
  constructor(
    private streamersService: StreamersService,
    private sseService: StreamerSseService,
  ) {}

  @Get()
  getStreamers() {
    return this.streamersService.getAll();
  }

  @Sse('sse')
  sse(): Observable<any> {
    return this.sseService.sse();
  }

  @Get('/:id')
  getStreamerById(@Param('id') id: string) {
    return this.streamersService.getById(+id);
  }

  @Post()
  addStreamer(
    @Body()
    body: AddStreamerDto,
  ) {
    return this.streamersService.add(
      body.streamerName,
      body.platform,
      body.description,
    );
  }

  @Put('/:id/vote')
  updateVote(@Param('id') id: string, @Body() body: UpdateVoteDto) {
    return this.streamersService.updateVote(+id, body.type);
  }
}
