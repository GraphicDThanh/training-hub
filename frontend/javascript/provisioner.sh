@@ -6,8 +6,8 @@ printf "Updating Box..."
 # make sure the box is fully up to date
 apt-get update
 
-# uncomment the line below to allow the system to upgrade
-#apt-get upgrade -y && apt-get dist-upgrade -y
+# comment out the line below to disallow the system to upgrade
+apt-get upgrade -y && apt-get dist-upgrade -y
 
 printf "Adding MongoDB packages to apt..."
 # import the public key used by apt
 @@ -21,7 +21,13 @@ apt-get update
 
 printf "Installing a few necessary packages..."
 # install required packages
-apt-get install -y git npm mongodb-org redis-server
+apt-get install -y git nodejs nodejs-legacy npm mongodb-org redis-server
+
+# make sure npm is up to date
+npm install -g npm
+
+# remove old hash for npm so bash will find the new version
+hash -d npm
 
 # backup mongodb-org config file
 cp /etc/mongod.conf /etc/mongod.conf.backup
 @@ -75,5 +81,6 @@ cp /home/vagrant/.bashrc /home/vagrant/.bashrc.backup
 # if you don't want npm overridden, comment out the line below
 echo "alias npm='npm --no-bin-links'" >> /home/vagrant/.bashrc
 
+printf "Making sure ownership rights are correct in vagrant user directory..."
 # make sure everything in the vagrant directory is owned by vagrant
 chown -R vagrant:vagrant /home/vagrant --quiet