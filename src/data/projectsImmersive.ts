// Дані для immersive секції проєктів з фоновими зображеннями
import planM01Img from '../assets/images/plan_m01.jpg';
import planM01Img2 from '../assets/images/plan_m01_2.jpg';

export const PROJECTS_IMMERSIVE = {
    uk: [
        {
            id: 1,
            category: 'Дорожня інфраструктура / Капітальний ремонт',
            title: 'Кільцева розв\'язка (м. Вишневе)',
            description: 'Влаштування транспортної розв\'язки кільцевого типу на перехресті вул. Лесі Українки та вул. Паркова.',
            location: 'м. Вишневе, Київська обл.',
            backgroundImage: '/assets/images/visneve-ring.png'
        },
        {
            id: 2,
            category: 'Міський благоустрій',
            title: 'Тротуари та паркування (м. Вишневе)',
            description: 'Капітальний ремонт тротуару по вул. Київська з влаштуванням заїзних кишень для громадського транспорту та автостоянок.',
            location: 'м. Вишневе, Київська обл.',
            backgroundImage: '/assets/images/visneve-walk.png'
        },
        {
            id: 9,
            category: 'Енергетична інфраструктура',
            title: 'Реконструкція електропостачання',
            description: 'Реконструкція системи електропостачання котельні з влаштуванням точки підключення когенераційної установки в м. Ватутіне.',
            location: 'м. Ватутіне, Черкаська обл.',
            backgroundImage: '/assets/images/vatutine-electro-new.jpeg'
        },
        {
            id: 3,
            category: 'Організація дорожнього руху (ОДР)',
            title: 'Схема ОДР громади (м. Біла Церква)',
            description: 'Комплексна розробка та погодження схеми організації дорожнього руху на території міської територіальної громади.',
            location: 'м. Біла Церква, Київська обл.',
            backgroundImage: '/assets/images/bila.jpeg'
        },
        {
            id: 4,
            category: 'Примикання до траси',
            title: 'Під\'їзні шляхи до М-01',
            description: 'Влаштування під\'їзних шляхів та примикання до автомобільної дороги державного значення М-01 (Київ – Чернігів).',
            location: 'Київська область (траса М-01)',
            backgroundImage: planM01Img,
            gallery: [planM01Img, planM01Img2]
        },
        {
            id: 5,
            category: 'Комерційна інфраструктура / АЗС',
            title: 'Реконструкція АЗС у селі Кам\'янка',
            description: 'Розробка організації дорожнього руху в рамках реконструкції автозаправної станції.',
            location: 'с. Кам\'янка, Хмельницька обл.',
            backgroundImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 6,
            category: 'Організація дорожнього руху (ОДР)',
            title: 'Схема руху центру міста (м. Сквира)',
            description: 'Розроблення схеми організації дорожнього руху для вулиць і провулків центральної частини міста.',
            location: 'м. Сквира, Київська обл.',
            backgroundImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop'
        },
        {
            id: 7,
            category: 'Мостові споруди',
            title: 'Міст через р. Гнилоп\'ять',
            description: 'Капітальний ремонт мосту та підходів до нього по вул. Ринковій.',
            location: 'м. Бердичів, Житомирська обл.',
            backgroundImage: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 8,
            category: 'Інженерні мережі / Теплопостачання',
            title: 'Капітальний ремонт системи опалення (БМК-500)',
            description: 'Влаштування блочно-модульної котельні типу БМК-500 в Юрківській гімназії. Забезпечено енергоефективне опалення навчального закладу.',
            location: 'с. Юрківка, Черкаська обл.',
            backgroundImage: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 10,
            category: 'Капітальний ремонт будівель',
            title: 'Ремонт покрівлі (Київський коледж)',
            description: 'Капітальний ремонт покрівлі в учбово-виробничих майстернях Київського професійного коледжу залізничного транспорту.',
            location: 'м. Київ (вул. Архітектора Кобелєва)',
            backgroundImage: 'https://images.unsplash.com/photo-1629813134638-72122b513361?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 11,
            category: 'Консалтинг / Укриття',
            title: 'Консультаційні послуги (Укриття ЗДО)',
            description: 'Послуги Інженера-консультанта на об\'єктах капітального ремонту найпростіших укриттів у закладах дошкільної освіти (ЗДО №24, №41, №32).',
            location: 'м. Київ, Голосіївський район',
            backgroundImage: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=2000&auto=format&fit=crop'
        },
        {
            id: 12,
            category: 'Технічний нагляд',
            title: 'Технічний нагляд за дорогами',
            description: 'Технічний нагляд за будівництвом та ремонтом доріг у м. Обухів, Українка, Ржищів, Ватутіне та селах регіонів.',
            location: 'Київська та Черкаська області',
            backgroundImage: '/assets/images/naglad.jpeg'
        },
        {
            id: 13,
            category: 'Цивільний захист',
            title: 'Капітальний ремонт укриття (ЗДО №305)',
            description: 'Технічний нагляд за капітальним ремонтом захисної споруди цивільного захисту в закладі дошкільної освіти №305.',
            location: 'м. Київ (вул. Ліснича)',
            backgroundImage: 'https://images.unsplash.com/photo-1517088927909-5a109a976a47?q=80&w=2070&auto=format&fit=crop'
        },
    ],
    en: [
        {
            id: 1,
            category: 'Road Infrastructure / Major Repair',
            title: 'Roundabout (Vyshneve)',
            description: 'Construction of a circular-type traffic interchange at the intersection of Lesia Ukrainka St. and Parkova St.',
            location: 'Vyshneve, Kyiv region',
            backgroundImage: '/assets/images/visneve-ring.png'
        },
        {
            id: 2,
            category: 'Urban Improvement',
            title: 'Sidewalks and Parking (Vyshneve)',
            description: 'Major repair of the sidewalk on Kyivska St. with the construction of bus bays and parking lots.',
            location: 'Vyshneve, Kyiv region',
            backgroundImage: '/assets/images/visneve-walk.png'
        },
        {
            id: 9,
            category: 'Energy Infrastructure',
            title: 'Power Supply Reconstruction',
            description: 'Reconstruction of the boiler house power supply system with the installation of a cogeneration unit connection point.',
            location: 'Vatutine, Cherkasy region',
            backgroundImage: '/assets/images/vatutine-electro-new.jpeg'
        },
        {
            id: 3,
            category: 'Traffic Organization',
            title: 'Community Traffic Scheme (Bila Tserkva)',
            description: 'Comprehensive development and approval of a traffic organization scheme for the urban territorial community.',
            location: 'Bila Tserkva, Kyiv region',
            backgroundImage: '/assets/images/bila.jpeg'
        },
        {
            id: 4,
            category: 'Highway Access',
            title: 'Access Roads to M-01',
            description: 'Construction of access roads and junction to the M-01 state highway (Kyiv – Chernihiv).',
            location: 'Kyiv region (M-01 highway)',
            backgroundImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
        },
        {
            id: 5,
            category: 'Commercial Infrastructure / Gas Station',
            title: 'Gas Station Reconstruction (Kamianka)',
            description: 'Development of traffic organization as part of gas station reconstruction.',
            location: 'Kamianka, Khmelnytskyi region',
            backgroundImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 6,
            category: 'Traffic Organization',
            title: 'City Center Traffic Scheme (Skvyra)',
            description: 'Development of a traffic organization scheme for streets and alleys in the central part of the city.',
            location: 'Skvyra, Kyiv region',
            backgroundImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop'
        },
        {
            id: 7,
            category: 'Bridge Structures',
            title: 'Bridge over Hnylopiat River',
            description: 'Major repair of the bridge and approaches to it on Rynkova St.',
            location: 'Berdychiv, Zhytomyr region',
            backgroundImage: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 8,
            category: 'Engineering Networks / Heating',
            title: 'Heating System Overhaul (BMK-500)',
            description: 'Installation of a block-modular boiler house type BMK-500 in Yurkivka Gymnasium. Provided energy-efficient heating for the educational institution.',
            location: 'Yurkivka, Cherkasy region',
            backgroundImage: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2070&auto=format&fit=crop'
        },

        {
            id: 10,
            category: 'Building Renovation / Roofing',
            title: 'Roof Repair (Kyiv College)',
            description: 'Major roof repair in the training workshops of the Kyiv Professional College of Railway Transport.',
            location: 'Kyiv (Kobelev St.)',
            backgroundImage: 'https://images.unsplash.com/photo-1629813134638-72122b513361?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 11,
            category: 'Consulting / Shelters',
            title: 'Consulting Services (Shelters)',
            description: 'Consulting Engineer services at major repair sites of simple shelters in preschool education institutions (Kindergartens No. 24, 41, 32).',
            location: 'Kyiv, Holosiivskyi district',
            backgroundImage: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=2000&auto=format&fit=crop'
        },
        {
            id: 12,
            category: 'Technical Supervision',
            title: 'Road Construction Supervision',
            description: 'Technical supervision of road construction and repair in Obukhiv, Ukrainka, Rzhyshchiv, Vatutine and regional villages.',
            location: 'Kyiv and Cherkasy regions',
            backgroundImage: '/assets/images/naglad.jpeg'
        },
        {
            id: 13,
            category: 'Civil Protection',
            title: 'Shelter Renovation (Kindergarten No. 305)',
            description: 'Technical supervision of the major repair of a civil protection structure in Preschool Education Institution No. 305.',
            location: 'Kyiv (Lisnycha St.)',
            backgroundImage: 'https://images.unsplash.com/photo-1517088927909-5a109a976a47?q=80&w=2070&auto=format&fit=crop'
        }
    ]
};
