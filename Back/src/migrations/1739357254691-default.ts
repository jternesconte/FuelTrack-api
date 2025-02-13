import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1739357254691 implements MigrationInterface {
    name = 'Default1739357254691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "plate" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "plate" SET DEFAULT '1234567'`);
    }

}
