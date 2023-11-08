import { InMemoryServicesRepository } from '@test/repositories/in-memory-services.repository';
import { OrderUseCase } from './order.use-case';
import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders.repository';
import { makeService } from '@test/factories/make-service';
import { makeOrder } from '@test/factories/make-order';

describe('Make Order', () => {
  let inMemoryServicesRepository: InMemoryServicesRepository;
  let inMemoryOrdersRepository: InMemoryOrdersRepository;
  let sut: OrderUseCase;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();

    sut = new OrderUseCase(
      inMemoryServicesRepository,
      inMemoryOrdersRepository,
    );
  });

  it('should be able to make an order from an ongoin service', async () => {
    const service = makeService();
    await inMemoryServicesRepository.create(service);

    const client = service.clients[0];

    const order = makeOrder({
      clientToken: client.clientToken,
      serviceId: service.id,
    });

    await sut.execute({
      products: order.products,
      clientToken: order.clientToken.toString(),
      serviceId: order.serviceId.toString(),
    });

    expect(inMemoryOrdersRepository.items).toHaveLength(1);
  });
});