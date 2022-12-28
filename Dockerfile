FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN chmod -R a+x /usr/src/app/entrypoint.sh

RUN sed -i -e 's/\r$//' /usr/src/app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]