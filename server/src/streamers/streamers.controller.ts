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
import { StreamerSseService, StreamerUpdated } from './streamers_sse.service';
import { PageOptionsDto } from 'src/shared/dtos/PageMetaDtoParameters';

@Controller('streamers')
export class StreamersController {
  constructor(
    private streamersService: StreamersService,
    private sseService: StreamerSseService,
  ) {}

  @Get()
  getStreamers(@Query() pageOptions: PageOptionsDto) {
    return this.streamersService.getAll(pageOptions);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent<StreamerUpdated>> {
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
