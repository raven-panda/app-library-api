import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookEntity1741129205434 implements MigrationInterface {
  name = 'AddBookEntity1741129205434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book\` (\`id\` varchar(36) NOT NULL, \`isbn\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`coverFileId\` varchar(64) NULL, \`editor\` varchar(255) NOT NULL, \`genre\` enum ('NOVEL', 'SHORT_STORY', 'POESY', 'DRAMA', 'ESSAY', 'BIOGRAPHY', 'AUTOBIOGRAPHY', 'TALE', 'COMIC', 'MANGA', 'TRAVEL_STORY', 'CHILDREN', 'OTHER') NOT NULL, \`theme\` enum ('LOVE_AND_PASSION', 'FRIENDSHIP_AND_HUMAN_RELATION', 'QUEST_FOR_IDENTITY', 'GOOD_AND_EVIL', 'LIBERTY_AND_OPPRESSION', 'TRAVEL_EXPLORATION', 'WAR_CONSEQUENCES', 'JUSTICE_INJUSTICE', 'FANTASY_AND_SUPERNATURAL', 'SCIENCE_PROGRESS_AND_EXCESSES', 'DREAM_IMAGINARY', 'TIME_MEMORY', 'LONELINESS_ISOLATION', 'FAMILLY_HERITAGE', 'DESTINY_FREEWILL', 'OTHER') NOT NULL, \`otherTheme\` varchar(64) NULL, \`format\` enum ('PAPERBACK', 'POCKET', 'EPUB', 'PDF', 'AUDIO', 'DAISY') NOT NULL, \`isPhysicalFormat\` tinyint NOT NULL, \`languageCode\` varchar(4) NOT NULL, \`targetAudience\` enum ('ACADEMIC', 'ENTERTAINMENT', 'PERSONAL_DEVELOPMENT', 'COMMITTED_AND_SOCIAL', 'FOREIGN_CULTURE', 'VISUALLY_IMPAIRED', 'PEOPLE_WITH_READING_DIFFICULTIES', 'OTHER') NOT NULL, \`reviews\` bigint NOT NULL DEFAULT '0', \`averageRate\` int NOT NULL DEFAULT '0', \`isForRent\` tinyint NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`book\``);
  }
}
