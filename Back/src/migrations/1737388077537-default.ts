import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737388077537 implements MigrationInterface {
    name = 'Default1737388077537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "image" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "image"`);
    }

}
