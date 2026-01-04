import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

/**
 * Auth Guard for Auth0 JWT validation
 * Validates JWT tokens from Auth0 for all protected GraphQL operations
 */
@Injectable()
export class AuthGuard implements CanActivate {
    private client: jwksClient.JwksClient;

    constructor() {
        // Initialize JWKS client to fetch Auth0 public keys
        this.client = jwksClient({
            jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            cache: true,
            rateLimit: true,
        });
    }

    /**
     * Validate the request has a valid Auth0 JWT token
     * @param context - Execution context
     * @returns True if authenticated, throws UnauthorizedException otherwise
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('No authorization header found');
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            // Verify the token
            await this.verifyToken(token);
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    /**
     * Verify JWT token using Auth0 public key
     * @param token - JWT token to verify
     */
    private async verifyToken(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Decode token to get the key ID
            const decoded = jwt.decode(token, { complete: true });
            if (!decoded || typeof decoded === 'string') {
                return reject(new Error('Invalid token'));
            }

            const kid = decoded.header.kid;
            if (!kid) {
                return reject(new Error('No kid in token header'));
            }

            // Get the signing key from Auth0
            this.client.getSigningKey(kid, (err, key) => {
                if (err || !key) {
                    return reject(err || new Error('No signing key found'));
                }

                const signingKey = key.getPublicKey();

                // Verify the token with the public key
                jwt.verify(
                    token,
                    signingKey,
                    {
                        audience: process.env.AUTH0_AUDIENCE,
                        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                        algorithms: ['RS256'],
                    },
                    (verifyErr) => {
                        if (verifyErr) {
                            return reject(verifyErr);
                        }
                        resolve();
                    },
                );
            });
        });
    }
}
