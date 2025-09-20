#!/bin/bash

# =============================================================================
# CLAUDE CODE ACADEMY - ENTERPRISE BACKUP SYSTEM
# =============================================================================
# Description: Comprehensive backup solution with git bundles and restore scripts
# Author: Claude Code Academy Team
# Version: 1.0.0
# =============================================================================

set -euo pipefail

# Color definitions for CLI interface
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly WHITE='\033[1;37m'
readonly NC='\033[0m' # No Color

# Configuration
readonly PROJECT_NAME="claude-code-academy"
readonly BACKUP_DIR="$HOME/backups/$PROJECT_NAME"
readonly MAX_BACKUPS=10
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_DIR="$SCRIPT_DIR"
readonly TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
readonly BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"

# Logging setup
readonly LOG_FILE="$BACKUP_DIR/backup.log"

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE" 2>/dev/null || true

    case "$level" in
        "INFO")  echo -e "${CYAN}[INFO]${NC} $message" ;;
        "WARN")  echo -e "${YELLOW}[WARN]${NC} $message" ;;
        "ERROR") echo -e "${RED}[ERROR]${NC} $message" ;;
        "SUCCESS") echo -e "${GREEN}[SUCCESS]${NC} $message" ;;
    esac
}

show_progress() {
    local current=$1
    local total=$2
    local task="$3"
    local width=50
    local progress=$((current * width / total))
    local percentage=$((current * 100 / total))

    printf "\r${BLUE}[${NC}"
    printf "%*s" $progress | tr ' ' '='
    printf "%*s" $((width - progress)) | tr ' ' '-'
    printf "${BLUE}]${NC} ${percentage}%% - ${task}"

    if [ $current -eq $total ]; then
        echo ""
    fi
}

validate_environment() {
    log "INFO" "Validating environment..."

    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log "ERROR" "Not in a git repository!"
        exit 1
    fi

    # Check required commands
    local required_commands=("git" "tar" "gzip" "find" "wc")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" > /dev/null 2>&1; then
            log "ERROR" "Required command not found: $cmd"
            exit 1
        fi
    done

    # Validate project directory
    if [ ! -f "$PROJECT_DIR/index.html" ] || [ ! -f "$PROJECT_DIR/README.md" ]; then
        log "ERROR" "Invalid project directory structure"
        exit 1
    fi

    log "SUCCESS" "Environment validation passed"
}

create_backup_directory() {
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
    fi

    # Create subdirectories
    mkdir -p "$BACKUP_DIR/archives"
    mkdir -p "$BACKUP_DIR/git-bundles"
    mkdir -p "$BACKUP_DIR/restore-scripts"
    mkdir -p "$BACKUP_DIR/metadata"

    # Initialize log file if it doesn't exist
    if [ ! -f "$LOG_FILE" ]; then
        touch "$LOG_FILE"
    fi

    log "INFO" "Setting up backup directory structure..."
    if [ ! -d "$BACKUP_DIR/archives" ]; then
        log "SUCCESS" "Created backup directory: $BACKUP_DIR"
    else
        log "INFO" "Using existing backup directory: $BACKUP_DIR"
    fi
}

# =============================================================================
# BACKUP FUNCTIONS
# =============================================================================

create_project_archive() {
    log "INFO" "Creating project archive..."

    local archive_path="$BACKUP_DIR/archives/${BACKUP_NAME}.tar.gz"
    local temp_dir=$(mktemp -d)
    local project_copy="$temp_dir/$BACKUP_NAME"

    # Copy project files
    show_progress 1 5 "Copying project files..."
    cp -r "$PROJECT_DIR" "$project_copy"

    # Remove backup-related files from the copy to avoid recursion
    show_progress 2 5 "Cleaning temporary files..."
    find "$project_copy" -name "backups" -type d -exec rm -rf {} + 2>/dev/null || true
    find "$project_copy" -name "*.backup" -delete 2>/dev/null || true
    find "$project_copy" -name "*.tar.gz" -delete 2>/dev/null || true
    find "$project_copy" -name ".backup_*" -delete 2>/dev/null || true
    find "$project_copy" -name "restore_*.sh" -delete 2>/dev/null || true

    # Create optimized archive
    show_progress 3 5 "Creating compressed archive..."
    cd "$temp_dir"
    tar -czf "$archive_path" "$BACKUP_NAME" --exclude-vcs-ignores 2>/dev/null

    # Verify archive integrity
    show_progress 4 5 "Verifying archive integrity..."
    if tar -tzf "$archive_path" > /dev/null 2>&1; then
        log "SUCCESS" "Archive created and verified: $(basename "$archive_path")"
    else
        log "ERROR" "Archive verification failed!"
        rm -f "$archive_path"
        rm -rf "$temp_dir"
        exit 1
    fi

    show_progress 5 5 "Archive creation complete"

    # Cleanup
    rm -rf "$temp_dir"
}

