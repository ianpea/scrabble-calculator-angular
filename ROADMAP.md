# Scrabble Calculator Roadmap

This document contains the roadmap for this application, such as bugfixes, improvements and feature updates.

## Bugfixes/Improvements
### Frontend 
- Refactor top scores dialog to make it more customizable, reusable and easier to style.
- Lazy loading modules.

### Backend
- Browsing default backend API (localhost:<BACKEND_PORT>) should not return default Laravel page. (Fixed, 31 July 2023)




## Feature Updates
### Score Mapping Logic
- Score mapping should be loaded from backend, currently have 2 versions in Frontend and Backend. Prefer to create a database table so that score mapping can be updated instantly without downtime.
- Score mapping should load on app start, and every score mismatch error from backend.
- Refactor save score feature to cater for new database table.
