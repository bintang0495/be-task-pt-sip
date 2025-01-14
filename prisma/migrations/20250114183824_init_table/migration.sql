-- CreateTable
CREATE TABLE "poli" (
    "id" SERIAL NOT NULL,
    "resource_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "reference_organization" TEXT NOT NULL,
    "physical_type" JSONB NOT NULL,

    CONSTRAINT "poli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identifiers" (
    "id" SERIAL NOT NULL,
    "system" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "poli_id" INTEGER NOT NULL,

    CONSTRAINT "identifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telecoms" (
    "id" SERIAL NOT NULL,
    "system" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "use" TEXT NOT NULL,
    "poli_id" INTEGER NOT NULL,

    CONSTRAINT "telecoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perawat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "poli_id" INTEGER NOT NULL,

    CONSTRAINT "perawat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_location_poli" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL,
    "response" JSONB NOT NULL,
    "request" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "poli_id" INTEGER NOT NULL,

    CONSTRAINT "log_location_poli_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "identifiers" ADD CONSTRAINT "identifiers_poli_id_fkey" FOREIGN KEY ("poli_id") REFERENCES "poli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telecoms" ADD CONSTRAINT "telecoms_poli_id_fkey" FOREIGN KEY ("poli_id") REFERENCES "poli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perawat" ADD CONSTRAINT "perawat_poli_id_fkey" FOREIGN KEY ("poli_id") REFERENCES "poli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_location_poli" ADD CONSTRAINT "log_location_poli_poli_id_fkey" FOREIGN KEY ("poli_id") REFERENCES "poli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
