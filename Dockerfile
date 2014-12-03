FROM node:0.10.33

RUN apt-get install -y -q wget
RUN npm install pm2 -g

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install --unsafe-perm

EXPOSE 3000
CMD [ "pm2", "start", "--no-daemon", "/usr/src/app/index.js" ]
