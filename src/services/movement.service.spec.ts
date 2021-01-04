import assert from 'assert';
import { MovementCreateDTO } from '../dtos/movement.dto';
import { MovementService } from './movement.service';
import { BalanceMockRepository } from './repositories/imp/mock/balance.repository';
import { MovementMockRepository } from './repositories/imp/mock/movement.repository';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository(),
);

describe('Movement.Service', () => {
    describe('Store', () => {
        it('tries to register an income movement', async () => {
            await movementService.store({
                user_id: 1,
                type: 0,
                amount: 200
            } as MovementCreateDTO)
        });

        it('tries to register an outcome movement', async () => {
            await movementService.store({
                user_id: 2,
                type: 1,
                amount: 100
            } as MovementCreateDTO)
        });

        it('tries to register an outcome movement with insufficient balance', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 200
                } as MovementCreateDTO)
            } catch (error) {
                assert.strictEqual(error.message, 'User does not have enough balance.')
            }
        });

        it('tries to register an unexpected movement', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 9999,
                    amount: 200
                } as MovementCreateDTO)
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid movement type supplied.')
            }
        });

    }); 
});