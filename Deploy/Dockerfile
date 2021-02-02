from node
COPY . /tmp/spa
RUN cd /tmp/spa && yarn install --frozen-lockfile 
RUN cd /tmp/spa && yarn build
RUN cd /tmp/spa/Deploy && yarn install --frozen-lockfile
RUN cp -R /tmp/spa/Deploy /app
RUN cp -R /tmp/spa/dist /app/dist
RUN rm -rf /tmp/spa
EXPOSE 8080
CMD ["node","/app/index.js"]
