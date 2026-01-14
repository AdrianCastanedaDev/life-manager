/**
 * Storage interface (Port)
 * Adapters implement this interface to provide S3-compatible storage
 */
export interface IStorageService {
    upload(
        file: Buffer,
        filename: string,
        mimetype: string,
    ): Promise<UploadResult>;

    delete(fileKey: string): Promise<void>;

    getSignedUrl(fileKey: string, expiresIn?: number): Promise<string>;
}

export interface UploadResult {
    key: string;
    url: string;
    size: number;
}

export const STORAGE_SERVICE = 'STORAGE_SERVICE';
