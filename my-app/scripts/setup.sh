#!/bin/bash
   echo "🏠 Setting up Summer House project..."
   npm install --legacy-peer-deps
   npm install mongodb --legacy-peer-deps
   
   if [ ! -f .env.local ]; then
       echo "📝 Creating .env.local from example..."
       cp .env.example .env.local
       echo "⚠️  Don't forget to add your MongoDB URI to .env.local!"
   fi
   
   echo "✅ Setup complete! Run 'npm run dev' to start."