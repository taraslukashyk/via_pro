export const PROJECTS = [
    {
        id: 1,
        title: 'Кільцева розв\'язка (м. Вишневе)',
        location: 'м. Вишневе, Київська обл.',
        year: '2024',
        budget: 'Реалізовано',
        category: 'Дорожня інфраструктура',
        description: 'Влаштування транспортної розв\'язки кільцевого типу на перехресті вул. Лесі Українки та вул. Паркова. Проєкт забезпечив підвищення безпеки руху та пропускної здатності перехрестя.',
        image: '/via_pro/assets/images/visneve-ring.png',
        // Geographic coordinates (lat/lng)
        lat: 50.3865,
        lng: 30.3600
    },
    {
        id: 2,
        title: 'Схема ОДР громади (м. Біла Церква)',
        location: 'м. Біла Церква, Київська обл.',
        year: '2024',
        budget: 'Реалізовано',
        category: 'Організація дорожнього руху',
        description: 'Комплексна розробка та погодження схеми організації дорожнього руху на території міської територіальної громади. Впроваджено сучасні рішення для оптимізації транспортних і пішохідних потоків.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop',
        lat: 49.7969,
        lng: 30.1144
    },
    {
        id: 3,
        title: 'Під\'їзні шляхи до М-01',
        location: 'Київська область (траса М-01)',
        year: '2025',
        budget: 'В роботі',
        category: 'Примикання до траси',
        description: 'Влаштування під\'їзних шляхів та примикання до автомобільної дороги державного значення М-01 (Київ – Чернігів). Забезпечено відповідність найвищим стандартам безпеки на швидкісній магістралі.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        lat: 50.5630,
        lng: 30.8320
    },
    {
        id: 4,
        title: 'Реконструкція АЗС (с. Кам\'янка)',
        location: 'с. Кам\'янка, Хмельницька обл.',
        year: '2025',
        budget: 'В роботі',
        category: 'Комерційна інфраструктура',
        description: 'Розробка організації дорожнього руху в рамках реконструкції автозаправної станції. Створено зручні схеми заїзду та виїзду, паркомісця та пішохідні зони.',
        image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop',
        lat: 48.6875,
        lng: 26.6110
    },
    {
        id: 5,
        title: 'Тротуари та паркування (м. Вишневе)',
        location: 'м. Вишневе, Київська обл.',
        year: '2025',
        budget: 'В роботі',
        category: 'Міський благоустрій',
        description: 'Капітальний ремонт тротуару по вул. Київська з влаштуванням заїзних кишень для громадського транспорту та автостоянок. Створено інклюзивний та комфортний простір для пішоходів.',
        image: '/via_pro/assets/images/visneve-walk.png',
        // Slightly offset from project 1 to avoid overlap on the map
        lat: 50.3920,
        lng: 30.3750
    },
    {
        id: 6,
        title: 'Схема руху центру міста (м. Сквира)',
        location: 'м. Сквира, Київська обл.',
        year: '2025',
        budget: 'В роботі',
        category: 'Організація дорожнього руху',
        description: 'Розроблення схеми організації дорожнього руху для вулиць і провулків центральної частини міста. Впорядковано паркування та рух транспорту в історичному центрі.',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop',
        lat: 49.7335,
        lng: 29.6496
    },
    {
        id: 7,
        title: 'Міст через р. Гнилоп\'ять',
        location: 'м. Бердичів, Житомирська обл.',
        year: '2025',
        budget: 'В роботі',
        category: 'Мостові споруди',
        description: 'Капітальний ремонт мосту та підходів до нього по вул. Ринковій. Передбачено посилення конструкцій, оновлення дорожнього покриття та встановлення сучасного бар\'єрного огородження.',
        image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?q=80&w=2070&auto=format&fit=crop',
        lat: 49.8919,
        lng: 28.5866
    }
];

// Type definition for project
export interface Project {
    id: number;
    title: string;
    location: string;
    year: string;
    budget: string;
    category: string;
    description: string;
    image: string;
    lat: number;
    lng: number;
}

// Helper function to convert lat/lng to SVG coordinates
// Ukraine approximate bounding box: lat 44.3-52.4, lng 22.1-40.2
export function latLngToSvgCoords(lat: number, lng: number): { x: number; y: number } {
    const minLat = 44.3;
    const maxLat = 52.4;
    const minLng = 22.1;
    const maxLng = 40.2;

    // Calculate percentage position within Ukraine's bounds
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100; // Inverted because SVG Y grows downward

    return { x, y };
}
