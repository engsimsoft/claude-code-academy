#!/bin/bash

# =============================================================================
# CLAUDE CODE ACADEMY - SIMPLE RESTORE SCRIPT  
# =============================================================================
# Упрощенная версия для работы с любыми AI моделями
# Убраны сложные bash конструкции и JSON парсинг
# =============================================================================

# Простые настройки
PROJECT_NAME="claude-code-academy"
BACKUP_DIR="$HOME/backups/$PROJECT_NAME"

# Простые цвета
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Простые функции логирования
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

# Проверка окружения
check_environment() {
    log_info "Проверяем окружение..."
    
    if [ ! -d "$BACKUP_DIR" ]; then
        log_error "Директория бэкапов не найдена: $BACKUP_DIR"
        log_info "Сначала запустите: ./simple-backup.sh"
        exit 1
    fi
    
    if ! command -v git > /dev/null; then
        log_error "Git не найден!"
        exit 1
    fi
    
    if ! command -v tar > /dev/null; then
        log_error "Tar не найден!"
        exit 1
    fi
    
    log_success "Окружение проверено"
}

# Простой список бэкапов
list_backups() {
    log_info "Ищем доступные бэкапы..."
    echo ""
    
    if [ ! -d "$BACKUP_DIR/info" ]; then
        log_error "Нет информации о бэкапах"
        exit 1
    fi
    
    # Простой список файлов
    local counter=1
    local backup_files=""
    
    echo "Доступные бэкапы:"
    echo "=================="
    
    # Простой цикл по файлам
    for info_file in "$BACKUP_DIR/info"/*.txt; do
        if [ -f "$info_file" ]; then
            # Простое чтение информации
            local backup_name=$(grep "BACKUP_NAME=" "$info_file" | cut -d'=' -f2)
            local date=$(grep "DATE=" "$info_file" | cut -d'=' -f2-)
            local commit=$(grep "GIT_COMMIT=" "$info_file" | cut -d'=' -f2)
            
            # Короткий коммит
            local short_commit="${commit:0:8}"
            
            echo "$counter) $backup_name"
            echo "   Дата: $date"
            echo "   Коммит: $short_commit"
            echo ""
            
            # Сохраняем для выбора
            backup_files="$backup_files$counter:$info_file\n"
            counter=$((counter + 1))
        fi
    done
    
    if [ "$counter" -eq 1 ]; then
        log_error "Бэкапы не найдены"
        exit 1
    fi
    
    echo "$backup_files"
}

# Простой выбор бэкапа
select_backup() {
    local backup_list="$1"
    local max_number=$(($(echo -e "$backup_list" | wc -l) - 1))
    
    echo "Выберите бэкап для восстановления (1-$max_number):"
    read -p "Введите номер: " selected_number
    
    # Простая проверка
    if [ "$selected_number" -lt 1 ] || [ "$selected_number" -gt "$max_number" ]; then
        log_error "Неверный номер: $selected_number"
        exit 1
    fi
    
    # Простой поиск файла
    local selected_file=$(echo -e "$backup_list" | grep "^$selected_number:" | cut -d':' -f2)
    
    if [ -z "$selected_file" ]; then
        log_error "Не найден бэкап с номером: $selected_number"
        exit 1
    fi
    
    echo "$selected_file"
}

# Показать информацию о бэкапе
show_backup_info() {
    local info_file="$1"
    
    echo ""
    echo "Информация о бэкапе:"
    echo "===================="
    
    # Простое чтение и вывод
    local backup_name=$(grep "BACKUP_NAME=" "$info_file" | cut -d'=' -f2)
    local date=$(grep "DATE=" "$info_file" | cut -d'=' -f2-)
    local commit=$(grep "GIT_COMMIT=" "$info_file" | cut -d'=' -f2)
    local branch=$(grep "GIT_BRANCH=" "$info_file" | cut -d'=' -f2)
    local archive=$(grep "ARCHIVE_PATH=" "$info_file" | cut -d'=' -f2)
    
    echo "Название: $backup_name"
    echo "Дата: $date"
    echo "Коммит: $commit"
    echo "Ветка: $branch"
    echo "Архив: $(basename "$archive")"
    echo ""
}

# Подтверждение восстановления
confirm_restore() {
    local restore_dir="$1"
    
    echo -e "${RED}ВНИМАНИЕ: ОПАСНАЯ ОПЕРАЦИЯ${NC}"
    echo "=========================="
    echo "Восстановление в: $restore_dir"
    echo ""
    
    if [ -d "$restore_dir" ]; then
        echo -e "${RED}Директория существует и будет ПЕРЕЗАПИСАНА!${NC}"
        echo "Содержимое:"
        ls -la "$restore_dir" | head -5
        echo ""
    fi
    
    echo "Введите 'YES' для подтверждения:"
    read -p "> " confirmation
    
    if [ "$confirmation" != "YES" ]; then
        log_info "Восстановление отменено"
        exit 0
    fi
}

# Проверка файлов бэкапа
check_backup_files() {
    local info_file="$1"
    
    log_info "Проверяем файлы бэкапа..."
    
    local archive_path=$(grep "ARCHIVE_PATH=" "$info_file" | cut -d'=' -f2)
    local bundle_path=$(grep "BUNDLE_PATH=" "$info_file" | cut -d'=' -f2)
    
    # Простые проверки
    if [ ! -f "$archive_path" ]; then
        log_error "Архив не найден: $archive_path"
        exit 1
    fi
    
    if [ ! -f "$bundle_path" ]; then
        log_error "Bundle не найден: $bundle_path"
        exit 1
    fi
    
    # Проверка целостности
    if ! tar -tzf "$archive_path" > /dev/null 2>&1; then
        log_error "Архив поврежден: $archive_path"
        exit 1
    fi
    
    if ! git bundle verify "$bundle_path" > /dev/null 2>&1; then
        log_error "Bundle поврежден: $bundle_path"
        exit 1
    fi
    
    log_success "Файлы бэкапа проверены"
    echo "$archive_path|$bundle_path"
}

# Выполнение восстановления
perform_restore() {
    local restore_dir="$1"
    local archive_path="$2"
    local bundle_path="$3"
    local branch="$4"
    
    log_info "Начинаем восстановление..."
    
    # Очищаем/создаем директорию
    if [ -d "$restore_dir" ]; then
        rm -rf "$restore_dir"
    fi
    mkdir -p "$restore_dir"
    
    # Извлекаем архив
    log_info "Извлекаем файлы..."
    tar -xzf "$archive_path" -C "$restore_dir"
    
    # Восстанавливаем git
    log_info "Восстанавливаем git репозиторий..."
    cd "$restore_dir"
    
    git init
    git bundle unbundle "$bundle_path"
    
    # Простое переключение на ветку
    if ! git checkout "$branch" 2>/dev/null; then
        if ! git checkout main 2>/dev/null; then
            git checkout master 2>/dev/null || true
        fi
    fi
    
    log_success "Восстановление завершено"
}

# Проверка результата
verify_restore() {
    local restore_dir="$1"
    
    log_info "Проверяем результат..."
    
    cd "$restore_dir"
    
    # Простые проверки
    if [ ! -f "index.html" ]; then
        log_error "index.html не найден"
        exit 1
    fi
    
    if [ ! -f "README.md" ]; then
        log_error "README.md не найден"
        exit 1
    fi
    
    if ! git status > /dev/null 2>&1; then
        log_error "Git репозиторий поврежден"
        exit 1
    fi
    
    local file_count=$(find . -type f | wc -l)
    log_success "Проверка пройдена. Файлов: $file_count"
}

# Главная функция
main() {
    echo "========================================"
    echo "  CLAUDE CODE ACADEMY - SIMPLE RESTORE "
    echo "========================================"
    echo "Время: $(date)"
    echo "========================================"
    echo ""
    
    # Определяем директорию восстановления
    local restore_dir="$1"
    if [ -z "$restore_dir" ]; then
        restore_dir="$HOME/restored-$PROJECT_NAME-$(date +%Y%m%d_%H%M%S)"
    fi
    
    # Выполняем все шаги
    check_environment
    
    local backup_list=$(list_backups)
    local selected_info=$(select_backup "$backup_list")
    
    show_backup_info "$selected_info"
    
    echo "Директория восстановления: $restore_dir"
    confirm_restore "$restore_dir"
    
    local file_paths=$(check_backup_files "$selected_info")
    local archive_path=$(echo "$file_paths" | cut -d'|' -f1)
    local bundle_path=$(echo "$file_paths" | cut -d'|' -f2)
    local branch=$(grep "GIT_BRANCH=" "$selected_info" | cut -d'=' -f2)
    
    perform_restore "$restore_dir" "$archive_path" "$bundle_path" "$branch"
    verify_restore "$restore_dir"
    
    # Итоговая информация
    echo ""
    echo "========================================"
    echo "      ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО         "
    echo "========================================"
    echo "Директория: $restore_dir"
    echo "Ветка: $branch"
    echo ""
    echo "Следующие шаги:"
    echo "cd \"$restore_dir\""
    echo "# Продолжайте разработку"
    echo "========================================"
    
    log_success "Проект восстановлен успешно!"
}

# Показать справку
show_help() {
    echo "Использование:"
    echo "  $0 [директория_восстановления]"
    echo ""
    echo "Примеры:"
    echo "  $0                           # Интерактивный режим"
    echo "  $0 ~/my-restored-project     # Восстановить в указанную директорию"
    echo ""
}

# Обработка аргументов
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
esac

# Запуск
main "$@"
