# Tic-Tac-Toe

A responsive two-player Tic-Tac-Toe game built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Two-player, turn-based gameplay with win and draw detection
- Winning-cell highlights and a celebratory message with confetti
- Match scoring, round restart, undo, and full score reset
- Selectable development-language badges for each player; duplicate selections are disabled
- Responsive desktop and mobile layouts with keyboard-accessible controls
- Reduced-motion support

## Getting started

### Requirements

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

## How to play

1. Player One starts. Choose different language badges for each player using **Choose your language icons**.
2. Take turns selecting an empty square.
3. Get three matching marks in a row, column, or diagonal to win the round.
4. Use **Undo** to take back the last move, **Play again** or **Restart** for another round, or **Reset match** to clear the scores.

## Project structure

```text
app/          Next.js App Router page, layout, and global styles
components/   Interactive game interface
lib/          Game rules and winner detection
public/       Static assets
```

## Deployment

The project can be deployed on Vercel. Import the GitHub repository in the Vercel dashboard, or use the Vercel CLI from the project directory:

```bash
npx vercel
```

The CLI will guide you through linking the project and creating a deployment.
