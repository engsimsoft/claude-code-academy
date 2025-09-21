#!/bin/bash

# =============================================================================
# CLAUDE CODE ACADEMY - SIMPLE BACKUP SCRIPT
# =============================================================================
# Упрощенная версия для работы с любыми AI моделями
# Убраны сложные bash конструкции и кроссплатформенная логика
# =============================================================================

# Простые настройки (без readonly и сложных подстановок)
PROJECT_NAME="claude-code-academy"
BACKUP_DIR="$HOME/backups/$PROJECT_NAME"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="${PROJECT_NAME}_${TIMESTAMP}"

# Простые цвета (без массивов)
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Простая функция логирования (без case)
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Простая проверка окружения
check_environment() {
    log_info "Проверяем окружение..."
    
    # Проверяем git
    if ! command -v git > /dev/null; then
        log_error "Git не найден!"
        exit 1
    fi
    
    # Проверяем tar
    if ! command -v tar > /dev/null; then
        log_error "Tar не найден!"
        exit 1
    fi
    
    # Проверяем что мы в git репозитории
    if ! git status > /dev/null 2>&1; then
        log_error "Не git репозиторий!"
        exit 1
    fi
    
    log_success "Окружение проверено"
}

# Создание директории бэкапов
create_backup_dir() {
    log_info "Создаем директории для бэкапов..."
    
    mkdir -p "$BACKUP_DIR/archives"
    mkdir -p "$BACKUP_DIR/bundles"
    mkdir -p "$BACKUP_DIR/info"
    
    log_success "Директории созданы: $BACKUP_DIR"
}

# Создание архива проекта
create_archive() {
    log_info "Создаем архив проекта..."
    
    local archive_path="$BACKUP_DIR/archives/${BACKUP_NAME}.tar.gz"
    
    # Простое создание архива (без сложной логики)
    tar -czf "$archive_path" \
        --exclude=".git" \
        --exclude="backups" \
        --exclude="*.tar.gz" \
        --exclude="node_modules" \
        .
    
    # Простая проверка
    if [ -f "$archive_path" ]; then
        log_success "Архив создан: $(basename "$archive_path")"
        echo "$archive_path"
    else
        log_error "Ошибка создания архива"
        exit 1
    fi
}

# Создание git bundle
create_bundle() {
    log_info "Создаем git bundle..."
    
    local bundle_path="$BACKUP_DIR/bundles/${BACKUP_NAME}.bundle"
    
    # Простое создание bundle
    git bundle create "$bundle_path" --all
    
    # Простая проверка
    if [ -f "$bundle_path" ]; then
        log_success "Bundle создан: $(basename "$bundle_path")"
        echo "$bundle_path"
    else
        log_error "Ошибка создания bundle"
        exit 1
    fi
}

# Создание информационного файла
create_info() {
    log_info "Создаем информационный файл..."
    
    local info_path="$BACKUP_DIR/info/${BACKUP_NAME}.txt"
    local archive_path="$1"
    local bundle_path="$2"
    
    # Простая информация (без JSON)
    cat > "$info_path" << EOF
BACKUP_NAME=$BACKUP_NAME
DATE=$(date)
TIMESTAMP=$TIMESTAMP
GIT_COMMIT=$(git rev-parse HEAD)
GIT_BRANCH=$(git branch --show-current)
ARCHIVE_PATH=$archive_path
BUNDLE_PATH=$bundle_path
PROJECT_PATH=$(pwd)
EOF
    
    log_success "Информация сохранена: $(basename "$info_path")"
    echo "$info_path"
}

# Создание простого скрипта восстановления
create_restore_script() {
    log_info "Создаем скрипт восстановления..."
    
    local restore_script="$BACKUP_DIR/restore_${BACKUP_NAME}.sh"
    local archive_path="$1"
    local bundle_path="$2"
    
    # Простой скрипт восстановления
    cat > "$restore_script" << EOF
#!/bin/bash

# Простой скрипт восстановления для $BACKUP_NAME
# Использование: ./restore_${BACKUP_NAME}.sh /path/to/restore

ARCHIVE_PATH="$archive_path"
BUNDLE_PATH="$bundle_path"
RESTORE_DIR="\$1"

if [ -z "\$RESTORE_DIR" ]; then
    echo "Использование: \$0 <директория_восстановления>"
    echo "Пример: \$0 ~/restored-project"
    exit 1
fi

echo "Восстанавливаем в: \$RESTORE_DIR"
echo "Из архива: \$ARCHIVE_PATH"

# Создаем директорию
mkdir -p "\$RESTORE_DIR"

# Извлекаем архив
echo "Извлекаем файлы..."
tar -xzf "\$ARCHIVE_PATH" -C "\$RESTORE_DIR"

# Восстанавливаем git
echo "Восстанавливаем git..."
cd "\$RESTORE_DIR"
git init
git bundle unbundle "\$BUNDLE_PATH"
git checkout main 2>/dev/null || git checkout master 2>/dev/null

echo "Восстановление завершено!"
echo "Перейдите в: \$RESTORE_DIR"
EOF
    
    chmod +x "$restore_script"
    log_success "Скрипт восстановления: $(basename "$restore_script")"
}

# Очистка старых бэкапов
cleanup_old_backups() {
    log_info "Очищаем старые бэкапы (оставляем 5 последних)..."
    
    # Простой подсчет файлов
    local archive_count=$(ls -1 "$BACKUP_DIR/archives"/*.tar.gz 2>/dev/null | wc -l)
    
    if [ "$archive_count" -gt 5 ]; then
        # Простое удаление старых файлов
        ls -t "$BACKUP_DIR/archives"/*.tar.gz | tail -n +6 | while read file; do
            local basename=$(basename "$file" .tar.gz)
            rm -f "$BACKUP_DIR/archives/${basename}.tar.gz"
            rm -f "$BACKUP_DIR/bundles/${basename}.bundle"
            rm -f "$BACKUP_DIR/info/${basename}.txt"
            log_info "Удален старый бэкап: $basename"
        done
    fi
    
    log_success "Очистка завершена"
}

# Главная функция
main() {
    echo "========================================"
    echo "  CLAUDE CODE ACADEMY - SIMPLE BACKUP  "
    echo "========================================"
    echo "Время: $(date)"
    echo "Бэкап: $BACKUP_NAME"
    echo "========================================"
    echo ""
    
    # Выполняем все шаги по порядку
    check_environment
    create_backup_dir
    
    local archive_path=$(create_archive)
    local bundle_path=$(create_bundle)
    local info_path=$(create_info "$archive_path" "$bundle_path")
    
    create_restore_script "$archive_path" "$bundle_path"
    cleanup_old_backups
    
    # Итоговая информация
    echo ""
    echo "========================================"
    echo "         БЭКАП ЗАВЕРШЕН УСПЕШНО        "
    echo "========================================"
    echo "Архив: $(basename "$archive_path")"
    echo "Bundle: $(basename "$bundle_path")"
    echo "Информация: $(basename "$info_path")"
    echo "Директория: $BACKUP_DIR"
    echo "========================================"
    
    log_success "Бэкап создан успешно!"
}

# Запуск
main "$@"
