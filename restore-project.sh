#!/bin/bash

# =============================================================================
# CLAUDE CODE ACADEMY - RESTORE PROJECT SYSTEM
# =============================================================================
# Description: Interactive backup selection and safe project restoration
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
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

log() {
    local level="$1"
    shift
    local message="$*"

    case "$level" in
        "INFO")  echo -e "${CYAN}[INFO]${NC} $message" ;;
        "WARN")  echo -e "${YELLOW}[WARN]${NC} $message" ;;
        "ERROR") echo -e "${RED}[ERROR]${NC} $message" ;;
        "SUCCESS") echo -e "${GREEN}[SUCCESS]${NC} $message" ;;
    esac
}

show_header() {
    clear
    echo -e "${PURPLE}===================================================================================${NC}"
    echo -e "${WHITE}                    CLAUDE CODE ACADEMY - RESTORE SYSTEM                         ${NC}"
    echo -e "${PURPLE}===================================================================================${NC}"
    echo -e "${CYAN}Project:${NC} $PROJECT_NAME"
    echo -e "${CYAN}Current Time:${NC} $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${PURPLE}===================================================================================${NC}"
    echo ""
}

validate_backup_environment() {
    log "INFO" "Validating backup environment..."

    if [ ! -d "$BACKUP_DIR" ]; then
        log "ERROR" "Backup directory not found: $BACKUP_DIR"
        log "INFO" "Please run ./backup-system.sh first to create backups"
        exit 1
    fi

    if [ ! -d "$BACKUP_DIR/archives" ] || [ ! -d "$BACKUP_DIR/metadata" ]; then
        log "ERROR" "Invalid backup directory structure"
        exit 1
    fi

    # Check for required commands
    local required_commands=("git" "tar" "jq")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" > /dev/null 2>&1; then
            if [ "$cmd" = "jq" ]; then
                log "WARN" "jq not found - using basic JSON parsing (install jq for better experience)"
            else
                log "ERROR" "Required command not found: $cmd"
                exit 1
            fi
        fi
    done

    log "SUCCESS" "Environment validation passed"
}

# =============================================================================
# BACKUP LISTING AND SELECTION
# =============================================================================

