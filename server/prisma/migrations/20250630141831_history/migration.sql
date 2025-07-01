-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_black_id_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_white_id_fkey";

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "isBotGame" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "white_id" DROP NOT NULL,
ALTER COLUMN "black_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "moves" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "player_id" TEXT,
    "move" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_white_id_fkey" FOREIGN KEY ("white_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_black_id_fkey" FOREIGN KEY ("black_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moves" ADD CONSTRAINT "moves_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moves" ADD CONSTRAINT "moves_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
