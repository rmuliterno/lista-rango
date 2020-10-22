import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRestaurants1603325644092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurants',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'regularHoursStart',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'regularHoursEnd',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'specialHoursStart',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'specialHoursEnd',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('restaurants');
  }
}
