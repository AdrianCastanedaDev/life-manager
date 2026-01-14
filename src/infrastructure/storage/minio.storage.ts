import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IStorageService, UploadResult } from './storage.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MinioStorageService implements IStorageService {
    private readonly client: S3Client;
    private readonly bucket: string;
    private readonly endpoint: string;

    constructor(private configService: ConfigService) {
        const endpoint = this.configService.get<string>('storage.endpoint');
        const port = this.configService.get<number>('storage.port');
        const useSSL = this.configService.get<boolean>('storage.useSSL');

        const protocol = useSSL ? 'https' : 'http';
        this.endpoint = `${protocol}://${endpoint}:${port}`;
        this.bucket = this.configService.get<string>('storage.bucket');

        this.client = new S3Client({
            endpoint: this.endpoint,
            region: 'us-east-1', // Required but not used by MinIO
            credentials: {
                accessKeyId: this.configService.get<string>('storage.accessKey'),
                secretAccessKey: this.configService.get<string>('storage.secretKey'),
            },
            forcePathStyle: true, // Required for MinIO
        });
    }

    async upload(
        file: Buffer,
        filename: string,
        mimetype: string,
    ): Promise<UploadResult> {
        const key = `${uuidv4()}-${filename}`;

        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: mimetype,
            }),
        );

        return {
            key,
            url: `${this.endpoint}/${this.bucket}/${key}`,
            size: file.length,
        };
    }

    async delete(fileKey: string): Promise<void> {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: fileKey,
            }),
        );
    }

    async getSignedUrl(fileKey: string, expiresIn = 3600): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: fileKey,
        });

        return getSignedUrl(this.client, command, { expiresIn });
    }
}
