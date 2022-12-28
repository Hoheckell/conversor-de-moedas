# Conversor de moedas

1 - Clonar do repositório 
<code> git clone git@bitbucket.org:recrutamento_jya_nodejs/recrutamento-conversor-nodejs-hoheckell.info_gmail.com.git </code>

2 - Defina um arquivo na raiz do diretório chamado .env com os seguintes valores:
    APP_PORT=3000
    SWAGGER_ROUTE=api-docs
    JWT_SECRET=XXXXX
    SALT=00
    API_KEY=XXXXXXX
    API_CONVERSION_URL='https://api.apilayer.com/currency_data/convert?'
    APP_ENV=DEV

3 - Instalar as dependências
<code>npm install</code>

4 - Rodar a aplicação
<code>npm run start:dev</code>

5 - Acessar a documentação para visualizar os endpoints
http://localhost:${APP_PORT}/api-docs

6 - Para rodar via docker na raiz do diretório, após o docker instalado na maquina execute os comandos:
<code>docker-composer up -d</code>
Volte ao passo 5

Obs. O Aqruivo src/modules/conversor/allowed-currencies.ts possui todas siglas de moedas que permitiremos as conversões

PROPÓSITO: 
Permitir ao usuário Logado: 
 - fazer a conversão de moedas 
 - registrar as conversões realizadas
 - listar as conversões realizadas

TECNOLOGIAS
 - NestJS
 Framework que aproveita muito bem o typescript, com documentação completa e boa curva de aprendizagem e de código aberto com muitos modulos específicos, orientando a um boa arquitetura, fracamente acoplado e escalável.
 - TypeOrm
 ORM que suporta muitos tipos de bancos de dados diferentes, trabalha com typescript, curva de aprendizagem boa e suporta Promises.

 CAMADAS
 - SOLID/CLEAN CODE
 Baseando me ao máximo nestes conceitos procurei separar baseado em entidades e suas funcionalidades separadas, deixando as regras de negócio na camada de serviços 
