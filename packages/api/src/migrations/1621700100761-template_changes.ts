import {MigrationInterface, QueryRunner} from "typeorm";

export class templateChanges1621700100761 implements MigrationInterface {
    name = 'templateChanges1621700100761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_templates" ("id" varchar PRIMARY KEY NOT NULL, "markup" text NOT NULL, "title" text NOT NULL, "style" text, "data" text DEFAULT ('{}'), "meta" text DEFAULT ('{}'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_7193babbf16087eb6107606dfe3" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_templates"("id", "markup", "title", "style", "data", "meta", "createdAt", "updatedAt", "userId") SELECT "id", "markup", "title", "style", "data", "meta", "createdAt", "updatedAt", "userId" FROM "templates"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`ALTER TABLE "temporary_templates" RENAME TO "templates"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" RENAME TO "temporary_templates"`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" varchar PRIMARY KEY NOT NULL, "markup" text NOT NULL, "title" text NOT NULL, "style" text, "data" text, "meta" text DEFAULT ('{}'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_7193babbf16087eb6107606dfe3" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "templates"("id", "markup", "title", "style", "data", "meta", "createdAt", "updatedAt", "userId") SELECT "id", "markup", "title", "style", "data", "meta", "createdAt", "updatedAt", "userId" FROM "temporary_templates"`);
        await queryRunner.query(`DROP TABLE "temporary_templates"`);
    }

}