create_git_bundle() {
    log "INFO" "Creating git bundle with full history..."

    local bundle_path="$BACKUP_DIR/git-bundles/${BACKUP_NAME}.bundle"

    # Create git bundle with all branches and tags
    show_progress 1 3 "Bundling git repository..."
    if git bundle create "$bundle_path" --all; then
        show_progress 2 3 "Verifying bundle integrity..."
        if git bundle verify "$bundle_path" > /dev/null 2>&1; then
            show_progress 3 3 "Git bundle creation complete"
            log "SUCCESS" "Git bundle created and verified: $(basename "$bundle_path")"
        else
            log "ERROR" "Git bundle verification failed!"
            rm -f "$bundle_path"
            exit 1
        fi
    else
        log "ERROR" "Failed to create git bundle!"
        exit 1
    fi
}

generate_metadata() {
    log "INFO" "Generating backup metadata..."

    local metadata_file="$BACKUP_DIR/metadata/${BACKUP_NAME}.json"
    local archive_size=$(stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null)
    local bundle_size=$(stat -f%z "$2" 2>/dev/null || stat -c%s "$2" 2>/dev/null)
    local git_commit=$(git rev-parse HEAD)
    local git_branch=$(git branch --show-current)
    local file_count=$(find "$PROJECT_DIR" -type f | wc -l | tr -d ' ')

    cat > "$metadata_file" << EOF
{
    "backup_name": "$BACKUP_NAME",
    "timestamp": "$TIMESTAMP",
    "date_human": "$(date '+%Y-%m-%d %H:%M:%S')",
    "project_name": "$PROJECT_NAME",
    "project_path": "$PROJECT_DIR",
    "git_commit": "$git_commit",
    "git_branch": "$git_branch",
    "archive_path": "$1",
    "bundle_path": "$2",
    "archive_size_bytes": $archive_size,
    "bundle_size_bytes": $bundle_size,
    "archive_size_human": "$(numfmt --to=iec $archive_size 2>/dev/null || echo "${archive_size}B")",
    "bundle_size_human": "$(numfmt --to=iec $bundle_size 2>/dev/null || echo "${bundle_size}B")",
    "file_count": $file_count,
    "system_info": {
        "hostname": "$(hostname)",
        "user": "$USER",
        "os": "$(uname -s)",
        "os_version": "$(uname -r)"
    }
}
EOF

    log "SUCCESS" "Metadata generated: $(basename "$metadata_file")"
}

generate_restore_script() {
    log "INFO" "Generating restore script..."

    local archive_path="$1"
    local bundle_path="$2"
    local metadata_file="$3"
    local restore_script="$BACKUP_DIR/restore-scripts/restore_${BACKUP_NAME}.sh"

    cat > "$restore_script" << 'EOF'
#!/bin/bash

# =============================================================================
# CLAUDE CODE ACADEMY - RESTORE SCRIPT
# =============================================================================

set -euo pipefail

# Color definitions
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m'

log() {
    local level="$1"
    shift
    local message="$*"

    case "$level" in
        "INFO")  echo -e "${BLUE}[INFO]${NC} $message" ;;
        "WARN")  echo -e "${YELLOW}[WARN]${NC} $message" ;;
        "ERROR") echo -e "${RED}[ERROR]${NC} $message" ;;
        "SUCCESS") echo -e "${GREEN}[SUCCESS]${NC} $message" ;;
    esac
}

confirm_restore() {
    echo -e "${YELLOW}WARNING: This will restore your project to the state from:${NC}"
    echo -e "Backup: BACKUP_NAME_PLACEHOLDER"
    echo -e "Date: DATE_PLACEHOLDER"
    echo -e "Git Commit: COMMIT_PLACEHOLDER"
    echo ""
    echo -e "${RED}This operation will OVERWRITE your current project!${NC}"
    echo ""
    read -p "Are you sure you want to continue? (yes/no): " -r
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        log "INFO" "Restore cancelled by user"
        exit 0
    fi
}

