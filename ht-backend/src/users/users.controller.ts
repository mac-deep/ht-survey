import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformationInterceptor } from 'src/interceptors/transform.interceptor';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('count')
  @UseInterceptors(TransformationInterceptor<number>)
  usersCount() {
    return this.usersService.usersCount();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(TransformationInterceptor<User>)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(TransformationInterceptor<User[]>)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('available')
  @UseInterceptors(TransformationInterceptor<boolean>)
  usernameAvailable(@Query('username') username: string) {
    return this.usersService.usernameAvailable(username);
  }

  @Get(':username')
  @UseInterceptors(TransformationInterceptor<User>)
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':username')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(TransformationInterceptor<User>)
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  @UseInterceptors(TransformationInterceptor<User>)
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
