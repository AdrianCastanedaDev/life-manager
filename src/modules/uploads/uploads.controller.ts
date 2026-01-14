import {
    Controller,
    Post,
    Delete,
    Get,
    Param,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
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
    async upload(@UploadedFile() file: Express.Multer.File) {
        return this.uploadsService.uploadFile(file);
    }

    @Delete(':key')
    @ApiOperation({ summary: 'Delete a file' })
    async delete(@Param('key') key: string) {
        await this.uploadsService.deleteFile(key);
        return { success: true };
    }

    @Get(':key/url')
    @ApiOperation({ summary: 'Get signed URL for a file' })
    async getSignedUrl(@Param('key') key: string) {
        const url = await this.uploadsService.getSignedUrl(key);
        return { url };
    }
}
