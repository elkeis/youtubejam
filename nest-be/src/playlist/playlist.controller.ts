import { Controller, Get } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {

    constructor( private playlistService: PlaylistService ) {}

    @Get()
    async getAll() {
        return this.playlistService.fetchPlaylist();
    }
}
