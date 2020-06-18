#!/bin/bash

# Set deployment variables
TARGET_USER=ubuntu
TARGET_HOST=ec2-3-21-34-136.us-east-2.compute.amazonaws.com

deployname='bc-api-cd'

echo "Building .env file..."
cp .env.deploy .env.production
sed -i "s/@@PORT@@/${DEV_PORT}/g" .env.production
sed -i "s/@@JWT_SECRET@@/${DEV_JWT_SECRET}/g" .env.production
sed -i "s/@@JWT_EXPIRATION_MINUTES@@/${DEV_JWT_EXPIRATION_MINUTES}/g" .env.production
sed -i "s/@@MYSQL_HOST@@/${DEV_MYSQL_HOST}/g" .env.production
sed -i "s/@@MYSQL_USER@@/${DEV_MYSQL_USER}/g" .env.production
sed -i "s/@@MYSQL_PASSWORD@@/${DEV_MYSQL_PASSWORD}/g" .env.production
sed -i "s/@@MYSQL_PORT@@/${DEV_MYSQL_PORT}/g" .env.production
sed -i "s/@@MYSQL_DATABASE_BC@@/${DEV_MYSQL_DATABASE_BC}/g" .env.production
sed -i "s/@@MYSQL_DATABASE_SURVEY@@/${DEV_MYSQL_DATABASE_SURVEY}/g" .env.production
sed -i "s/@@MAIL_USER@@/${DEV_MAIL_USER}/g" .env.production
sed -i "s/@@MAIL_PASSWORD@@/${DEV_MAIL_PASSWORD}/g" .env.production
sed -i "s/@@BASIC_AUTH_PASS@@/${DEV_BASIC_AUTH_PASS}/g" .env.production

# Remote Install Commands
RemoteCommands=(
  # First delete directory if exists
  "echo '- Removing potentially existing directory on host..'"
  "rm -Rf ~/${deployname}"

  # First name sure directory exists
  "echo '- Creating deployment directory...'"
  "mkdir -p ~/${deployname}"

  # Now extract from STDIN
  "echo '- Extracting deployment on host...'"
  "tar -xzf - -C ~/${deployname}/"

  "echo '- Running migrations...'"
  "cd ~/${deployname}/ && NODE_ENV=production npm run migrate"

  "echo '- Killing old version of the api...'"
  "~/${deployname}/node_modules/.bin/pm2 delete api"

  "echo '- Starting new version of the api...'"
  "cd ~/${deployname}/ && npm run start-prod"
)

# Join array of RemoteCommands to a semicolon separated string
function join_by { local IFS="$1"; shift; echo "$*"; }
REMOTE_COMMANDS=$(join_by \; "${RemoteCommands[@]}")

echo "Deploying to ${TARGET_HOST}..."

tar -zcf - --exclude .git . | \
ssh -o 'StrictHostKeyChecking no' ${TARGET_USER}@${TARGET_HOST} ${REMOTE_COMMANDS}

echo "Development Deployment Completed."
