import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737321850658 implements MigrationInterface {
    name = 'Default1737321850658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "remaining_fuel"`);
        await queryRunner.query(`ALTER TABLE "fuel" ALTER COLUMN "date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fuel" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "car" ADD "remaining_fuel" character varying(100) NOT NULL`);
    }

}
