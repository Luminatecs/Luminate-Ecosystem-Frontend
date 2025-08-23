#!/bin/bash

echo "🚀 Setting up GridAccordionTable for NPM publishing..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the package
echo "🔨 Building the package..."
npm run build

echo "✅ Setup complete! Your package is ready for publishing."
echo ""
echo "Next steps:"
echo "1. Update package.json with your details (name, author, repository)"
echo "2. Log in to NPM: npm login"
echo "3. Publish: npm publish"
echo ""
echo "For scoped packages (recommended for first-time publishing):"
echo "1. Change package name to @yourusername/react-grid-accordion-table"
echo "2. Publish with: npm publish --access public"
