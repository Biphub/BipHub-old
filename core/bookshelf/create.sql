BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "apps" (
  "id"           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name"         VARCHAR(255),
  "label"        VARCHAR(255),
  "instructions" VARCHAR(255),
  "icon"         VARCHAR(255),
  "description"  VARCHAR(255),
  "auth_type"    VARCHAR(255),
  "active"       BOOLEAN,
  "created_at"   DATETIME,
  "updated_at"   DATETIME
);
CREATE TABLE IF NOT EXISTS "incoming_actions" (
  "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type"        VARCHAR(255),
  "endpoint"    VARCHAR(255),
  "conditions"  undefined,
  "name"        VARCHAR(255),
  "description" VARCHAR(255),
  "created_at"  DATETIME,
  "updated_at"  DATETIME,
  "app_id"      INTEGER,
  FOREIGN KEY ("app_id") REFERENCES "apps" ("id")
);
CREATE TABLE IF NOT EXISTS "bips" (
  "id"                                INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "incoming_action_conditions_values" undefined,
  "incoming_action_options_values"    undefined,
  "outgoing_action_options_values"    undefined,
  "fields_mapping"                    undefined,
  "active"                            BOOLEAN,
  "incoming_action_condition_id"      INTEGER,
  "incoming_actions_id"               INTEGER,
  "outgoing_actions_id"               INTEGER,
  "created_at"                        DATETIME,
  "updated_at"                        DATETIME,
  FOREIGN KEY ("incoming_action_condition_id") REFERENCES "incoming_action_conditions" ("id"),
  FOREIGN KEY ("incoming_actions_id") REFERENCES "incoming_actions" ("id"),
  FOREIGN KEY ("outgoing_actions_id") REFERENCES "outgoing_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "outgoing_action_fields" (
  "id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type"               VARCHAR(255),
  "name"               VARCHAR(255),
  "created_at"         DATETIME,
  "updated_at"         DATETIME,
  "outgoing_action_id" INTEGER,
  FOREIGN KEY ("outgoing_action_id") REFERENCES "ougoing_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "incoming_action_conditions" (
  "id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "active"             BOOLEAN,
  "name"               VARCHAR(255),
  "condition_payload"  undefined,
  "created_at"         DATETIME,
  "updated_at"         DATETIME,
  "incoming_action_id" INTEGER,
  FOREIGN KEY ("incoming_action_id") REFERENCES "incoming_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "incoming_action_options" (
  "id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type"               VARCHAR(255),
  "name"               VARCHAR(255),
  "active"             BOOLEAN,
  "created_at"         DATETIME,
  "updated_at"         DATETIME,
  "incoming_action_id" INTEGER,
  FOREIGN KEY ("incoming_action_id") REFERENCES "incoming_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "outgoing_action_options" (
  "id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type"               VARCHAR(255),
  "name"               VARCHAR(255),
  "active"             BOOLEAN,
  "created_at"         DATETIME,
  "updated_at"         DATETIME,
  "outgoing_action_id" INTEGER,
  FOREIGN KEY ("outgoing_action_id") REFERENCES "ougoing_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "incoming_action_fields" (
  "id"                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type"               VARCHAR(255),
  "name"               VARCHAR(255),
  "created_at"         DATETIME,
  "updated_at"         DATETIME,
  "incoming_action_id" INTEGER,
  FOREIGN KEY ("incoming_action_id") REFERENCES "incoming_actions" ("id")
);
CREATE TABLE IF NOT EXISTS "outgoing_actions" (
  "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "active"      BOOLEAN,
  "type"        VARCHAR(255),
  "name"        VARCHAR(255),
  "description" VARCHAR(255),
  "created_at"  DATETIME,
  "updated_at"  DATETIME,
  "app_id"      INTEGER,
  FOREIGN KEY ("app_id") REFERENCES "apps" ("id")
);
COMMIT;
