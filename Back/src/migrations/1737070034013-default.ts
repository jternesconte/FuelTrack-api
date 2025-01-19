import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737070034013 implements MigrationInterface {
    name = 'Default1737070034013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fuel" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "liters" numeric(10,2) NOT NULL, "distance_traveled" numeric(10,1), "date" TIMESTAMP NOT NULL, "car_id" integer NOT NULL, CONSTRAINT "PK_0979c62883aa0364e3152b6d36a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car" ADD "km" numeric(12,1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "fuel" ADD CONSTRAINT "FK_1f1f200255314bba7a1946ae1b1" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fuel" DROP CONSTRAINT "FK_1f1f200255314bba7a1946ae1b1"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "km"`);
        await queryRunner.query(`DROP TABLE "fuel"`);
    }

}
