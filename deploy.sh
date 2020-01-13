git pull origin master
docker build -t mongo-node:latest .
# docker push mongo-node:latest

# docker pull mongo-node:latest
docker stop mongo-node-frontend && docker rm mongo-node-frontend
docker run --name mongo-node-frontend -p 3221:3001 -d mongo-node:latest

