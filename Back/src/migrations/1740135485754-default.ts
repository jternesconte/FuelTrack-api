import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740135485754 implements MigrationInterface {
    name = 'Default1740135485754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ipva" ADD "car_km" numeric(12,1) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ipva" DROP COLUMN "car_km"`);
    }

}
