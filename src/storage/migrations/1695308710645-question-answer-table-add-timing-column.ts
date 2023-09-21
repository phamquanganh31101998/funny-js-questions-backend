import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionAnswerTableAddTimingColumn1695308710645 implements MigrationInterface {
    name = 'QuestionAnswerTableAddTimingColumn1695308710645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`created_at\``);
    }

}
