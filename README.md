# Test task

## Getting started

For correct work, please install node js version 8.17.0

```

Start JSON Server

```bash
npm run server
```
## Routes

Based on the previous `./db/db.accounts.json` file, here are all the default routes. You can also add [other routes](#add-custom-routes) using `--routes`.

### Plural routes

```
GET    /employees
GET    /employees/1
POST   /employees
PUT    /employees/1
PATCH  /employees/1
DELETE /employees/1
```

### Singular routes

```
GET    /employees
POST   /employees
PUT    /employees
PATCH  /employees
```

### Run Bench-Test

```
npm run dev
```
