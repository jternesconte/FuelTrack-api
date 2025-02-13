import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1739357076118 implements MigrationInterface {
    name = 'Default1739357076118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "plate"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "plate" character varying(7) NOT NULL DEFAULT '1234567'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "plate"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "plate" numeric(7,0) DEFAULT '1234567'`);
    }

}
