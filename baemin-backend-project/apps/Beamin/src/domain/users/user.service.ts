import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: DatabaseService,
    @Inject('Cloudinary') private readonly cloudinary,
  ) {}
  async uploadAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new BadRequestException('Invalid file data'));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          const avatarUrl = result.secure_url;
          await this.prisma.user.update({
            where: { id: userId },
            data: { avatar: avatarUrl },
          });

          resolve(avatarUrl);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
