# 🚀 Deployment

Руководство по развертыванию Claude Code Academy

## 🌐 Production Deployment (Vercel)

### Автоматический деплой
Проект настроен на автоматический деплой при push в `main` ветку:

```bash
# Деплой в production
git push origin main
# Vercel автоматически развернет изменения
```

### Ручной деплой через Vercel CLI

```bash
# 1. Установить Vercel CLI
npm i -g vercel

# 2. Войти в аккаунт
vercel login

# 3. Деплой
vercel --prod
```

### Конфигурация Vercel

Файл `vercel.json`:
```json
{
  "version": 2,
  "public": true,
  "cleanUrls": true
}
```

## 🔧 Локальная разработка

### Простой способ
```bash
# Открыть файл напрямую в браузере
open index.html
```

### С локальным сервером
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve
npx live-server

# PHP
php -S localhost:8000
```

## 📊 Мониторинг

### Vercel Analytics
- Автоматически включена для production
- Отслеживает Core Web Vitals
- Доступна в Vercel Dashboard

### Performance метрики
Целевые показатели:
- **LCP**: < 1.0s
- **FID**: < 50ms  
- **CLS**: 0.00
- **TTFB**: < 200ms

## 🔄 CI/CD Pipeline

### GitHub Actions (автоматически)
```yaml
# .github/workflows/deploy.yml (создается Vercel)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
```

### Процесс деплоя
1. **Push в main** → GitHub webhook
2. **Vercel Build** → статическая сборка
3. **Deploy to CDN** → глобальное распространение
4. **Cache Invalidation** → обновление кеша

## 🌍 CDN и кеширование

### Vercel Edge Network
- 150+ edge locations по всему миру
- Автоматическое HTTP/2 и Brotli сжатие
- Smart caching с автоматической инвалидацией

### Cache Headers
```
# Статические ресурсы
Cache-Control: public, max-age=31536000, immutable

# HTML файлы  
Cache-Control: public, max-age=0, must-revalidate
```

## 🔒 Security

### HTTPS
- Принудительное перенаправление на HTTPS
- Автоматические SSL сертификаты
- HSTS headers

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 💾 Backup Strategy

### Git как основной backup
```bash
# Создание bundle backup
git bundle create backup-$(date +%Y%m%d).bundle --all

# Восстановление из bundle
git clone backup-20240920.bundle restored-project
```

### Automated backups
```bash
#!/bin/bash
# backup-system.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"
PROJECT_NAME="claude-code-academy"

# Создать bundle
git bundle create "$BACKUP_DIR/${PROJECT_NAME}_${DATE}.bundle" --all

# Архивировать файлы
tar -czf "$BACKUP_DIR/${PROJECT_NAME}_files_${DATE}.tar.gz" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='backups' \
  .

echo "✅ Backup created: ${DATE}"
```

## 🔄 Rollback Process

### Быстрый rollback через Vercel
1. Зайти в Vercel Dashboard
2. Выбрать предыдущий успешный деплой
3. Нажать "Promote to Production"

### Rollback через Git
```bash
# Откатить к предыдущему коммиту
git revert HEAD

# Или к конкретному коммиту
git revert <commit-hash>

# Push изменения
git push origin main
```

## 🧪 Staging Environment

### Preview deployments
Vercel автоматически создает preview для каждого PR:
- Уникальный URL для каждого PR
- Автоматическое обновление при push в PR
- Возможность тестирования перед merge

### Ручной staging
```bash
# Деплой в staging
vercel

# Получить preview URL
vercel ls
```

## 📈 Scaling

### Текущие лимиты (Vercel Free)
- 100GB bandwidth/месяц
- 1000 serverless function invocations/день
- 100 deployments/день

### При превышении лимитов
1. **Vercel Pro** ($20/месяц) — увеличенные лимиты
2. **Альтернативы**: Netlify, GitHub Pages, Cloudflare Pages

## 🔍 Troubleshooting

### Частые проблемы

**Build fails**
```bash
# Проверить локально
python3 -m http.server 8000
# Если работает локально, проблема в конфигурации Vercel
```

**404 на routes**
```json
// vercel.json - добавить rewrites
{
  "rewrites": [
    { "source": "/lesson-1", "destination": "/lesson-1.html" }
  ]
}
```

**Медленная загрузка**
- Проверить размер файлов
- Оптимизировать изображения
- Минифицировать CSS/JS

### Логи и отладка
```bash
# Vercel logs
vercel logs

# Local debugging
vercel dev
```

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Project Support
- [GitHub Issues](../../issues) — технические проблемы
- [GitHub Discussions](../../discussions) — общие вопросы

---

*Деплой настроен для максимальной простоты и надежности 🚀*
