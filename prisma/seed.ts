import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DeviceTypeSeed = {
  codigo: string;
  descripcion: string;
  caracteristicas?: string | null;
  marcaModelo?: string | null;
  esTraslado?: boolean;
  imageFile?: string;
};

type OfficeSeed = {
  nombre: string;
  piso: number;
};

type DeviceSeed = {
  inventoryCode: string;
  typeId: string;
  destinationOffice: string;
  originOffice?: string;
};

const deviceTypes: DeviceTypeSeed[] = [
  {
    codigo: 'E1',
    descripcion: 'COMPUTADORA - 1A',
    caracteristicas: `- Computadora Core I7/RYZEN 7, 16GB RAM, 1TB SSD, 4GB VIDEO
- Licencia de Antivirus
- Monitor LED de 32" HDMI`,
  },
  {
    codigo: "E1'",
    descripcion: 'COMPUTADORA - 1A/INCL.PROGRAMAS',
    caracteristicas: `- Computadora Core I7/RYZEN 7, 16GB RAM, 1TB SSD, 4GB VIDEO
- Licencia de AUTOCAD BÁSICO V.2024
- Licencia de Antivirus
- Licencia de POWERCOST
- Monitor LED de 32" HDMI`,
  },
  {
    codigo: 'E2',
    descripcion: 'COMPUTADORA 1',
    caracteristicas: `- Computadora Core I7/RYZEN 7, 16GB RAM, 1TB SSD, 4GB VIDEO
- Licencia de Antivirus
- Monitor LED de 23.5" HDMI`,
  },
  {
    codigo: 'E3',
    descripcion: 'COMPUTADORA 2',
    caracteristicas: `- Computadora Core I7/RYZEN 7, 16GB RAM, 1TB SSD, INCL. ACCES
- Licencia de Antivirus
- Monitor LED de 23.5" HDMI`,
  },
  {
    codigo: 'E4',
    descripcion: 'COMPUTADORA 3',
    caracteristicas: `- Computadora Core I7/RYZEN 7, 16GB RAM, 1TB SSD, INCL. ACCES
- Licencia de Antivirus
- Monitor LED de 21.5" HDMI`,
  },
  {
    codigo: 'E5',
    descripcion: 'IMPRESORA MULTIFUNCIONAL TIPO A',
    caracteristicas: `- Impresora Multifuncional Laser A4 Monocromático/Color
- KYOCERA ECOSYS MA 4500x`,
    marcaModelo: `- KYOCERA ECOSYS MA 4500x
- Consumible: TK3402`,
    imageFile: 'KYOCERA-MA5500IFX.png',
  },
  {
    codigo: 'E6',
    descripcion: 'IMPRESORA MULTIFUNCIONAL TIPO B',
    caracteristicas: `- Impresora Multifuncional Tamaño A4 a Color C/Sistema Co
- BROTHER MFC-T9300W`,
    marcaModelo: 'BROTHER MFC-T9300W',
    imageFile: 'brother-mfc-t930dw.jpg',
  },
  {
    codigo: 'E7',
    descripcion: 'PLOTTER A0',
    caracteristicas: `- Plotter para Formatos A0 c/Inyección de Tinta 2400x1200 PPP
- PLOTTER CANON TM-350`,
    marcaModelo: 'PLOTTER CANON TM-350',
    imageFile: 'Canon-TM-350.jpg',
  },
  {
    codigo: 'E8',
    descripcion: 'PLOTTER SISTEMA COPIADO',
    caracteristicas: '- Plotter Tinta c/Sistema de Copiado IMP.2400x1200 PPP, B/N Y',
  },
  {
    codigo: 'E9',
    descripcion: 'FOTOCOPIADORA MULTIFUNCIONAL',
    caracteristicas: `- Fotocopiadora Multifuncional Toner, Disco 250 GB, Memor
- KONICA MINOLTA BIZHUB C 458`,
    marcaModelo: 'KONICA MINOLTA BIZHUB C 458',
    imageFile: 'Konica-minolta-bizhub-c459.jpg',
  },
  {
    codigo: 'E10',
    descripcion: 'PROYECTOR MULTIMEDIA INCL/PANTALLA ECRAN',
    caracteristicas: `- Pantalla ECRAN retractil 2.00X1.50m
- Proyector Multimedia de 3000 Lumes, 1024.768 XGA, USB, HDMI`,
  },
  {
    codigo: 'E11',
    descripcion: 'TELEVISOR DE 40" SMART TV',
    caracteristicas: '- TV LED SMART TV de 40". HDMI, USB, WiFi, INCL.CONTROL',
  },
  {
    codigo: 'E12',
    descripcion: 'LAPTOP CORE I7',
    caracteristicas: '- Computadora Portatil Laptop CORE I7 2,1 GHZ, 16GB RAM, 1TB',
  },
  {
    codigo: 'E13',
    descripcion: 'TELEFONO IP',
  },
  {
    codigo: 'E14',
    descripcion: 'MONITOR DE 55" 4K PROFESIONAL',
    caracteristicas: '- Monitor LED 55" 4K Profesional, HDMI, VGA, USB, 1080P',
  },
  {
    codigo: 'E15',
    descripcion: 'IMPRESORA LÁSER MONOCROMÁTICA',
    caracteristicas: `- Impresora Laser Monocromatico USB 2.0, Pantalla LCD 2 LI
- HP LASERJET`,
    marcaModelo: `HP LASERJET
- Consumible: TN-514`,
  },
  {
    codigo: 'E16',
    descripcion: 'PROYECTOR MULTIMEDIA INCL/PANTALLA ECRAN EN AUDITORIO',
    caracteristicas: `- Pantalla ECRAN retractil 2.00X1.50m
- Proyector Multimedia de 3000 Lumes, 1024.768 XGA, USB, HDMI`,
  },
  {
    codigo: 'Ex1',
    descripcion: 'COMPUTADORA',
    caracteristicas: 'TRASLADO',
    esTraslado: true,
  },
  {
    codigo: 'Ex2',
    descripcion: 'IMPRESORA MULTIFUNCIONAL TIPO A',
    caracteristicas: 'TRASLADO',
    esTraslado: true,
  },
  {
    codigo: 'Ex3',
    descripcion: 'IMPRESORA MULTIFUNCIONAL TIPO B',
    caracteristicas: 'TRASLADO',
    esTraslado: true,
  },
  {
    codigo: 'Ex4',
    descripcion: 'FOTOCOPIADORA MULTIFUNCIONAL',
    caracteristicas: 'TRASLADO',
    esTraslado: true,
  },
];

