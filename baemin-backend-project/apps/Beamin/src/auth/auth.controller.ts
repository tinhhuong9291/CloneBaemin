import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from '../core/guards/auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  badRequestResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  userAuthResponse,
} from '../swagger/swagger.util';
import { MESSAGES } from '../utils/constants/message';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserRole } from '../utils/constants/enums';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login Feature
  @Post('login')
  @ApiOperation({ summary: MESSAGES.API_MESSAGES.AUTH.LOGIN.MESSAGE_TITLE })
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.AUTH.LOGIN.MESSAGE_SUMARY,
  })
  @ApiResponse(userAuthResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(
    notFoundResponse(MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.USER_NOT_FOUND),
  )
  @ApiResponse(internalServerErrorResponse())
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req);
  }

  // Register feature
  @Post('register')
  @ApiOperation({ summary: MESSAGES.API_MESSAGES.AUTH.REGISTER.MESSAGE_TITLE })
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.AUTH.REGISTER.MESSAGE_SUMARY,
  })
  @ApiResponse(userAuthResponse(MESSAGES.SUCCESS_MESSAGES.REGISTER))
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    return this.authService.register(registerDto, req);
  }

  // Get all user by admin feature
  @ApiBearerAuth('authorization')
  @Get('users')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.AUTH.GET_ALL_USER.MESSAGE_TITLE,
  })
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.AUTH.GET_ALL_USER.MESSAGE_SUMARY,
  })
  @ApiResponse(unauthorizedResponse())
  async getAllUser() {
    return { message: 'Get all user by admin' };
  }
}
