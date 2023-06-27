import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStreamerTable1687814949913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS streamer (
                    id UUID NOT NULL PRIMARY KEY,
                    streamer_name TEXT NOT NULL,
                    platform TEXT NOT NULL,
                    description TEXT NOT NULL,
                    upvotes NUMERIC CHECK (upvotes >= 0) NOT NULL,
                    downvotes NUMERIC CHECK (downvotes >= 0) NOT NULL
                );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS streamer;`);
  }
}
