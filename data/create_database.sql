CREATE TABLE IF NOT EXISTS task (
	"task_id" INTEGER PRIMARY KEY,
	"name" TEXT NOT NULL CHECK(LENGTH("name") <= 150),
	"description" TEXT NULL,
  /* SQLite does not have a true boolean data type, so add a constraint*/
  "done_flag" BOOLEAN NOT NULL CHECK("done_flag" IN (0,1))
);