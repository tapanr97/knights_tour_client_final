FROM ubuntu:latest

RUN apt-get update 
RUN apt-get install --yes curl
RUN apt-get install --yes gnupg
RUN curl --location https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
RUN apt-get install -y --force-yes g++ make

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm","start"]