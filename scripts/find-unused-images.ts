import fs from 'fs';
import path from 'path';

// Директорії для пошуку
const imageDirs = [
    path.join(process.cwd(), 'src/assets/images'),
    path.join(process.cwd(), 'public/assets/images')
];
const srcDir = path.join(process.cwd(), 'src');

// Функція для пошуку всіх файлів з кодом (ts, tsx, css)
async function getCodeFiles(dir: string): Promise<string[]> {
    let results: string[] = [];
    const items = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            results = results.concat(await getCodeFiles(fullPath));
        } else if (item.isFile() && /\.(ts|tsx|css)$/i.test(item.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

// Функція для отримання всіх зображень
async function getImageFiles(dir: string): Promise<string[]> {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;

    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            results = results.concat(await getImageFiles(fullPath));
        } else if (item.isFile() && /\.(png|jpe?g|webp|svg)$/i.test(item.name)) {
            results.push(fullPath);
        }
    }
    return results;
}

async function findUnusedImages() {
    console.log('Починаю аналіз використання файлів...');

    // 1. Отримуємо всі зображення
    let allImages: string[] = [];
    for (const dir of imageDirs) {
        allImages = allImages.concat(await getImageFiles(dir));
    }

    // 2. Зчитуємо вміст всіх файлів з кодом
    console.log('Читаю вихідний код...');
    const codeFiles = await getCodeFiles(srcDir);
    const codeContents: string[] = [];
    for (const file of codeFiles) {
        codeContents.push(await fs.promises.readFile(file, 'utf-8'));
    }

    // 3. Перевіряємо кожне зображення
    const unusedImages: string[] = [];
    let foundOriginalsThatHaveWebP = 0;

    console.log('Шукаю невикористані файли...\n');

    for (const imagePath of allImages) {
        const fileName = path.basename(imagePath);
        const ext = path.extname(imagePath).toLowerCase();

        // Перевіряємо чи зустрічається ім'я файлу хоч десь у коді
        let isUsed = false;
        for (const content of codeContents) {
            if (content.includes(fileName)) {
                isUsed = true;
                break;
            }
        }

        if (!isUsed) {
            // Якщо це png/jpg, перевіримо чи не використовується замість нього WebP версія
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const webpName = fileName.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                const isWebpUsed = codeContents.some(content => content.includes(webpName));

                if (isWebpUsed) {
                    foundOriginalsThatHaveWebP++;
                    continue; // Ми пропустимо їх з масиву unused, бо це просто залишки від конвертації
                }
            }

            unusedImages.push(imagePath);
        }
    }

    // 4. Вивід результатів
    console.log('🛑 АНАЛІЗ ЗАВЕРШЕНО 🛑\n');
    console.log(`- Всього знайдено картинок: ${allImages.length}`);
    console.log(`- Оригіналів (png/jpg), які були замінені на webp: ${foundOriginalsThatHaveWebP}`);

    if (unusedImages.length > 0) {
        console.log(`\n❌ Знайдено файлів, які ніде не згадуються у коді (${unusedImages.length}):`);
        unusedImages.forEach(img => {
            // Показуємо відносний шлях для зручності читання
            const relativePath = path.relative(process.cwd(), img);
            console.log(`  - ${relativePath}`);
        });
    } else {
        console.log('\n✅ Всі зображення використовуються у проєкті!');
    }
}

findUnusedImages().catch(console.error);
