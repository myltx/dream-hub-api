/*
 Navicat Premium Data Transfer

 Source Server         : dream-hub
 Source Server Type    : PostgreSQL
 Source Server Version : 150008 (150008)
 Source Host           : db.xcwhdikndfrizmrtxyiy.supabase.co:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150008 (150008)
 File Encoding         : 65001

 Date: 08/02/2025 10:30:23
*/

-- ----------------------------
-- Sequences
-- ----------------------------

-- Sequence for categories
CREATE SEQUENCE "public"."categories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."categories_id_seq"', 30, true);

ALTER SEQUENCE "public"."categories_id_seq" OWNER TO "postgres";

-- Sequence for files
CREATE SEQUENCE "public"."files_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."files_id_seq"', 26, true);

ALTER SEQUENCE "public"."files_id_seq" OWNER TO "postgres";

-- Sequence for tags
CREATE SEQUENCE "public"."tags_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tags_id_seq"', 12, true);

ALTER SEQUENCE "public"."tags_id_seq" OWNER TO "postgres";

-- Sequence for users
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."users_id_seq"', 26, true);

ALTER SEQUENCE "public"."users_id_seq" OWNER TO "postgres";

-- Sequence for website_access_logs
CREATE SEQUENCE "public"."website_access_logs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."website_access_logs_id_seq"', 48, true);

ALTER SEQUENCE "public"."website_access_logs_id_seq" OWNER TO "postgres";

-- Sequence for websites
CREATE SEQUENCE "public"."websites_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."websites_id_seq"', 90, true);

