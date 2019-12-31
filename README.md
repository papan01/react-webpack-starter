# react-webpack-typescript-starter

A frontend empty shell using React、Webpack、Babel、ESlint、Jest、Enzyme。

## Directory Layout

```
root-dir
├── /dist/                          # The folder for compiled output
├── /src/                           # The source code of the application
│   ├── /components/                # React components
│   ├── /entry/                     # Webpack entry
│   └── /templates/                 # HtmlWebpackPlugin templates
├── .eslintrc
├── babel.config.js
├── jest.confing.js
├── package.json
└── webpack.config.js
```

## Usage

```
git clone https://github.com/papan01/react-webpack-typescript-starter.git YourProjectName
cd YourPorjectName
rm -rf .git # change to your repo.
npm install
# and write your code in ./src ......
```

### script

```
1. npm run test      # using enzyme with Jest to run test
2. npm run lint      # or npm run lint:fix - ESlint with airbnb、typescript、prettier
3. npm run dev       # or npm run prod - the webpack will build your application(with linting)
                       : development or production mode
4. npm run start:dev # or npm run start:prod - run webpack-dev-server(with linting)
                       : development or production mode
5. npm run clean     # remove ./dist ./node_modules package-lock.json
```
