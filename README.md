# Conversor de moedas
<strong>
O APP Rodando pode ser testado em 
http://www.gygaweb.com.br/api-docs/
</strong>
<ol>
<li> - Clonar do repositório </li>
<code> git clone git@bitbucket.org:recrutamento_jya_nodejs/recrutamento-conversor-nodejs-hoheckell.info_gmail.com.git </code>

<li> - Defina um arquivo na raiz do diretório chamado .env com os seguintes valores:</li>
    <code>
    APP_PORT=3000<br/>
    SWAGGER_ROUTE=api-docs<br/>
    JWT_SECRET=XXXXX<br/>
    SALT=00<br/>
    API_KEY=XXXXXXX<br/>
    API_CONVERSION_URL='https://api.apilayer.com/currency_data/convert?'<br/>
    APP_ENV=DEV<br/>
    </code>

<li> - Instalar as dependências</li>
<code>npm install</code>

<li> - Rodar a aplicação</li>
<code>npm run start:dev</code>

<li> - Acessar a documentação para visualizar os endpoints</li>
http://localhost:${APP_PORT}/api-docs

<li> - Para rodar via docker na raiz do diretório, após o docker instalado na maquina execute os comandos:</li>
<code>docker-composer up -d</code>
Volte ao passo 5
</ol>
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

