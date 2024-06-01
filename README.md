# CrazyClock!
This project is to track the amount of time between two love birds meeting each other next. It brings a whole new level to clock watching!

## Technologies
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) - Frontend framework.
- [Jest](https://jestjs.io/) - Tests.
- [Vercel](https://vercel.com/) - Used to deploy the project and host the frontend, saves me having a full on web server to host it.

## Setup
Install package managers, pay attention to the .zshrc / .bashrc stuff brew tells you to add:
```bash
brew install pnpm@9 nvm
```

Runtime environment setup:
```bash
nvm install 20 && nvm use 20
```

Make sure to install the dependencies:
```bash
pnpm install
```

## Testing
Tests are developed using [Jest](https://jestjs.io/). Run tests by simply running `pnpm test`.

## Development Server
Start the development server on http://localhost:3000

```bash
pnpm dev
```

## Deployment
Deployments are handled via [Vercel](https://vercel.com/). Once code has been merged into `main` branch it will be automatically deployed.

Pull requests spin up their own environment copy for preview and approval. Check the [Deployments](https://github.com/Maelstromeous/crazyclock/deployments) section for preview environments.

