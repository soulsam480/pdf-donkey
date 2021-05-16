import {MigrationInterface, QueryRunner} from "typeorm";

export class userGaid1621136429995 implements MigrationInterface {
    name = 'userGaid1621136429995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_active" boolean, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "ga_id" text, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_3a99a11d31176bb961d16346390" UNIQUE ("ga_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "username", "password", "is_active", "createdAt") SELECT "id", "name", "email", "username", "password", "is_active", "createdAt" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_active" boolean, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "username", "password", "is_active", "createdAt") SELECT "id", "name", "email", "username", "password", "is_active", "createdAt" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
