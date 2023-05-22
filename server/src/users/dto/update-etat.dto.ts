import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class UpdateEtatDto extends PickType(CreateUserDto, ['etat'] as const) {}