get_backup_info() {
    local metadata_file="$1"
    local backup_name=""
    local timestamp=""
    local date_human=""
    local git_commit=""
    local git_branch=""
    local archive_size=""
    local file_count=""

    if command -v jq > /dev/null 2>&1; then
        # Use jq for robust JSON parsing
        backup_name=$(jq -r '.backup_name // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
        timestamp=$(jq -r '.timestamp // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
        date_human=$(jq -r '.date_human // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
        git_commit=$(jq -r '.git_commit // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
        git_branch=$(jq -r '.git_branch // "main"' "$metadata_file" 2>/dev/null || echo "main")
        archive_size=$(jq -r '.archive_size_human // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
        file_count=$(jq -r '.file_count // "unknown"' "$metadata_file" 2>/dev/null || echo "unknown")
    else
        # Basic grep-based parsing as fallback
        backup_name=$(grep '"backup_name"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "unknown")
        timestamp=$(grep '"timestamp"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "unknown")
        date_human=$(grep '"date_human"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "unknown")
        git_commit=$(grep '"git_commit"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "unknown")
        git_branch=$(grep '"git_branch"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "main")
        archive_size=$(grep '"archive_size_human"' "$metadata_file" | cut -d'"' -f4 2>/dev/null || echo "unknown")
        file_count=$(grep '"file_count"' "$metadata_file" | cut -d':' -f2 | tr -d ' ,' 2>/dev/null || echo "unknown")
    fi

    echo "$backup_name|$timestamp|$date_human|$git_commit|$git_branch|$archive_size|$file_count"
}

list_available_backups() {
    log "INFO" "Scanning for available backups..."
    echo ""

    if [ ! -d "$BACKUP_DIR/metadata" ] || [ -z "$(ls -A "$BACKUP_DIR/metadata" 2>/dev/null)" ]; then
        log "WARN" "No backups found in $BACKUP_DIR"
        echo ""
        log "INFO" "To create a backup, run: ./backup-system.sh"
        exit 0
    fi

    local counter=1
    declare -A backup_map

    echo -e "${WHITE}Available Backups:${NC}"
    echo -e "${BLUE}===================================================================================${NC}"
    printf "%-4s %-20s %-20s %-12s %-10s %s\n" "ID" "Date" "Git Commit" "Branch" "Size" "Files"
    echo -e "${BLUE}===================================================================================${NC}"

    # Process metadata files sorted by modification time (newest first)
    for metadata_file in $(ls -t "$BACKUP_DIR/metadata"/*.json 2>/dev/null); do
        local info=$(get_backup_info "$metadata_file")
        IFS='|' read -r backup_name timestamp date_human git_commit git_branch archive_size file_count <<< "$info"

        # Store mapping for selection
        backup_map[$counter]="$metadata_file"

        # Format git commit for display
        local short_commit="${git_commit:0:8}..."
        if [ ${#git_commit} -le 8 ]; then
            short_commit="$git_commit"
        fi

        printf "%-4d %-20s %-20s %-12s %-10s %s\n" \
            "$counter" \
            "$date_human" \
            "$short_commit" \
            "$git_branch" \
            "$archive_size" \
            "$file_count"

        ((counter++))
    done

    echo -e "${BLUE}===================================================================================${NC}"
    echo ""

    # Return the backup map for selection
    for key in "${!backup_map[@]}"; do
        echo "$key:${backup_map[$key]}"
    done
}

select_backup() {
    local backup_list="$1"
    local backup_count=$(echo "$backup_list" | wc -l | tr -d ' ')

    if [ "$backup_count" -eq 0 ]; then
        log "ERROR" "No backups available for selection"
        exit 1
    fi

    echo -e "${YELLOW}Select a backup to restore (1-$backup_count):${NC}"
    read -p "Enter backup ID: " -r selected_id

    # Validate selection
    if ! [[ "$selected_id" =~ ^[0-9]+$ ]] || [ "$selected_id" -lt 1 ] || [ "$selected_id" -gt "$backup_count" ]; then
        log "ERROR" "Invalid selection: $selected_id"
        echo ""
        log "INFO" "Please enter a number between 1 and $backup_count"
        exit 1
    fi

    # Find the selected metadata file
    local selected_metadata=$(echo "$backup_list" | grep "^$selected_id:" | cut -d':' -f2)

    if [ -z "$selected_metadata" ]; then
        log "ERROR" "Could not find backup with ID: $selected_id"
        exit 1
    fi

    echo "$selected_metadata"
}

# =============================================================================
# RESTORATION FUNCTIONS
# =============================================================================

show_backup_details() {
    local metadata_file="$1"
    local info=$(get_backup_info "$metadata_file")
    IFS='|' read -r backup_name timestamp date_human git_commit git_branch archive_size file_count <<< "$info"

    echo -e "${WHITE}Backup Details:${NC}"
    echo -e "${BLUE}===================================================================================${NC}"
    echo -e "${CYAN}Backup Name:${NC} $backup_name"
    echo -e "${CYAN}Created:${NC} $date_human"
    echo -e "${CYAN}Git Commit:${NC} $git_commit"
    echo -e "${CYAN}Git Branch:${NC} $git_branch"
    echo -e "${CYAN}Archive Size:${NC} $archive_size"
    echo -e "${CYAN}File Count:${NC} $file_count"
    echo -e "${BLUE}===================================================================================${NC}"
    echo ""
}

confirm_restoration() {
    local restore_dir="$1"
    local metadata_file="$2"
    local info=$(get_backup_info "$metadata_file")
    IFS='|' read -r backup_name timestamp date_human git_commit git_branch archive_size file_count <<< "$info"

    echo -e "${RED}WARNING: DESTRUCTIVE OPERATION${NC}"
    echo -e "${YELLOW}===================================================================================${NC}"
    echo -e "This will restore the backup to: ${WHITE}$restore_dir${NC}"
    echo ""
    echo -e "If the directory exists, ${RED}ALL CONTENT WILL BE REPLACED${NC}"
    echo -e "${YELLOW}===================================================================================${NC}"
    echo ""

    # Check if restore directory exists and has content
    if [ -d "$restore_dir" ] && [ -n "$(ls -A "$restore_dir" 2>/dev/null)" ]; then
        echo -e "${RED}Directory exists and contains files!${NC}"
        echo -e "Contents preview:"
        ls -la "$restore_dir" | head -10
        if [ $(ls -la "$restore_dir" | wc -l) -gt 11 ]; then
            echo "... (and more files)"
        fi
        echo ""
    fi

    echo -e "${YELLOW}Type 'YES' (all caps) to confirm restoration:${NC}"
    read -p "> " -r confirmation

    if [ "$confirmation" != "YES" ]; then
        log "INFO" "Restoration cancelled by user"
        exit 0
    fi
}

validate_backup_files() {
    local metadata_file="$1"
    local info=$(get_backup_info "$metadata_file")
    IFS='|' read -r backup_name timestamp date_human git_commit git_branch archive_size file_count <<< "$info"

    local archive_path="$BACKUP_DIR/archives/${backup_name}.tar.gz"
    local bundle_path="$BACKUP_DIR/git-bundles/${backup_name}.bundle"

    log "INFO" "Validating backup files..."

    # Check archive exists
    if [ ! -f "$archive_path" ]; then
        log "ERROR" "Archive file not found: $archive_path"
        exit 1
    fi

    # Check bundle exists
    if [ ! -f "$bundle_path" ]; then
        log "ERROR" "Git bundle file not found: $bundle_path"
        exit 1
    fi

    # Validate archive integrity
    log "INFO" "Verifying archive integrity..."
    if ! tar -tzf "$archive_path" > /dev/null 2>&1; then
        log "ERROR" "Archive is corrupted: $archive_path"
        exit 1
    fi

    # Validate git bundle
    log "INFO" "Verifying git bundle integrity..."
    if ! git bundle verify "$bundle_path" > /dev/null 2>&1; then
        log "ERROR" "Git bundle is corrupted: $bundle_path"
        exit 1
    fi

    log "SUCCESS" "Backup files validation passed"

    echo "$archive_path|$bundle_path"
}

perform_restoration() {
    local restore_dir="$1"
    local archive_path="$2"
    local bundle_path="$3"
    local git_branch="$4"

    log "INFO" "Starting restoration process..."

    # Create or clean restore directory
    if [ -d "$restore_dir" ]; then
        log "INFO" "Removing existing directory contents..."
        rm -rf "$restore_dir"
    fi
    mkdir -p "$restore_dir"

    # Extract archive
    log "INFO" "Extracting project archive..."
    if ! tar -xzf "$archive_path" -C "$restore_dir" --strip-components=1; then
        log "ERROR" "Failed to extract archive"
        exit 1
    fi

    # Restore git repository
    log "INFO" "Initializing git repository..."
    cd "$restore_dir"

    if [ ! -d ".git" ]; then
        git init
    fi

    log "INFO" "Restoring git history from bundle..."
    if ! git bundle unbundle "$bundle_path"; then
        log "ERROR" "Failed to restore git history"
        exit 1
    fi

    # Checkout appropriate branch
    log "INFO" "Checking out branch: $git_branch"
    if ! git checkout "$git_branch" 2>/dev/null; then
        log "WARN" "Could not checkout $git_branch, trying main..."
        if ! git checkout main 2>/dev/null; then
            log "WARN" "Could not checkout main, trying master..."
            if ! git checkout master 2>/dev/null; then
                log "ERROR" "Could not checkout any branch"
                exit 1
            fi
        fi
    fi

    log "SUCCESS" "Git repository restored successfully"
}

verify_restoration() {
    local restore_dir="$1"
    local expected_files="index.html README.md"

    log "INFO" "Verifying restoration..."

    cd "$restore_dir"

    # Check for expected files
    for file in $expected_files; do
        if [ ! -f "$file" ]; then
            log "ERROR" "Expected file not found: $file"
            exit 1
        fi
    done

    # Check git status
    if ! git status > /dev/null 2>&1; then
        log "ERROR" "Git repository verification failed"
        exit 1
    fi

    local file_count=$(find . -type f | wc -l | tr -d ' ')
    local git_status=$(git status --porcelain | wc -l | tr -d ' ')

    log "SUCCESS" "Restoration verification passed"
    log "INFO" "Files restored: $file_count"
    if [ "$git_status" -eq 0 ]; then
        log "INFO" "Git working tree is clean"
    else
        log "WARN" "Git working tree has $git_status uncommitted changes"
    fi
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

show_usage() {
    echo -e "${WHITE}Usage:${NC}"
    echo "  $0 [restore_directory]"
    echo ""
    echo -e "${WHITE}Examples:${NC}"
    echo "  $0                              # Interactive mode with default location"
    echo "  $0 ~/restored-project           # Restore to specific directory"
    echo "  $0 /tmp/test-restore             # Restore to temporary location"
    echo ""
    echo -e "${WHITE}Options:${NC}"
    echo "  -h, --help                      # Show this help message"
    echo ""
}

main() {
    # Handle command line arguments
    case "${1:-}" in
        -h|--help)
            show_header
            show_usage
            exit 0
            ;;
    esac

    show_header

    # Environment validation
    validate_backup_environment

    # List and select backup
    local backup_list=$(list_available_backups)
    local selected_metadata=$(select_backup "$backup_list")

    echo ""
    show_backup_details "$selected_metadata"

    # Determine restore directory
    local default_restore_dir="$HOME/restored-$PROJECT_NAME-$(date +%Y%m%d_%H%M%S)"
    local restore_dir="${1:-$default_restore_dir}"

    echo -e "${CYAN}Restore Directory:${NC} $restore_dir"
    echo ""

    # Confirm restoration
    confirm_restoration "$restore_dir" "$selected_metadata"

    # Validate backup files
    local file_paths=$(validate_backup_files "$selected_metadata")
    IFS='|' read -r archive_path bundle_path <<< "$file_paths"

    # Get git branch info
    local info=$(get_backup_info "$selected_metadata")
    IFS='|' read -r backup_name timestamp date_human git_commit git_branch archive_size file_count <<< "$info"

    echo ""
    log "INFO" "Beginning restoration process..."

    # Perform restoration
    perform_restoration "$restore_dir" "$archive_path" "$bundle_path" "$git_branch"

    # Verify restoration
    verify_restoration "$restore_dir"

    # Success summary
    echo ""
    echo -e "${GREEN}===================================================================================${NC}"
    echo -e "${WHITE}                              RESTORATION COMPLETED                              ${NC}"
    echo -e "${GREEN}===================================================================================${NC}"
    echo -e "${GREEN}✓${NC} Project restored successfully"
    echo -e "${GREEN}✓${NC} Git history recovered"
    echo -e "${GREEN}✓${NC} All files verified"
    echo ""
    echo -e "${CYAN}Restored Location:${NC} $restore_dir"
    echo -e "${CYAN}Original Backup:${NC} $backup_name"
    echo -e "${CYAN}Git Branch:${NC} $git_branch"
    echo -e "${CYAN}Git Commit:${NC} $git_commit"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo -e "  cd \"$restore_dir\""
    echo -e "  # Continue development from restored state"
    echo -e "${GREEN}===================================================================================${NC}"

    log "SUCCESS" "Restoration completed successfully"
}

# Handle script interruption gracefully
trap 'log "WARN" "Restoration interrupted by user"; exit 130' INT TERM

# Execute main function
main "$@"