#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_DIR="$ROOT/.deploy"

echo "=== Building all apps ==="

echo "→ Building portfolio..."
cd "$ROOT/apps/portfolio" && npm run build

echo "→ Building ICP Qualifier..."
cd "$ROOT/apps/icp-qualifier" && npm run build

echo "→ Building Mastermind Landing..."
cd "$ROOT/site" && npm run build

echo "=== Assembling deploy directory ==="
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/site" "$DEPLOY_DIR/icp-qualifier"

# Portfolio goes to root
cp -r "$ROOT/apps/portfolio/dist/"* "$DEPLOY_DIR/"

# Mastermind Landing goes to /site/
cp -r "$ROOT/site/dist/"* "$DEPLOY_DIR/site/"

# ICP Qualifier goes to /icp-qualifier/
cp -r "$ROOT/apps/icp-qualifier/dist/"* "$DEPLOY_DIR/icp-qualifier/"

# Copy Mastermind images if they exist
if [ -d "$ROOT/site/public/images" ]; then
  mkdir -p "$DEPLOY_DIR/site/images"
  cp -r "$ROOT/site/public/images/"* "$DEPLOY_DIR/site/images/"
fi

# Add .nojekyll to prevent GitHub Pages from ignoring underscore-prefixed files
touch "$DEPLOY_DIR/.nojekyll"

echo "=== Deploying to GitHub Pages ==="
cd "$ROOT/apps/portfolio" && npx gh-pages -d "$DEPLOY_DIR" --dotfiles

echo "=== Done! ==="
echo "Portfolio: https://monkskoala.github.io/caio-sandbox/"
echo "ICP Qualifier: https://monkskoala.github.io/caio-sandbox/icp-qualifier/"
echo "Mastermind: https://monkskoala.github.io/caio-sandbox/site/"
