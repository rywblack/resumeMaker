-- Run this in the Neon SQL editor to set up the database
-- NextAuth tables (required by @auth/pg-adapter)

CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name          TEXT,
  email         TEXT UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image         TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId"            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                TEXT NOT NULL,
  provider            TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          INTEGER,
  token_type          TEXT,
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId"       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires        TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT NOT NULL,
  token      TEXT NOT NULL UNIQUE,
  expires    TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Resume storage

CREATE TABLE IF NOT EXISTS resumes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
  form_data  JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