restore_from_backup() {
    local restore_dir="$1"
    local archive_path="ARCHIVE_PATH_PLACEHOLDER"
    local bundle_path="BUNDLE_PATH_PLACEHOLDER"

    log "INFO" "Starting restore process..."

    # Create restore directory
    mkdir -p "$restore_dir"

    # Extract archive
    log "INFO" "Extracting project archive..."
    tar -xzf "$archive_path" -C "$restore_dir" --strip-components=1

    # Initialize git repository and restore from bundle
    log "INFO" "Restoring git repository..."
    cd "$restore_dir"

    if [ ! -d ".git" ]; then
        git init
    fi

    git bundle unbundle "$bundle_path"
    git checkout BRANCH_PLACEHOLDER 2>/dev/null || git checkout main 2>/dev/null || git checkout master 2>/dev/null

    log "SUCCESS" "Restore completed successfully!"
    log "INFO" "Project restored to: $restore_dir"
}

main() {
    if [ $# -eq 0 ]; then
        echo "Usage: $0 <restore_directory>"
        echo "Example: $0 ~/restored-claude-code-academy"
        exit 1
    fi

    local restore_dir="$1"

    confirm_restore
    restore_from_backup "$restore_dir"
}

main "$@"
EOF

    # Replace placeholders with actual values
    local backup_date=$(date -r ${TIMESTAMP:0:8} '+%Y-%m-%d' 2>/dev/null || date '+%Y-%m-%d')
    local git_commit=$(git rev-parse HEAD)
    local git_branch=$(git branch --show-current)

    # Use perl for more reliable substitution
    if command -v perl > /dev/null 2>&1; then
        perl -i -pe "s|BACKUP_NAME_PLACEHOLDER|$BACKUP_NAME|g" "$restore_script"
        perl -i -pe "s|DATE_PLACEHOLDER|$backup_date ${TIMESTAMP:9:2}:${TIMESTAMP:11:2}:${TIMESTAMP:13:2}|g" "$restore_script"
        perl -i -pe "s|COMMIT_PLACEHOLDER|$git_commit|g" "$restore_script"
        perl -i -pe "s|ARCHIVE_PATH_PLACEHOLDER|$archive_path|g" "$restore_script"
        perl -i -pe "s|BUNDLE_PATH_PLACEHOLDER|$bundle_path|g" "$restore_script"
        perl -i -pe "s|BRANCH_PLACEHOLDER|$git_branch|g" "$restore_script"
    else
        # Fallback to safer sed approach
        sed -i '' "s|BACKUP_NAME_PLACEHOLDER|$BACKUP_NAME|g" "$restore_script" 2>/dev/null || sed -i "s|BACKUP_NAME_PLACEHOLDER|$BACKUP_NAME|g" "$restore_script"
        sed -i '' "s|DATE_PLACEHOLDER|$backup_date ${TIMESTAMP:9:2}:${TIMESTAMP:11:2}:${TIMESTAMP:13:2}|g" "$restore_script" 2>/dev/null || sed -i "s|DATE_PLACEHOLDER|$backup_date ${TIMESTAMP:9:2}:${TIMESTAMP:11:2}:${TIMESTAMP:13:2}|g" "$restore_script"
        sed -i '' "s|COMMIT_PLACEHOLDER|$git_commit|g" "$restore_script" 2>/dev/null || sed -i "s|COMMIT_PLACEHOLDER|$git_commit|g" "$restore_script"
        sed -i '' "s|ARCHIVE_PATH_PLACEHOLDER|$archive_path|g" "$restore_script" 2>/dev/null || sed -i "s|ARCHIVE_PATH_PLACEHOLDER|$archive_path|g" "$restore_script"
        sed -i '' "s|BUNDLE_PATH_PLACEHOLDER|$bundle_path|g" "$restore_script" 2>/dev/null || sed -i "s|BUNDLE_PATH_PLACEHOLDER|$bundle_path|g" "$restore_script"
        sed -i '' "s|BRANCH_PLACEHOLDER|$git_branch|g" "$restore_script" 2>/dev/null || sed -i "s|BRANCH_PLACEHOLDER|$git_branch|g" "$restore_script"
    fi

    rm -f "${restore_script}.bak"
    chmod +x "$restore_script"

    log "SUCCESS" "Restore script generated: $(basename "$restore_script")"
}

