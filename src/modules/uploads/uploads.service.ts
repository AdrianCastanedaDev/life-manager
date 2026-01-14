import { Injectable, Inject } from '@nestjs/common';
import { IStorageService, STORAGE_SERVICE, UploadResult } from '../../infrastructure/storage/storage.interface';
import { FILE_UPLOAD } from '../../common/constants';
import { BusinessException } from '../../common/exceptions';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UploadsService {
    constructor(
        @Inject(STORAGE_SERVICE)
        private readonly storageService: IStorageService,
    ) { }

    async uploadFile(
        file: Express.Multer.File,
    ): Promise<UploadResult> {
        // Validate file size
        if (file.size > FILE_UPLOAD.MAX_SIZE) {
            throw new BusinessException(
                `File size exceeds ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB limit`,
                'FILE_TOO_LARGE',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Validate mime type
        if (!FILE_UPLOAD.ALLOWED_MIME_TYPES.includes(file.mimetype as any)) {
            throw new BusinessException(
                'File type not allowed',
                'INVALID_FILE_TYPE',
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.storageService.upload(
            file.buffer,
            file.originalname,
            file.mimetype,
        );
    }

    async deleteFile(fileKey: string): Promise<void> {
        return this.storageService.delete(fileKey);
    }

    async getSignedUrl(fileKey: string): Promise<string> {
        return this.storageService.getSignedUrl(fileKey);
    }
}
