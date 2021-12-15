import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {LinksService} from "./links.service";
import {Link} from "../entities/link.entity";
import {CreateLinkDto} from "./dtos/create-link.dto";
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../entities/user.entity";
import {CurrentUser} from "../auth/user.decorator";

@ApiTags('Links')
@Controller('links')
export class LinksController {
    constructor(private readonly linkService: LinksService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createLinkDto: CreateLinkDto, @CurrentUser() user: User): Promise<Link> {
        return this.linkService.create(user.id, createLinkDto);
    }

    @Get()
    findAll(): Promise<Link[]> {
        return this.linkService.findAll();
    }

    @Get('search')
    search(@Query('query') query: string): Promise<Link[]> {
        return this.linkService.search(query);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.linkService.removeById(id);
    }
}
