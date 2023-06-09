import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConsoleLogger,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailAlreadyExistsException } from './exceptions/emailAlreadyExists.exception';
import { Role } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import RoleGuard from 'src/auth/guards/roleGuard';
import { UpdateEtatDto } from './dto/update-etat.dto';

/* @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin)) */
@Controller('users')
export class UsersController {
  logger = new ConsoleLogger();
  constructor(private readonly usersService: UsersService) {}

  //Création de compte pour un utilisateur
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    //Verifier si un compte avec le meme mail existe déja
    const user = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new EmailAlreadyExistsException();
    }
    //creer le compte si le mail n'existe pas encore
    return this.usersService.create(createUserDto);
  }

  //Récupérer tous les utilisateur
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //Récupérer tous les utilisateurs archivés
  @Get('/archive')
  findAllArchive() {
    return this.usersService.findAllArchive();
  }

  //Récuperer un utilisateur à travers son mail
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  //Recupérer un utilisateur à travers son matricule
  @Get('search/:matricule')
  search(@Param('matricule') matricule: string) {
    return this.usersService.search(matricule);
  }

  //Modifier un utilisateur à travers son id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('switch/:id')
  switch(@Param('id') id: string) {
    return this.usersService.switch(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //Desarchiver un utilisateur à travers son id
  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Patch('etat/:id')
  update_etat(@Param('id') id: string, @Body() updateEtatDto: UpdateEtatDto) {
    return this.usersService.update_etat(id, updateEtatDto);
  }
}
