# Note Taking App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technologies Used in the Project

- **Next.js**: React-based web framework for server-side rendering and routing.
- **Convex**: Backend-as-a-service for real-time data and authentication.
- **TypeScript**: Static type checking for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI primitives (used for components like Toasts and ScrollArea).
- **Lucide React**: Icon library.
- **@convex-dev/auth**: Authentication provider integration for Convex.
- **@fontsource-variable**: Variable font support for Inter, Noto Serif, and Source Code Pro.

## Configuring the Project

1. **Environment Variables**:  
   - Set `NEXT_PUBLIC_CONVEX_URL` in your environment to your Convex deployment URL.
2. **Convex Setup**:  
   - Install Convex CLI: `npm install -g convex`
   - Initialize Convex in the project if not already done: `npx convex init`
   - Push schema and functions: `npx convex push`
3. **Fonts**:  
   - Fonts are imported via `@fontsource-variable` packages in the codebase.

## Running the Project in Development Mode

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the Next.js development server:
   ```sh
   npm run dev
   ```
3. Start the Convex dev server (in a separate terminal):
   ```sh
   npx convex dev
   ```
4. Access the app at [http://localhost:3000](http://localhost:3000).

## Deploying the Project on Vercel

1. Push your code to a Git repository (e.g., GitHub).
2. Import the repository into Vercel.
3. Set the `NEXT_PUBLIC_CONVEX_URL` environment variable in the Vercel dashboard to your Convex deployment URL.
4. Vercel will handle build and deployment automatically.
5. Ensure Convex is deployed and accessible from your Vercel deployment.

## Pitfalls to Be Aware Of

- **Environment Variables**: Missing or incorrect `NEXT_PUBLIC_CONVEX_URL` will break Convex connectivity.
- **Convex Schema Changes**: After modifying Convex schema or functions, always run `npx convex push`.
- **Authentication**: Convex authentication relies on correct provider setup; misconfiguration can prevent user login.
- **Data Consistency**: Tag and note relationships are managed via multiple tables; ensure mutations handle all related tables to avoid orphaned records.
- **Server/Client Boundaries**: Some components and hooks are server-only or client-only; incorrect usage may cause runtime errors.
- **Font Loading**: If fonts do not load, ensure `@fontsource-variable` packages are installed and imported.
