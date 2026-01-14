import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
    constructor(
        message: string,
        public readonly code: string,
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super(
            {
                success: false,
                code,
                message,
            },
            statusCode,
        );
    }
}

export class EntityNotFoundException extends BusinessException {
    constructor(entity: string, id: string | number) {
        super(`${entity} with ID ${id} not found`, 'ENTITY_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
}

export class DuplicateEntityException extends BusinessException {
    constructor(entity: string, field: string) {
        super(`${entity} with this ${field} already exists`, 'DUPLICATE_ENTITY', HttpStatus.CONFLICT);
    }
}

export class UnauthorizedException extends BusinessException {
    constructor(message = 'Unauthorized access') {
        super(message, 'UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenException extends BusinessException {
    constructor(message = 'Access forbidden') {
        super(message, 'FORBIDDEN', HttpStatus.FORBIDDEN);
    }
}
