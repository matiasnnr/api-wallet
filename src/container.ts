// contenedor de dependencias

import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.service';
import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';
import { SubscriptionMySQLRepository } from './services/repositories/imp/mysql/subscription.repository';
import { MovementMySQLRepository } from './services/repositories/imp/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/imp/mysql/balance.repository';
// import { SubscriptionMSSQLRepository } from './services/repositories/imp/mssql/subscription.repository';
// import { MovementMSSQLRepository } from './services/repositories/imp/mssql/movement.repository';
// import { BalanceMSSQLRepository } from './services/repositories/imp/mssql/balance.repository';
// import { SubscriptionMockRepository } from './services/repositories/imp/mock/subscription.repository';

export default (app: express.Application): void => {
    
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    
    // aquí dentro de asClass() se hace la inyección de dependencias, lo que lo hace escalable a largo plazo, ya que solo se debe cambiar en este lugar
    // la conexión a la db mediante el repositorio que corresponda.
    container.register({
        // repositories
        //subscriptionRepository: asClass(SubscriptionMockRepository).scoped(),
        // subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        // movementRepository: asClass(MovementMSSQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });
    
    app.use(scopePerRequest(container));
};
