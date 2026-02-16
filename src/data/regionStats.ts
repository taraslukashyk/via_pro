// Статистика реалізованих об'єктів по областях України
export interface RegionStats {
  name: string;
  id: number; // відповідає region.id з mapPaths.ts
  technicalSupervision: number; // Технагляд (та інші нагляди)
  design: number; // Проєктування
  repair: number; // Ремонт / Інші послуги
  other: number; // Інше
  total: number; // Всього
}

// Дані з таблиці користувача
export const REGION_STATISTICS: RegionStats[] = [
  {
    name: 'Київська',
    id: 3146, // Київська область
    technicalSupervision: 90,
    design: 28,
    repair: 0,
    other: 0,
    total: 118,
  },
  {
    name: 'Черкаська',
    id: 3136, // Черкаська область
    technicalSupervision: 45,
    design: 8,
    repair: 1,
    other: 0,
    total: 54,
  },
  {
    name: 'Київ',
    id: 3147, // Київ (місто)
    technicalSupervision: 6,
    design: 4,
    repair: 7,
    other: 1,
    total: 18,
  },
  {
    name: 'Миколаївська',
    id: 3151, // Миколаївська область
    technicalSupervision: 1,
    design: 3,
    repair: 0,
    other: 0,
    total: 4,
  },
  {
    name: 'Житомирська',
    id: 3162, // Житомирська область
    technicalSupervision: 0,
    design: 3,
    repair: 0,
    other: 0,
    total: 3,
  },
  {
    name: 'Волинська',
    id: 3160, // Волинська область
    technicalSupervision: 0,
    design: 1,
    repair: 0,
    other: 0,
    total: 1,
  },
  {
    name: 'Харківська',
    id: 3143, // Харківська область
    technicalSupervision: 0,
    design: 1,
    repair: 0,
    other: 0,
    total: 1,
  },
  {
    name: 'Хмельницька',
    id: 3145, // Хмельницька область
    technicalSupervision: 0,
    design: 1,
    repair: 0,
    other: 0,
    total: 1,
  },
];

// Утилітарна функція для отримання статистики по ID області
export const getRegionStats = (regionId: number): RegionStats | undefined => {
  return REGION_STATISTICS.find(stat => stat.id === regionId);
};

// Отримання мінімального та максимального значення для градієнту
export const getStatsRange = () => {
  const totals = REGION_STATISTICS.map(stat => stat.total);
  return {
    min: Math.min(...totals),
    max: Math.max(...totals),
  };
};
