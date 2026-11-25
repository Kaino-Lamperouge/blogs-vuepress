#!/usr/bin/env sh
# 兼容旧用法：实际逻辑在 scripts/deploy-gh.mjs（跨平台）
set -e
cd "$(dirname "$0")/.."
exec node scripts/deploy-gh.mjs "$@"