cleanup_old_backups() {
    log "INFO" "Cleaning up old backups (keeping $MAX_BACKUPS most recent)..."

    # Count existing backups
    local backup_count=$(find "$BACKUP_DIR/archives" -name "*.tar.gz" | wc -l | tr -d ' ')

    if [ "$backup_count" -le "$MAX_BACKUPS" ]; then
        log "INFO" "No cleanup needed ($backup_count/$MAX_BACKUPS backups)"
        return 0
    fi

    # Get list of backups sorted by modification time (oldest first)
    local backups_to_remove=$((backup_count - MAX_BACKUPS))
    local old_backups=$(find "$BACKUP_DIR/archives" -name "*.tar.gz" -type f -exec ls -t {} + | tail -n "$backups_to_remove")

    log "INFO" "Removing $backups_to_remove old backup(s)..."

    echo "$old_backups" | while read -r backup_file; do
        local backup_basename=$(basename "$backup_file" .tar.gz)

        # Remove associated files
        rm -f "$BACKUP_DIR/archives/${backup_basename}.tar.gz"
        rm -f "$BACKUP_DIR/git-bundles/${backup_basename}.bundle"
        rm -f "$BACKUP_DIR/metadata/${backup_basename}.json"
        rm -f "$BACKUP_DIR/restore-scripts/restore_${backup_basename}.sh"

        log "INFO" "Removed backup: $backup_basename"
    done

    log "SUCCESS" "Cleanup completed"
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

show_header() {
    echo -e "${PURPLE}===================================================================================${NC}"
    echo -e "${WHITE}                    CLAUDE CODE ACADEMY - BACKUP SYSTEM                          ${NC}"
    echo -e "${PURPLE}===================================================================================${NC}"
    echo -e "${CYAN}Project:${NC} $PROJECT_NAME"
    echo -e "${CYAN}Backup Time:${NC} $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${CYAN}Backup Name:${NC} $BACKUP_NAME"
    echo -e "${PURPLE}===================================================================================${NC}"
    echo ""
}

main() {
    show_header

    # Validation phase
    validate_environment
    create_backup_directory

    # Backup phase
    log "INFO" "Starting backup process..."

    # Create archive
    create_project_archive
    local archive_path="$BACKUP_DIR/archives/${BACKUP_NAME}.tar.gz"

    # Create git bundle
    create_git_bundle
    local bundle_path="$BACKUP_DIR/git-bundles/${BACKUP_NAME}.bundle"

    # Generate metadata
    generate_metadata "$archive_path" "$bundle_path"
    local metadata_file="$BACKUP_DIR/metadata/${BACKUP_NAME}.json"

    # Generate restore script
    generate_restore_script "$archive_path" "$bundle_path" "$metadata_file"
    local restore_script="$BACKUP_DIR/restore-scripts/restore_${BACKUP_NAME}.sh"

    # Cleanup phase
    cleanup_old_backups

    # Final summary
    echo ""
    echo -e "${GREEN}===================================================================================${NC}"
    echo -e "${WHITE}                              BACKUP COMPLETED                                   ${NC}"
    echo -e "${GREEN}===================================================================================${NC}"
    echo -e "${GREEN}✓${NC} Archive: $(basename "$archive_path")"
    echo -e "${GREEN}✓${NC} Git Bundle: $(basename "$bundle_path")"
    echo -e "${GREEN}✓${NC} Metadata: $(basename "$metadata_file")"
    echo -e "${GREEN}✓${NC} Restore Script: $(basename "$restore_script")"
    echo ""
    echo -e "${CYAN}Backup Location:${NC} $BACKUP_DIR"
    echo -e "${CYAN}Total Backups:${NC} $(find "$BACKUP_DIR/archives" -name "*.tar.gz" | wc -l | tr -d ' ')/$MAX_BACKUPS"
    echo ""
    echo -e "${YELLOW}To restore this backup:${NC}"
    echo -e "  $restore_script ~/restored-project"
    echo ""
    echo -e "${YELLOW}To manage backups:${NC}"
    echo -e "  ./restore-project.sh"
    echo -e "${GREEN}===================================================================================${NC}"

    log "SUCCESS" "Backup process completed successfully"
}

# Handle script interruption gracefully
trap 'log "WARN" "Backup interrupted by user"; exit 130' INT TERM

# Execute main function
main "$@"