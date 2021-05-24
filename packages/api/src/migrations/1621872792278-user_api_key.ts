import {MigrationInterface, QueryRunner} from "typeorm";

export class userApiKey1621872792278 implements MigrationInterface {
    name = 'userApiKey1621872792278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_active" boolean, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "ga_id" text, "api_key" text, CONSTRAINT "UQ_f8aeaa08b86f984a574b177bde5" UNIQUE ("ga_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_5eca8d5cef84b0af85b7b83fd7f" UNIQUE ("api_key"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "username", "password", "is_active", "createdAt", "ga_id") SELECT "id", "name", "email", "username", "password", "is_active", "createdAt", "ga_id" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_active" boolean, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "ga_id" text, CONSTRAINT "UQ_f8aeaa08b86f984a574b177bde5" UNIQUE ("ga_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "username", "password", "is_active", "createdAt", "ga_id") SELECT "id", "name", "email", "username", "password", "is_active", "createdAt", "ga_id" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
