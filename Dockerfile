FROM node:latest
LABEL description="mongo node api example"

ADD ./ /app
WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
