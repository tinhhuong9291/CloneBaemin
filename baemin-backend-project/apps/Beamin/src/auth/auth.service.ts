import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { TokenType, UserRole } from '../utils/constants/enums';
import { ConfigService } from '@nestjs/config';
import {
  LoginResponseType,
  RegisterResponseType,
} from '../@types/response.type';
import { MESSAGES } from '../utils/constants/message';
import moment from 'moment';
import * as useragent from 'useragent';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Sign access token
  async createAccessToken(
    id: string,
    email: string,
    role: string,
  ): Promise<string> {
    const payload = { id, email, role, type: TokenType.AccessToken };
    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get('ACCESS_TOKEN_EXPIRESIN'),
    });
  }

  // Sign refresh token
  async createRefreshToken(
    id: string,
    email: string,
    role: string,
  ): Promise<string> {
    const payload = { id, email, role, type: TokenType.RefreshToken };
    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get('REFRESH_TOKEN_EXPIRESIN'),
    });
  }

  // Sign access_token and refresh_token
  async signAccessAndRefreshToken(
    id: string,
    email: string,
    role: string,
  ): Promise<[string, string]> {
    return Promise.all([
      this.createAccessToken(id, email, role),
      this.createRefreshToken(id, email, role),
    ]);
  }

  // Save refresh_token
  async saveRefreshToken(
    id: string,
    refresh_token: string,
    device: string,
    ip: string,
    userAgent: string,
  ): Promise<any> {
    const existingToken = await this.prisma.refreshToken.findFirst({
      where: { user_id: id },
    });

    if (existingToken) {
      await this.prisma.refreshToken.update({
        where: { id: existingToken.id },
        data: {
          token: refresh_token,
          device_info: device,
          ip_address: ip,
          user_agent: userAgent,
          updated_at: new Date(),
        },
      });
    } else {
      await this.prisma.refreshToken.create({
        data: {
          user_id: id,
          token: refresh_token,
          device_info: device,
          ip_address: ip,
          user_agent: userAgent,
          created_at: new Date(),
        },
      });
    }
  }

  // Save user_session
  async saveUserSession(id: string): Promise<any> {
    await this.prisma.userSession.create({
      data: {
        user_id: id,
        login_at: new Date(),
        created_at: new Date(),
      },
    });
  }

  // Login feature
  async login(loginDto: LoginDto, req: Request): Promise<LoginResponseType> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException(
        MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.EMAIL_OR_PASSWORD,
      );
    }

    // Extract device info and IP address from the request
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const agent = useragent.parse(userAgent);

    const deviceInfo = {
      browser: agent.family,
      os: agent.os.family,
      device: agent.device.family,
    };

    await this.saveUserSession(user?.id);

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(
      user.id,
      email,
      user?.role,
    );

    await this.saveRefreshToken(
      user?.id,
      refresh_token,
      JSON.stringify(deviceInfo),
      ipAddress,
      JSON.stringify(agent),
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.SUCCESS_MESSAGES.LOGIN,
      data: {
        id: user.id,
        email: user.email,
        access_token: access_token,
        refresh_token: refresh_token,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Register feature
  async register(
    createUserDto: RegisterDto,
    req: Request,
  ): Promise<RegisterResponseType> {
    const { email, password, ...items } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.ALREADY_EXISTS,
      );
    }

    const hashRounds = this.config.get('HASH_SALT_ROUNDS');
    const hashedPassword = await bcrypt.hash(password, Number(hashRounds));

    const user = await this.prisma.user.create({
      data: {
        ...items,
        email,
        password: hashedPassword,
        role: UserRole.User,
      },
    });

    // Extract device info and IP address from the request
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const agent = useragent.parse(userAgent);

    const deviceInfo = {
      browser: agent.family,
      os: agent.os.family,
      device: agent.device.family,
    };

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(
      user.id,
      email,
      user?.role,
    );

    await this.saveRefreshToken(
      user?.id,
      refresh_token,
      JSON.stringify(deviceInfo),
      ipAddress,
      JSON.stringify(agent),
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.SUCCESS_MESSAGES.REGISTER,
      data: {
        id: user.id,
        email: user.email,
        access_token: access_token,
        refresh_token: refresh_token,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
