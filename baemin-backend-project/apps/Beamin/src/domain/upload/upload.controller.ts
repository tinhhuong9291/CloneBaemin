import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import { extname } from 'path';
import sizeOf from 'image-size';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { UserRole } from '../../utils/constants/enums';
import { Roles } from '../../core/decorators/roles.decorator';
import {
  badRequestResponse,
  internalServerErrorResponse,
  unauthorizedResponse,
  uploadImageResponse,
} from '../../swagger/swagger.util';
import { MESSAGES } from '../../utils/constants/message';
import moment from 'moment';
import * as path from 'path';
@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiBearerAuth('authorization')
  @Post('image')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
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
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image upload',
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
  @ApiResponse(uploadImageResponse(MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_IMAGE))
  @ApiResponse(
    badRequestResponse(
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FILE.INVALID,
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FILE.INVALID_EXTENSION,
    ),
  )
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(internalServerErrorResponse())
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const dimensions = sizeOf(file.buffer);
    const { width, height } = dimensions;
    if (width > 1024 || height > 1024) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FILE.INVALID_SIZE,
      );
    }
    const imageUrl = await this.uploadService.uploadImage(file);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_IMAGE,
      data: {
        url: imageUrl,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @Post('multiple-images')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const validExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (!validExtensions.includes(fileExt)) {
          return cb(
            new BadRequestException(
              `Invalid file type. Only ${validExtensions.join(
                ', ',
              )} are allowed.`,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Multiple image upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Images uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'Images uploaded successfully' },
        data: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
          ],
        },
        dateTime: { type: 'string', example: '2023-10-25T12:30:45.000' },
      },
    },
  })
  async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const urls = await this.uploadService.uploadImages(files);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_IMAGE,
      data: urls,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
