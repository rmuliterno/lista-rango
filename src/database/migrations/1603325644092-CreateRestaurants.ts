import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRestaurants1603325644092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'restaurants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
          },
          {
            name: 'regularHoursStart',
            type: 'timestamp with time zone',
          },
          {
            name: 'regularHoursEnd',
            type: 'timestamp with time zone',
          },
          {
            name: 'specialHoursStart',
            type: 'timestamp with time zone',
          },
          {
            name: 'specialHoursEnd',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('restaurants');
  }
}
