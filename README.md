# Sommerhus

A next.js booking website for our summerhouse rental.

## TODO:

- [ ] Update page name in the browser tab. 
- [x] Update landing page header to picture slider at the top (To create more attention to the house)
- [x] Update gmail API connection (If necessary)
- [x] Update calendar overview to include disabled reserved dates
- [x] Add Google Maps link to show location on map
- [x] Add proper database functionality
  - Retrieve data from mongodb ✅
  - Insert bookings into mongodb in correct format ✅
  - Delete bookings from the manage booking overview ✅
- [x] Connect admin login systemto mongodb for more secure login process
- [x] Setup environment variables for vulnerable information (usernames, passwords)
- [ ] Add loading indicators for button presses
- [x] Update website with pictures
- [ ] Add english and German translated page
- marketing possibilities for the summerhouse
- [ ] Lav en Google Virksomhedsprofil
- [ ] Reklamer i facebook grupper

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- Git
- A MongoDB database (get free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Setup

0. **Run the setup script if on LINUX/MAC**
Run the setup.sh script in the /scripts folder

1. **Clone the repository**
```bash
   git clone https://github.com/barth010may/Sommerhus.git
   cd summerhus/my-app
```

2. **Install dependencies**
```bash
   npm install --legacy-peer-deps
   npm install mongodb --legacy-peer-deps
```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
```bash
   MONGODB_URI=your_mongodb_connection_string_here
```
   
   Get your MongoDB connection string from MongoDB Atlas dashboard.

4. **Run the development server**
```bash
   npm run dev
```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Development Workflow

### Daily development
```bash
git checkout dev
# Make your changes
git add .
git commit -m "description of changes"
git push
```

### Testing before deployment
```bash
npm run build  # Make sure it builds successfully
npm run start  # Test the production build locally
```

### Deploying to staging
```bash
git checkout staging
git merge dev
git push  # Auto-deploys to Vercel preview environment
```

### Deploying to production
```bash
git checkout main
git merge staging
git push  # Auto-deploys to live site
```

## 🛠️ Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build locally
- `npm run lint` - Run linter

## 🌿 Branch Structure

- `main` - Production (live website)
- `staging` - Testing environment (Vercel preview)
- `dev` - Active development

## 📦 Tech Stack

- Next.js 15
- React 19
- MongoDB
- Vercel (hosting)

## 🔧 Troubleshooting

### Build fails with "Please define MONGODB_URI"
Make sure you've created `.env.local` with your MongoDB connection string.

### `npm install` shows peer dependency errors
Use `npm install --legacy-peer-deps` instead.

## 📞 Contact

+45 20578717
```

**Pro tips:**

1. **Keep it updated** - Whenever you add a new env variable or dependency, update the README
2. **Add a `.env.example`** file with dummy values:
```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
