import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { IAddStreamer } from './types/addStreamer';
import { IUpdateVotes } from './types/updateVotes';

@Controller('streamers')
export class StreamersController {
  constructor(private streamersService: StreamersService) {}

  @Get()
  getStreamers() {
    return this.streamersService.getAll();
  }

  @Get('/:id')
  getStreamerById(@Param('id') id: string) {
    return this.streamersService.getById(+id);
  }

  @Post()
  addStreamer(
    @Body()
    body: IAddStreamer,
  ) {
    return this.streamersService.add(
      body.streamerName,
      body.platform,
      body.description,
    );
  }

  @Put('/:id/vote')
  updateVote(@Param('id') id: string, @Body() body: IUpdateVotes) {
    return this.streamersService.updateVote(+id, body.type, body.vote);
  }
}
