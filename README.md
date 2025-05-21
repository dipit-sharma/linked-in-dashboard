# LinkedIn Dashboard

A LinkedIn-style dashboard built with React, showcasing job listings and profile interactions.

## Deployed App

[Click here to view the live app](https://gigsman-b447c.web.app/)

## Git Repository

[GitHub Repository](https://github.com/dipit-sharma/linked-in-dashboard)

## Getting Started

To run the project locally, follow these steps:

```bash
git clone https://github.com/dipit-sharma/linked-in-dashboard
cd linked-in-dashboard
npm install
npm start
```

## Aproach To The Problem

- Created the useFetch hook – This was implemented first to streamline API integration throughout the app. The hook returns posts, loading, and error states. Used "axios" for api calling, since its more easy to use and practical than "fetch" method.
- Designed a user interface layout – Focused on a clean and scalable layout that displays multiple posts effectively. A grid view was selected as the most suitable format. Used "fontawesome" for icons.
- Enhanced with features – After rendering the core content, additional components like filters and a search bar were incorporated to improve usability and interactivity. Added the filteration in useMemo as mentioned in assignment.
- Finally used firebase to host the react app.