ALTER SEQUENCE "public"."websites_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" int4 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "user_id" varchar COLLATE "pg_catalog"."default",
  "sort_order" int4 DEFAULT 0
)
;
ALTER TABLE "public"."categories" OWNER TO "postgres";
ALTER SEQUENCE "public"."categories_id_seq"
OWNED BY "public"."categories"."id";
-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS "public"."files";
CREATE TABLE "public"."files" (
  "id" int4 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
  "user_id" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "bucket" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "path" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "public_url" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now(),
  "file_name" text COLLATE "pg_catalog"."default",
  "file_type" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."files" OWNER TO "postgres";
ALTER SEQUENCE "public"."files_id_seq"
OWNED BY "public"."files"."id";
-- ----------------------------
-- Table structure for site_access_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."site_access_logs";
CREATE TABLE "public"."site_access_logs" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "access_time" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "ip_address" varchar(45) COLLATE "pg_catalog"."default",
  "user_agent" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "platform" text COLLATE "pg_catalog"."default",
  "geolocation" text COLLATE "pg_catalog"."default",
  "browser_name" text COLLATE "pg_catalog"."default",
  "device_type" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."site_access_logs" OWNER TO "postgres";

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS "public"."tags";
CREATE TABLE "public"."tags" (
  "id" int4 NOT NULL DEFAULT nextval('tags_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" varchar COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now()
)
;
ALTER TABLE "public"."tags" OWNER TO "postgres";
ALTER SEQUENCE "public"."tags_id_seq"
OWNED BY "public"."tags"."id";
-- ----------------------------
-- Table structure for user_favorites
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_favorites";
CREATE TABLE "public"."user_favorites" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz(6) DEFAULT CURRENT_TIMESTAMP,
  "content_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'website'::character varying,
  "content_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."user_favorites" OWNER TO "postgres";

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL UNIQUE,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "nike_name" varchar COLLATE "pg_catalog"."default",
  "avatar" varchar COLLATE "pg_catalog"."default",
  "roles" text[] COLLATE "pg_catalog"."default" DEFAULT '{}'::text[]
)
;
ALTER TABLE "public"."users" OWNER TO "postgres";
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
-- ----------------------------
-- Table structure for website_access_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."website_access_logs";
CREATE TABLE "public"."website_access_logs" (
  "id" int4 NOT NULL DEFAULT nextval('website_access_logs_id_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "website_id" int4,
  "access_time" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now()
)
;
ALTER TABLE "public"."website_access_logs" OWNER TO "postgres";


-- ----------------------------
-- Table structure for website_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."website_categories";
CREATE TABLE "public"."website_categories" (
  "website_id" int4 NOT NULL,
  "category_id" int4 NOT NULL,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now()
)
;
ALTER TABLE "public"."website_categories" OWNER TO "postgres";

-- ----------------------------
-- Table structure for website_tags
-- ----------------------------
DROP TABLE IF EXISTS "public"."website_tags";
CREATE TABLE "public"."website_tags" (
  "website_id" int4 NOT NULL,
  "tag_id" int4 NOT NULL,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6) DEFAULT now()
)
;
ALTER TABLE "public"."website_tags" OWNER TO "postgres";

-- ----------------------------
-- Table structure for websites
-- ----------------------------
DROP TABLE IF EXISTS "public"."websites";
CREATE TABLE "public"."websites" (
  "id" int4 NOT NULL DEFAULT nextval('websites_id_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "url" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "detailed_description" text COLLATE "pg_catalog"."default",
  "usage_scenario" text COLLATE "pg_catalog"."default",
  "rating" int4,
  "review" text COLLATE "pg_catalog"."default",
  "is_public" bool DEFAULT false,
  "is_recommended" bool DEFAULT false,
  "sort_order" int4 DEFAULT 0,
  "visit_count" int4 DEFAULT 0,
  "logo" varchar(255) COLLATE "pg_catalog"."default",
  "image" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "category_id" int4,
  "status" bool DEFAULT true,
  "is_top" bool DEFAULT false
)
;
ALTER TABLE "public"."websites" OWNER TO "postgres";
ALTER SEQUENCE "public"."websites_id_seq"
OWNED BY "public"."websites"."id";
-- ----------------------------
-- Uniques structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_name_key" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE FUNCTION public.update_updated_at_column() 
RETURNS trigger AS
$$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------
-- Triggers structure for table files
-- ----------------------------
CREATE TRIGGER "set_updated_at_on_files" BEFORE UPDATE ON "public"."files"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Primary Key structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table site_access_logs
-- ----------------------------
CREATE TRIGGER "update_site_access_logs_updated_at" BEFORE UPDATE ON "public"."site_access_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Primary Key structure for table site_access_logs
-- ----------------------------
ALTER TABLE "public"."site_access_logs" ADD CONSTRAINT "site_access_logs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table tags
-- ----------------------------
ALTER TABLE "public"."tags" ADD CONSTRAINT "tags_name_key" UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table tags
-- ----------------------------
ALTER TABLE "public"."tags" ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table user_favorites
-- ----------------------------
CREATE TRIGGER "update_user_favorites_updated_at" BEFORE UPDATE ON "public"."user_favorites"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_updated_at_column"();

-- ----------------------------
-- Uniques structure for table user_favorites
-- ----------------------------
ALTER TABLE "public"."user_favorites" ADD CONSTRAINT "user_favorites_unique" UNIQUE ("user_id", "content_type", "content_id");

-- ----------------------------
-- Primary Key structure for table user_favorites
-- ----------------------------
ALTER TABLE "public"."user_favorites" ADD CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
-- ALTER TABLE "public"."users" ADD CONSTRAINT "users_user_id_key" UNIQUE ("user_id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table website_access_logs
-- ----------------------------
ALTER TABLE "public"."website_access_logs" ADD CONSTRAINT "website_access_logs_user_id_website_id_access_time_key" UNIQUE ("user_id", "website_id", "access_time");

-- ----------------------------
-- Primary Key structure for table website_access_logs
-- ----------------------------
ALTER TABLE "public"."website_access_logs" ADD CONSTRAINT "website_access_logs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table website_categories
-- ----------------------------
ALTER TABLE "public"."website_categories" ADD CONSTRAINT "website_categories_pkey" PRIMARY KEY ("website_id", "category_id");

-- ----------------------------
-- Primary Key structure for table website_tags
-- ----------------------------
ALTER TABLE "public"."website_tags" ADD CONSTRAINT "website_tags_pkey" PRIMARY KEY ("website_id", "tag_id");

-- ----------------------------
-- Primary Key structure for table websites
-- ----------------------------
ALTER TABLE "public"."websites" ADD CONSTRAINT "websites_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table site_access_logs
-- ----------------------------
ALTER TABLE "public"."site_access_logs" ADD CONSTRAINT "site_access_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tags
-- ----------------------------
ALTER TABLE "public"."tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_favorites
-- ----------------------------
ALTER TABLE "public"."user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table website_access_logs
-- ----------------------------
ALTER TABLE "public"."website_access_logs" ADD CONSTRAINT "website_access_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table website_categories
-- ----------------------------
ALTER TABLE "public"."website_categories" ADD CONSTRAINT "website_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."website_categories" ADD CONSTRAINT "website_categories_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "public"."websites" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table website_tags
-- ----------------------------
ALTER TABLE "public"."website_tags" ADD CONSTRAINT "fk_website_tags_tag_id" FOREIGN KEY ("tag_id") REFERENCES "public"."tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."website_tags" ADD CONSTRAINT "fk_website_tags_website_id" FOREIGN KEY ("website_id") REFERENCES "public"."websites" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."website_tags" ADD CONSTRAINT "website_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table websites
-- ----------------------------
ALTER TABLE "public"."websites" ADD CONSTRAINT "fk_category_id" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."websites" ADD CONSTRAINT "websites_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."websites" ADD CONSTRAINT "websites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;