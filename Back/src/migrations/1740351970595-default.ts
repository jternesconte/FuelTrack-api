import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740351970595 implements MigrationInterface {
    name = 'Default1740351970595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ipva" DROP COLUMN "oil_type"`);
        await queryRunner.query(`ALTER TABLE "ipva" DROP COLUMN "car_km"`);
        await queryRunner.query(`ALTER TABLE "oil" ADD "car_km" numeric(12,1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "oil" ADD "oil_type" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oil" DROP COLUMN "oil_type"`);
        await queryRunner.query(`ALTER TABLE "oil" DROP COLUMN "car_km"`);
        await queryRunner.query(`ALTER TABLE "ipva" ADD "car_km" numeric(12,1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ipva" ADD "oil_type" character varying(100) NOT NULL`);
    }

}
