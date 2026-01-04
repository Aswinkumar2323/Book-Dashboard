import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

/**
 * Auth Module
 * Provides Auth0 authentication guard for the application
 */
@Module({
    providers: [AuthGuard],
    exports: [AuthGuard],
})
export class AuthModule { }
