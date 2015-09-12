	Lattice Buildpacks and TCP Router Demo		
-     DEMO		
	It's nice if you can choose an AWS Region that hasn’t got any other VMs in it, so that there aren’t a lot of terminated/running VMs hanging around the EC2 console

-     PREP		
- [ ] D/L and install a Lattice bundle		
- [ ] Prep a lattice.aws.tf (w/ credentials) & a sanitized lattice.aws.tf to show (w/o credentials)		
- [ ] git checkout https://github.com/menicosia/ltc-tcp-demo.git		
- [ ] git checkout https://github.com/menicosia/mysql-monitor.node.git		
	Optional, used for PWS demo.
	- [ ] cf delete mysql-monitor -f		
		Optional, but it's a better demo if none are running before `cf push`
	- [ ] cf create-service p-mysql 100mb mysql-monitor-db		
		p-mysql is for PWS-E customers only, so this only works for Pivotal employees who've requested access
- [ ] Browser windows: Lattice.cf, run.pivotal.io, EC2 console (optional)		

-     PWS DEMO		
	You're welcome to try these things out, you'll need to sign up for a free 60 day trial (no CC required)
- [ ] cd ~/workspace/mysql-monitor.node		
- [ ] cf login -a api.run.pivotal.io		
- [ ] cf marketplace		
	Demonstrate the ability for Devs to self-select from any of a number of services free and paid.
- [ ] cf services		
- [ ] cf push -n pws-db-demo		
	The `-n` flag changes it away from the default route, which may be in use.
Highlight these lines of output: urls, stack, buildpack
- [ ] http://pws-db-demo.cfapps.io/		
	Make note of the fact that it has DB credentials auto-configured
- [ ] http://run.pivotal.io/		
	Optional: Show that all of these things are available using the Web UI

-     INSTALL LATTICE	(Switch to TF terminal)	
- [ ] cd ~/bin/lattice-bundle-v0.4.0-osx		
- [ ] cat /tmp/lattice-sanitized.aws.tf		
	Show the settings that you would have set up
- [ ] tf get -update		
	This relies that you've pre-configured lattice.aws.tf
- [ ] tf apply		
- [ ] cd vagrant	(Switch to Vagrant terminal)	
- [ ] vagrant up —provider=virtualbox		
- [ ] ltc target 192.168.11.11.xip.io		
- [ ] ltc target		
- [ ] ltc create mariadb mariadb:10.0.21 --run-as-root --monitor-port 3306 --env MYSQL_ROOT_PASSWORD=passw0rd --env MYSQL_USER=marco --env MYSQL_PASSWORD=marco --env MYSQL_DATABASE=latticeDB --timeout 6m --tcp-routes 3306:3306	(Go back to presentation)	
	This will take a long time to d/l on a new cluster. There will be quite a lot of error output as MariaDB comes up: since this isn't a web app, we're specifying a monitor port to monitor the health of the service. It takes a while for MariaDB to start listening on that port.

- LATTICE DEMO		
- [ ] mysql -umarco -p -h 192.168.11.11 latticeDB		
	Note using IP address of the brain, not a hostname .xip.io b/c this isn't an HTTP route.
	- [ ] create table SampleData (K VARCHAR(20), V VARCHAR(20));	(exit mysql)	
- [ ] cd ~/workspace/ltc-tcp-demo ; emacs server.js		
- [ ] npm install		
- [ ] MariaURI='mysql://marco:marco@192.168.11.11/latticeDB' npm start		
- [ ] http://localhost:8080/write?key=MarcoNicosia		
- [ ] http://localhost:8080/write?key=JorgeGuarda		
- [ ] http://localhost:8080/	(^C)	
- [ ] ltc build-droplet TCP-DEMO nodejs		
- [ ] ltc launch-droplet tcp-demo TCP-DEMO --env MariaURI='mysql://marco:marco@192.168.11.11/latticeDB'		
- [ ] http://tcp-demo.192.168.11.11.xip.io/		
- [ ] ltc list		
- [ ] cd -		
- [ ] ltc export-droplet TCP-DEMO	(Switch to TF terminal)	
- [ ] ltc target PASTE-IP-HERE.xip.io	(RELOAD EC2 Console)	
- [ ] ltc target		
- [ ] ltc create mariadb mariadb:10.0.21 --run-as-root --monitor-port 3306 --env MYSQL_ROOT_PASSWORD=passw0rd --env MYSQL_USER=marco --env MYSQL_PASSWORD=marco --env MYSQL_DATABASE=latticeDB --timeout 6m --tcp-routes 3306:3306		
- [ ] mysql -umarco -p -h XXXX latticeDB		
	Note using IP address of the brain, not a hostname .xip.io b/c this isn't an HTTP route.
	- [ ] create table SampleData (K VARCHAR(20), V VARCHAR(20));	(exit mysql)	
- [ ] ltc import-droplet RTR-DEMO RTR-DEMO.tgz RTR-DEMO-metadata.json		
- [ ] ltc launch-droplet rtr-demo RTR-DEMO --instances 4 --env MariaURI='mysql://marco:marco@PASTE-IP-HERE/latticeDB'		
- [ ] http://rtr-demo.PASTE-IP-HERE/		
- [ ] http://rtr-demo.PASTE-IP-HERE/write?key=MarcoNicosia		
- [ ] ltc list-droplets		
- [ ] ltc list	(Switch to vagrant terminal)	
- [ ] vagrant destroy -f	(Switch to TF terminal)	
- [ ] tf destroy -force		

-     BONUS MATERIAL		
- [ ] cf curl "/v2/apps/`cf app mysql-monitor --guid`/droplet/download" --output MYSQL-MON.tgz		
- [ ] ltc import-droplet MYSQL-MON MYSQL-MON.tgz MYSQL-MON-metadata.json		
- [ ] ltc logs mysql-monitor		
- [ ] ltc launch-droplet mysql-monitor MYSQL-MON -e 'VCAP_SERVICES={"p-mysql":[{"credentials":{"uri":"mysql://marco:marco@PASTE-IP-HERE/latticeDB"}}]}'		
- [ ] cd ../aripka-pivotal/lattice-app		
- [ ] ltc build-droplet lapp-color go		
- [ ] ltc list-droplets	(Switch to X-Ray)	
- [ ] ltc lauch-droplet LAPP-C-1 lapp-color —env “COLOR_NUM=1” —instances=3	(Navigate to LAPP-1)	
- [ ] ltc launch-droplet LAPP-C-9 lapp-color —env “COLOR_NUM=9” —instances=3	(Navigate to LAPP-9)	
- [ ] ltc remove-droplet lapp-color		
- [ ] ltc list		
- [ ] ltc status LAPP-COLOR-1 		
- [ ] ltc remove LAPP-COLOR-1		
- [ ] ltc rm LAPP-COLOR-9		
- [ ] ltc remove-droplet lapp-color		
- [ ] cd ../xray		
- [ ] ltc build-droplet XRAY nodejs -t 4m		
- [ ] ltc launch-droplet xray XRAY -m 256	(Visit resultant URL)	
