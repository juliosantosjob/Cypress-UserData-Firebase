# Projeto Automação de Testes Saucedemo

### Visão Geral

Este projeto automatiza testes para a aplicação Sauce Demo, focando nas funcionalidades de autenticação e gerenciamento de produtos.

## Instalação e Configuração

### Pré-requisitos 

Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [Node.js.](https://nodejs.org/)

### Instalação

1. Clone este repositório e navegue até o diretório do projeto:
```
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

2. Instale as dependências do projeto executando o seguinte comando:

```
 npm install
```

### Executando os Testes

Antes de executar os testes, crie um arquivo chamado `.env` na raiz do projeto e adicione a URL da aplicação [Sauce Demo](https://www.saucedemo.com/). Você pode usar o arquivo `.env.example` como referência ele se encontra na raiz do projeto.

Os usuários do projeto estão configurados no Firebase Realtime Database para evitar hardcoding de dados de homologação no código. 

![Descrição da Imagem](docs/readme/firebase-users.png)

Configurei o projeto para acessar o banco de dados via API usando a task cy.getUser('name_user'). Basicamente, você precisa criar os usuários no Realtime Database e adicionar o ID do projeto no arquivo `.env`. O arquivo deve ter o seguinte formato:

Exemplo:

```
BASE_URL=https://www.urlProject.com
PROJECT_ID=id-project
```

Realizando o passo anterior você pode executar os testes do projeto, executando o comando:

```
npm run test
```

## Reportes

O projeto foi desenvolvido com o Allure Report. Caso esteja rodando o projeto localmente, basta executar npm run allure:open, e o relatório com todas as informações da execução recém-realizada será aberto em uma nova aba do seu navegador.


Mas caso esteja visualizado o projeto no github, basta clicar  e Você pode-rá acessar o relatório da última execução da pipe do projeto.

Mas, caso esteja visualizando o projeto no GitHub, basta clicar [aqui](https://juliosantosjob.github.io/Vox-Tecnologia-Technical-Challenge), e você poderá acessar o relatório da última execução da pipeline do projeto.

### Contato

Para mais informações ou dúvidas, você entre em contato comigo :)

 [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/julio-santos-43428019b)
 [<img src = "https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white">](https://www.instagram.com/juli0sts/)
 [<img src = "https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white">](https://www.facebook.com/profile.php?id=100003793058455)
<a href="mailto:julio958214@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank">
  </a> 

