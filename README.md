<!--
  Title: Turbo Vite React Express Template
  Description: If you are a developer, maybe you are doing the same thing every day. Now, you don't have to create this boilerplate code every day; you can use this repo and save your time.

Keywords: React, Typescipt, Express, Turborepo,Mono Repo, PNPM, Template, Boilerplate, Scaffolding
  Author: codernex
  -->

## How To Use This Scaffolding

#### Clone This Repo

```bash
git clone https://github.com/codernex/turbo-vite-react-express-template.git

```

- Use pnpm package manager to install

```bash
pnpm install
```

- Create Environment Variable

```bash
 cp -r .env.example .env
```

- Modify your thing in your way you like
- By default, this scaffolding uses MySQL as the database. If you want to change the default database, follow these steps:

```bash
 nano apps/api/src/orm.config.ts
```

```js
export const appDataSource = new DataSource({
  type: "mysql",
  database: sanitizedConfig.DB_NAME,
  username: sanitizedConfig.DB_USER,
  password: sanitizedConfig.DB_PASS,
  entities: [User],
  logging: false,
  synchronize: sanitizedConfig.NODE_ENV === "development",
});
```

#### If you like this repo, please give me a GitHub star.
