# Portfolio Website

This is a Portfolio Website created using Astro.js with plain old good SCSS/CSS 

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Prerequisites
To build/run this project locally, nvm, npm and Node v18+ are required.

- If not already installed, install nvm on your machine from [here](https://github.com/nvm-sh/nvm). You can check whether nvm is installed in your terminal with `nvm -v`.
- If it is not already the standard-version - install Node v18 with `nvm install 18`. You can check whether the right Node version is selected with `node -v`. If a different Node version is selected, use `nvm use 18`.
- Navigate to the project folder in your terminal and install project dependencies with `npm install`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

  
## Hosting
This project is currently hosted on [Netlify](https://www.netlify.com/), which is ideal to use [Netlify Serverless Functions](https://www.netlify.com/platform/core/functions/) to send E-Mails via Sendgrid.

## 💻 Technologies

### Tech-Stack

- [Astro.js](https://astro.build/)
  

### Dependencies

- [Sendgrid/Mail](https://sendgrid.com/en-us)
- [SCSS/SASS](https://sass-lang.com/)
