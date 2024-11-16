import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { Request } from 'express';
import {
  badRequestResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
  uploadImageResponse,
} from '../../swagger/swagger.util';
import { MESSAGES } from '../../utils/constants/message';
import moment from 'moment';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('authorization')
  @Post('upload-avatar')
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const validExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];
        const fileExt = extname(file.originalname).toLowerCase();
        if (!validExtensions.includes(fileExt)) {
          return callback(
            new BadRequestException(
              `Invalid file type. Only ${validExtensions.join(
                ', ',
              )} are allowed.`,
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Upload an avatar image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar image upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse(
    uploadImageResponse(MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_AVATAR),
  )
  @ApiResponse(
    badRequestResponse(
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FILE.INVALID,
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FILE.INVALID_EXTENSION,
    ),
  )
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(internalServerErrorResponse())
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const userId = req.user.id;
    const avatarUrl = await this.userService.uploadAvatar(file, userId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_AVATAR,
      data: {
        url: avatarUrl,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
