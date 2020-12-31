// contenedor de dependencias
import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './services/repositories/imp/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMySQLRepository } from './services/repositories/imp/mysql/movement.repository';
import { BalanceMysqlRepository } from './services/repositories/imp/mysql/balance.repository';
import { MovementService } from './services/movement.service';

export default (app: express.Application): void => {
    
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    
    container.register({
        // repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMysqlRepository).scoped(),

        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });
    
    app.use(scopePerRequest(container));
};
