import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AuthorDto } from "./dto/author.dto";
import { AuthorService } from "./author.service";

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  public async findAll(): Promise<AuthorDto[]> {
    return await this.authorService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.findOne(id);
  }

  @Post()
  public async create(@Body() body: AuthorDto): Promise<AuthorDto> {
    return await this.authorService.create(body);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: AuthorDto): Promise<AuthorDto> {
    return await this.authorService.update(id, body);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.authorService.remove(id);
  }

}
