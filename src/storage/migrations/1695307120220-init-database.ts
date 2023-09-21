import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1695307120220 implements MigrationInterface {
    name = 'InitDatabase1695307120220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`question_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_c3d19a89541e4f0813f2fe09194\` FOREIGN KEY (\`question_id\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_c3d19a89541e4f0813f2fe09194\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP TABLE \`question\``);
    }

}
