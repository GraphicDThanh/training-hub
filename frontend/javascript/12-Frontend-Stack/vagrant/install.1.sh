#!/usr/bin/env bash

# Update system
echo '### Updating system...'
sudo apt-get update -y
echo '### Install curl...'
sudo apt-get install -y curl
echo '### Install git...'
sudo apt-get install -y git

# Install nodejs
echo '### Install nodejs and npm...'
# Note the new setup script name for Node.js v0.12
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install -y nodejs

# Update npm
echo '### Update npm'
sudo npm install -g npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

# Install bower
echo '### Install bower globally...'
sudo npm install -g bower

# Install gulp
echo '### Install gulp globally...'
sudo npm install -g gulp

# Install sass via gem
echo '### Install sass...'
sudo gem install sass