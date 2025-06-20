import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';


@Module({
    imports: [ConfigModule],
    providers: [{provide: APP_GUARD, useClass: ApiKeyGuard}], // app guard makes it to be applied globally
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
    }
}
