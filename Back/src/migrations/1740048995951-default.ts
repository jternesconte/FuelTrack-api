import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740048995951 implements MigrationInterface {
    name = 'Default1740048995951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "oil" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "fl_changed_filters" character(1) NOT NULL DEFAULT 'N', "car_id" integer NOT NULL, CONSTRAINT "PK_7687c431233413581eb1c765504" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ipva" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "oil_type" character varying(100) NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "car_id" integer NOT NULL, CONSTRAINT "PK_6f829d73812c370770c946f4145" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "oil" ADD CONSTRAINT "FK_91dc36b4417b0623951d14fdfda" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ipva" ADD CONSTRAINT "FK_2ef28816eac38fa32a9f29fcd9f" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ipva" DROP CONSTRAINT "FK_2ef28816eac38fa32a9f29fcd9f"`);
        await queryRunner.query(`ALTER TABLE "oil" DROP CONSTRAINT "FK_91dc36b4417b0623951d14fdfda"`);
        await queryRunner.query(`DROP TABLE "ipva"`);
        await queryRunner.query(`DROP TABLE "oil"`);
    }

}
