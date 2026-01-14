import { Module } from '@nestjs/common';
import { MinioStorageService } from './minio.storage';
import { STORAGE_SERVICE } from './storage.interface';

@Module({
    providers: [
        {
            provide: STORAGE_SERVICE,
            useClass: MinioStorageService,
        },
    ],
    exports: [STORAGE_SERVICE],
})
export class StorageModule { }
