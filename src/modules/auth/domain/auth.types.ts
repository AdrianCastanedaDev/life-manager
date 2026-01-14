export interface JwtPayload {
    sub: string;
    email: string;
    iat?: number;
    exp?: number;
}

export interface TokenResponse {
    accessToken: string;
    expiresIn: number;
}
