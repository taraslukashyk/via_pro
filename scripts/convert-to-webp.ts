import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src/assets/images');
const publicDir = path.join(process.cwd(), 'public/assets/images');

async function processDirectory(dir: string) {
    try {
        const items = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dir, item.name);

            if (item.isDirectory()) {
                // Рекурсивно заходимо в підпапки
                await processDirectory(fullPath);
            } else if (item.isFile()) {
                const ext = path.extname(item.name).toLowerCase();

                // Перевіряємо, чи це зображення, яке потрібно конвертувати
                if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                    const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');

                    // Якщо файл .webp ще не існує, створюємо його
                    if (!fs.existsSync(webpPath)) {
                        console.log(`Конвертую: ${fullPath} -> .webp`);
                        try {
                            await sharp(fullPath)
                                .webp({ quality: 80 }) // 80 - гарний баланс якості та розміру
                                .toFile(webpPath);
                            console.log(`✅ Готово: ${webpPath}`);
                        } catch (err) {
                            console.error(`❌ Помилка конвертації ${fullPath}:`, err);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Помилка читання директорії ${dir}:`, err);
    }
}

console.log('Починаємо конвертацію зображень у WebP...');
Promise.all([
    processDirectory(srcDir),
    processDirectory(publicDir)
]).then(() => {
    console.log('Обробка завершена!');
});
