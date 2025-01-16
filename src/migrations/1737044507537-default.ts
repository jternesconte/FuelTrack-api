import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737044507537 implements MigrationInterface {
    name = 'Default1737044507537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "model" character varying(100) NOT NULL, "engine" character varying(100) NOT NULL, "year" character varying(100) NOT NULL, "category" character varying(100) NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
