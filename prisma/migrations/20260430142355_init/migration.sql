-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('nuevo', 'traslado');

-- CreateTable
CREATE TABLE "tipo_dispositivo" (
    "codigo" VARCHAR(10) NOT NULL,
    "descripcion" VARCHAR(200) NOT NULL,
    "caracteristicas" TEXT,
    "marcaModelo" VARCHAR(150),
    "imagenUrl" VARCHAR(500),
    "esTraslado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_dispositivo_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "planoUrl" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oficina" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "piso" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oficina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispositivo" (
    "id" SERIAL NOT NULL,
    "codigoInventario" VARCHAR(100),
    "tipoCodigo" VARCHAR(10) NOT NULL,
    "estado" "Estado" NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "origenId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "area_nombre_key" ON "area"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "dispositivo_codigoInventario_key" ON "dispositivo"("codigoInventario");

-- AddForeignKey
ALTER TABLE "oficina" ADD CONSTRAINT "oficina_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivo" ADD CONSTRAINT "dispositivo_tipoCodigo_fkey" FOREIGN KEY ("tipoCodigo") REFERENCES "tipo_dispositivo"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivo" ADD CONSTRAINT "dispositivo_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "oficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispositivo" ADD CONSTRAINT "dispositivo_origenId_fkey" FOREIGN KEY ("origenId") REFERENCES "oficina"("id") ON DELETE SET NULL ON UPDATE CASCADE;
