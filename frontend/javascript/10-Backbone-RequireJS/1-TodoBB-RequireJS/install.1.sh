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
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs

# Install bower
echo '### Install bower globally...'
sudo npm install -g bower

# Install gulp
echo '### Install gulp globally...'
sudo npm install -g gulp

# Install sass via gem
echo '### Install sass...'
sudo gem install sass

# Install compass  via gem
echo '### Install compass...'
sudo gem install make
sudo gem install compass