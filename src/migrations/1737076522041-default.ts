import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737076522041 implements MigrationInterface {
    name = 'Default1737076522041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "fuel_capacity" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD "remaining_fuel" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fuel" ADD "average_last_route" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fuel" DROP COLUMN "average_last_route"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "remaining_fuel"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "fuel_capacity"`);
    }

}
