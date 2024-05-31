/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3030;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
};
export const slidevFiles = {
  'slides.md': {
    file: {
      contents: `
# Hello Slidev

---

## Slide 2

---

## Slide 3
      `
    }
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "example-app",
          "type": "module",
          "dependencies": {
            "@slidev/cli": "^0.49.2",
            "@slidev/theme-default": "^0.25.0"
          },
          "scripts": {
            "start": "slidev"
          }
        }`,
    },
  },
};