const fiscalizacionAreaName = 'Fiscalización';

const fiscalizacionOffices: OfficeSeed[] = [
  { nombre: 'Subgerencia de Fiscalización', piso: 2 },
  { nombre: 'Área de Fiscalización Administrativa', piso: 2 },
  { nombre: 'Área de Fiscalización Tributaria', piso: 2 },
];

const fiscalizacionDevices: DeviceSeed[] = [
  { inventoryCode: 'FIS-DEV-001', typeId: 'E6', destinationOffice: 'Subgerencia de Fiscalización' },
  { inventoryCode: 'FIS-DEV-002', typeId: 'E5', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-003', typeId: 'E6', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-004', typeId: 'E9', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-005', typeId: 'E6', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-006', typeId: 'E5', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-007', typeId: 'E3', destinationOffice: 'Subgerencia de Fiscalización' },
  { inventoryCode: 'FIS-DEV-008', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-009', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-010', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-011', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-012', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-013', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-014', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-015', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-016', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-017', typeId: 'E3', destinationOffice: 'Área de Fiscalización Administrativa' },
  { inventoryCode: 'FIS-DEV-018', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-019', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-020', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-021', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-022', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-023', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-024', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-025', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-026', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
  { inventoryCode: 'FIS-DEV-027', typeId: 'E3', destinationOffice: 'Área de Fiscalización Tributaria' },
];

function resolveImageUrl(deviceType: DeviceTypeSeed) {
  if (!deviceType.imageFile) return null;
  return `http://localhost:3000/uploads/${deviceType.imageFile}`;
}

async function main() {
  for (const deviceType of deviceTypes) {
    await prisma.tipoDispositivo.upsert({
      where: { codigo: deviceType.codigo },
      update: {
        descripcion: deviceType.descripcion,
        caracteristicas: deviceType.caracteristicas ?? null,
        marcaModelo: deviceType.marcaModelo ?? null,
        esTraslado: deviceType.esTraslado ?? deviceType.codigo.startsWith('Ex'),
        imagenUrl: resolveImageUrl(deviceType),
      },
      create: {
        codigo: deviceType.codigo,
        descripcion: deviceType.descripcion,
        caracteristicas: deviceType.caracteristicas ?? null,
        marcaModelo: deviceType.marcaModelo ?? null,
        esTraslado: deviceType.esTraslado ?? deviceType.codigo.startsWith('Ex'),
        imagenUrl: resolveImageUrl(deviceType),
      },
    });
  }

  const area = await prisma.area.upsert({
    where: { nombre: fiscalizacionAreaName },
    update: {},
    create: { nombre: fiscalizacionAreaName },
  });

  const existingOffices = await prisma.oficina.findMany({
    where: {
      areaId: area.id,
      nombre: { in: fiscalizacionOffices.map((office) => office.nombre) },
    },
    select: { id: true },
  });

  const existingOfficeIds = existingOffices.map((office) => office.id);

  if (existingOfficeIds.length > 0) {
    await prisma.dispositivo.deleteMany({
      where: {
        OR: [{ destinoId: { in: existingOfficeIds } }, { origenId: { in: existingOfficeIds } }],
      },
    });

    await prisma.oficina.deleteMany({
      where: { id: { in: existingOfficeIds } },
    });
  }

  const createdOffices = await Promise.all(
    fiscalizacionOffices.map((office) =>
      prisma.oficina.create({
        data: {
          nombre: office.nombre,
          piso: office.piso,
          areaId: area.id,
        },
      }),
    ),
  );

  const officeIdByName = new Map(createdOffices.map((office) => [office.nombre, office.id]));

  for (const device of fiscalizacionDevices) {
    const destinationOfficeId = officeIdByName.get(device.destinationOffice);
    const originOfficeId = device.originOffice ? officeIdByName.get(device.originOffice) : undefined;

    if (!destinationOfficeId) {
      throw new Error(`No se encontró la oficina destino: ${device.destinationOffice}`);
    }

    await prisma.dispositivo.upsert({
      where: { codigoInventario: device.inventoryCode },
      update: {
        tipoCodigo: device.typeId,
        estado: device.typeId.startsWith('Ex') ? 'traslado' : 'nuevo',
        destinoId: destinationOfficeId,
        origenId: originOfficeId ?? null,
      },
      create: {
        codigoInventario: device.inventoryCode,
        tipoCodigo: device.typeId,
        estado: device.typeId.startsWith('Ex') ? 'traslado' : 'nuevo',
        destinoId: destinationOfficeId,
        origenId: originOfficeId ?? null,
      },
    });
  }

  console.log(`Seed completado: ${deviceTypes.length} tipos, ${createdOffices.length} oficinas y ${fiscalizacionDevices.length} dispositivos`);
}

main()
  .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });