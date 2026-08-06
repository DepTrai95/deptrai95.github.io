---
image: ./images/recipe-book.png
title: Recipe Book
description: Personal Vue 3 recipe management app with Firebase and Cloudflare image storage
href: /projects/recipe-book
url: ''
stack:
  - Vue.js
  - Pinia
  - Firebase
  - Cloudflare Worker
  - Cloudflare R2
---

A Vue 3 recipe management app built for personal use. Authentication, data storage, and hosting run on Firebase (Auth, Firestore, Hosting), while images are handled through a Cloudflare Worker backed by R2 object storage.

Recipes can include an optional `additionalInformation` field for expert notes, preparation variants, professional tips, or alternative baking and cooking methods that sit outside the main step-by-step instructions.

The UI is written with custom CSS/SCSS and does not rely on a UI library. The app is already in use, with further improvements planned over time.
