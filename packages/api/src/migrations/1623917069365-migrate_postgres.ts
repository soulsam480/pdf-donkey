import {MigrationInterface, QueryRunner} from "typeorm";

export class migratePostgres1623917069365 implements MigrationInterface {
    name = 'migratePostgres1623917069365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_active" boolean, "ga_id" text, "api_key" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_f8aeaa08b86f984a574b177bde5" UNIQUE ("ga_id"), CONSTRAINT "UQ_16bfa631de67a4fafe7ce3f2fed" UNIQUE ("api_key"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "markup" text NOT NULL, "title" text NOT NULL, "style" text, "data" jsonb DEFAULT '{}', "meta" jsonb DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_7193babbf16087eb6107606dfe3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_7193babbf16087eb6107606dfe3"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
