import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737629624347 implements MigrationInterface {
    name = 'Default1737629624347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_c8d34198d86de9e96aae03b8990" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_c8d34198d86de9e96aae03b8990"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "user_id"`);
    }

}
