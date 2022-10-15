import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1639465267396 implements MigrationInterface {
  name = 'InitialSchema1639465267396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "links" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "created_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer NOT NULL, CONSTRAINT "PK_ecf17f4a741d3c5ba0b4c5ab4b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "link_tag" ("link_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_9e5b41623cb68d943c94ee22e75" PRIMARY KEY ("link_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c179d6372176272e3a30242fc9" ON "link_tag" ("link_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0adfbb91cc77ca4a93ea48a08" ON "link_tag" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "links" ADD CONSTRAINT "FK_e724faa84ab930b3ec8d8da0685" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_tag" ADD CONSTRAINT "FK_c179d6372176272e3a30242fc9f" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_tag" ADD CONSTRAINT "FK_a0adfbb91cc77ca4a93ea48a086" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "link_tag" DROP CONSTRAINT "FK_a0adfbb91cc77ca4a93ea48a086"`,
    );
    await queryRunner.query(
      `ALTER TABLE "link_tag" DROP CONSTRAINT "FK_c179d6372176272e3a30242fc9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "links" DROP CONSTRAINT "FK_e724faa84ab930b3ec8d8da0685"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0adfbb91cc77ca4a93ea48a08"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c179d6372176272e3a30242fc9"`,
    );
    await queryRunner.query(`DROP TABLE "link_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32a6fc2fcb019d8e3a8ace0f55"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0e5815877f7395a198a4cb0a4"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "links"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
