import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPictureFieldToProducts1603399514472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'picture',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'picture');
  }
}
