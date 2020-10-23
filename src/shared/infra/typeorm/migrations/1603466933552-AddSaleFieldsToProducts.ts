import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSaleFieldsToProducts1603466933552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'sale',
      type: 'boolean',
      isNullable: true,
    }));
    await queryRunner.addColumn('products', new TableColumn({
      name: 'saleDescription',
      type: 'varchar',
      isNullable: true,
    }));
    await queryRunner.addColumn('products', new TableColumn({
      name: 'salePrice',
      type: 'numeric',
      isNullable: true,
    }));
    await queryRunner.addColumn('products', new TableColumn({
      name: 'saleDays',
      type: 'varchar',
      isArray: true,
      default: 'array[]::varchar[]',
      isNullable: true,
    }));
    await queryRunner.addColumn('products', new TableColumn({
      name: 'saleStart',
      type: 'varchar',
      isNullable: true,
    }));
    await queryRunner.addColumn('products', new TableColumn({
      name: 'saleEnd',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'saleEnd');
    await queryRunner.dropColumn('products', 'saleStart');
    await queryRunner.dropColumn('products', 'saleDays');
    await queryRunner.dropColumn('products', 'salePrice');
    await queryRunner.dropColumn('products', 'saleDescription');
    await queryRunner.dropColumn('products', 'sale');
  }
}
