export const COMPANY_INFO = {
    name: 'ТОВ "ВІА ПРО"',
    shortName: 'VIA PRO',
    director: 'Камінський Максим Миколайович',
    founded: 2021, // 05.02.2021
    address: '02094, м. Київ, вул. Гната Хоткевича, буд. 12, офіс 177',
    phone: '+380 63 453 59 83',
    email: '44085020@ukr.net',
    edrpou: '44085020',
    stats: {
        years: 5,
        projects: 80, // Оновлено до 80 + за запитом користувача
        growth: '30%', // Year over year
    },
    services: {
        uk: [
            {
                id: 'design',
                title: 'Комплексне проєктування',
                intro: 'Розробка проєктів доріг, інфраструктури, будівель та інженерних мереж будь-якої складності.',
                details: [
                    'Дороги: Вулиці, мости, кільцеві розв\'язки, велодоріжки та тротуари.',
                    'Організація руху: Розробка та погодження комплексних схем ОДР для населених пунктів та об\'єктів сервісу.',
                    'Будівлі: Проєктування споруд, укриттів, покрівель та прибудинкових територій.',
                    'Мережі: Котельні, когенераційні установки, системи опалення, вентиляції та водопостачання.'
                ]
            },
            {
                id: 'supervision',
                title: 'Технічний та Авторський нагляд',
                intro: 'Супровід будівництва та контроль відповідності робіт проєктним рішенням.',
                details: [
                    'Нагляд за будівництвом та поточним ремонтом доріг, вулиць та покриттів.',
                    'Авторський нагляд за зведенням будівель і споруд.',
                    'Гарантуємо дотримання технологій та відповідність затвердженій документації.'
                ]
            },
            {
                id: 'consulting',
                title: 'Послуги Інженера-консультанта',
                intro: 'Експертний супровід, отримання техумов та розрахунок вартості будівництва.',
                details: [
                    'Розробка та аналіз передпроєктних рішень.',
                    'Отримання технічних умов та погодження проєктів у відповідних інстанціях.',
                    'Розрахунок конструкцій дорожнього одягу.',
                    'Складання детальних кошторисів витрат на будівництво.'
                ]
            },
        ],
        en: [
            {
                id: 'design',
                title: 'Comprehensive Design',
                intro: 'Development of road, infrastructure, building and engineering network projects of any complexity.',
                details: [
                    'Roads: Streets, bridges, roundabouts, bike paths and sidewalks.',
                    'Traffic organization: Development and approval of comprehensive traffic organization schemes for settlements and service facilities.',
                    'Buildings: Design of structures, shelters, roofs and adjacent territories.',
                    'Networks: Boiler rooms, cogeneration plants, heating, ventilation and water supply systems.'
                ]
            },
            {
                id: 'supervision',
                title: 'Technical and Author\'s Supervision',
                intro: 'Construction support and control of work compliance with design solutions.',
                details: [
                    'Supervision of construction and current repair of roads, streets and pavements.',
                    'Author\'s supervision of building and structure construction.',
                    'We guarantee compliance with technologies and approved documentation.'
                ]
            },
            {
                id: 'consulting',
                title: 'Consultant Engineer Services',
                intro: 'Expert support, obtaining technical conditions and calculating construction costs.',
                details: [
                    'Development and analysis of pre-project solutions.',
                    'Obtaining technical conditions and project approvals from relevant authorities.',
                    'Calculation of road pavement structures.',
                    'Preparation of detailed construction cost estimates.'
                ]
            },
        ]
    }
};

