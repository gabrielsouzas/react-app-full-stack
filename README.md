# App React Full-Stack

## Estrutura do projeto

```
    react-app-full-stack/
    ├── backend/
    │   ├── node_modules/
    │   ├── src/
    │   │   ├── controllers/
    │   │   ├── middlewares/
    │   │   ├── models/
    │   │   ├── routes/
    │   │   ├── config.js
    │   │   └── server.js
    │   ├── .gitignore
    │   ├── package.json
    │   └── package-lock.json
    │
    └── frontend/
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── services/
        │   ├── App.js
        │   ├── index.js
        │   └── index.css
        ├── .gitignore
        ├── package.json
        └── package-lock.json
```

A pasta "backend" contém a lógica do servidor Node.js e a interação com o banco de dados MySQL. Dentro dela, temos os seguintes elementos:

"node_modules": pasta onde são armazenadas as dependências do projeto. Criada automaticamente quando as dependências são instaladas.
"src": pasta que contém todo o código fonte do back-end.
"controllers": pasta para armazenar os controladores que lidam com as requisições HTTP.
"models": pasta para armazenar os modelos de dados e as interações com o banco de dados.
"routes": pasta para armazenar as definições de rotas e endpoints da API.
"config.js": arquivo de configuração para armazenar informações sensíveis, como as credenciais do banco de dados.
"server.js": arquivo principal que inicia o servidor Node.js e define a lógica de roteamento.

A pasta "frontend" contém o código do aplicativo React. Dentro dela, temos os seguintes elementos:

"node_modules": pasta onde são armazenadas as dependências do projeto. Será criada automaticamente quando você instalar as dependências usando o npm.
"public": pasta onde você coloca arquivos estáticos, como o arquivo HTML principal e outros recursos públicos.
"src": pasta que contém todo o código fonte do front-end.
"components": pasta para armazenar os componentes React reutilizáveis.
"pages": pasta para armazenar as páginas do aplicativo.
"services": pasta para armazenar os serviços de comunicação com o back-end, como chamadas de API.
"App.js": componente principal que define a estrutura do aplicativo React.
"index.js": ponto de entrada do aplicativo React.
"index.css": arquivo de estilo global para o aplicativo.
Os arquivos ".gitignore", "package.json" e "package-lock.json" são arquivos necessários para o gerenciamento de versão e as dependências do projeto.
