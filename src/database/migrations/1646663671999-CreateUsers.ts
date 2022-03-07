import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1646663671999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
