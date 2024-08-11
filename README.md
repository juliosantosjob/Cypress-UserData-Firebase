# Projeto Automação de Testes Saucedemo

### Visão Geral

Este projeto automatiza os testes para a aplicação Sauce Demo, garantindo a qualidade das funcionalidades essenciais, como autenticação e gerenciamento de produtos. O objetivo é assegurar que as interações do usuário e as operações de produto funcionem corretamente e estejam livres de erros.

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

Antes de executar os testes, crie um arquivo com o nome `.env` na raiz do projeto e adicione à variável `STAGE` a base URL da aplicação [Sauce Demo](https://www.saucedemo.com/). Você pode usar o arquivo `.env.example` como referência, ele se encontra na raiz do projeto. A URL base para os testes é configurada automaticamente. Por padrão, os testes rodam no ambiente `stg`, mas você pode escolher outro ambiente, como `dev`, ajustando a variável de ambiente `ENV`.

Você também pode definir o ambiente diretamente na linha de comando ao executar os testes. Por exemplo:

```sh
cross-env ENV=dev npm test
```
ou

```sh
cross-env ENV=stg npm test
```
### Massa de dados

Os usuários do projeto estão configurados no Firebase Realtime Database para evitar hardcoding de dados de homologação no código. 

![Descrição da Imagem](docs/readme/firebase-users.png)

O projeto esta configurado para acessar o banco de dados via API usando a task cy.task('getUser', 'name_user'). Para acessar o usario basicamente você precisa te-lo criado no Realtime Database e adicionar o ID na variavel de ambiente `PROJECT_ID` do projeto no arquivo `.env`. O arquivo deve ter o seguinte formato:

Exemplo:

```
STAGING=<base url do projeto>
DEV<base url do projeto>
PROJECT_ID=<id do projeto no firebase>
DEVICE_NAME=Dell XPS 15
```

No exemplo acima, há uma variável chamada `DEVICE_NAME` que deve ser configurada com o nome do dispositivo desejado. Por exemplo, se o dispositivo for `Dell XPS 15`, o projeto será executado com um viewport de `1440x900`. Para consultar as dimensões de todos os dispositivos registrados, acesse o caminho `cypress/fixtures/screen-resolutions.json`. Essa configuração proporciona um controle mais preciso sobre as dimensões dos testes. Se necessário, também é possível ajustar o viewport diretamente pela linha de comando usando o comando `npx cypress open --config viewportWidth=1920,viewportHeight=1080`, desta forma os testes serão executados com o viewport de 1920x1080.

Realizando o passo anterior você pode executar os testes do projeto, executando o comando:

```
npm run test
```

## Reportes

O projeto foi desenvolvido com o Allure Report. Caso esteja rodando o projeto localmente, basta executar npm run allure:open, e o relatório com todas as informações da execução recém-realizada será aberto em uma nova aba do seu navegador.


Mas caso esteja visualizado o projeto no github, basta clicar  e Você pode-rá acessar o relatório da última execução da pipe do projeto.

Mas, caso esteja visualizando o projeto no GitHub, basta clicar [aqui](https://juliosantosjob.github.io/Vox-Tecnologia-Technical-Challenge), e você poderá acessar o relatório da última execução da pipeline do projeto.

### Contato

Para mais informações ou dúvidas, você entre pode entrar em contato comigo! 😉

[![Email](https://img.shields.io/badge/Email-%23D14836.svg?logo=gmail&logoColor=white)](mailto:julio958214@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/julio-santos-43428019b)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100003793058455) 
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://www.instagram.com/oficial_juliosantos/) 
[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/julio.saantos199) 

