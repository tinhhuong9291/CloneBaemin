import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
}
