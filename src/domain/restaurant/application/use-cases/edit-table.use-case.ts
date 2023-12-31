import { Injectable } from '@nestjs/common';
import { TablesRepository } from '../repositories/table.repository';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { EditTableRequestDto } from '@infra/http/dtos/edit-table.request.dto';
import { randomUUID } from 'crypto';

export class EditTableuseCaseRequest extends EditTableRequestDto {}

@Injectable()
export class EditTableUseCase {
  constructor(private readonly tableRepository: TablesRepository) {}

  async execute({
    id,
    activeToken,
    tableNum,
    seatNum,
  }: EditTableuseCaseRequest): Promise<void> {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new ResourceNotFoundError();

    table.activeToken = activeToken ?? randomUUID();
    table.tableNum = tableNum;
    table.seatNum = seatNum;

    await this.tableRepository.save(table);
  }
}
