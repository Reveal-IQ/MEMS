![Group 41](https://user-images.githubusercontent.com/8020014/179413406-5b438dbb-e8e2-46ce-9504-62cbd01f648a.png)

An Open-Source framework to enable development teams to focus efforts on achieving user facing milestone and leveraging the scafold provided by the Reveal Foundation. The Reveal Core provides API functionality required the web client application. We have provided a sample web client that can be repackaging into other forms to meet you needs.

We hope to democatrize web applications development where small teams or individuals can leverage cutting-edge technologies without the years of experities. You can expect to quickly develop an application to meet your specific needs, exactly how you or the end-user expect to use it, with some basic to intermediate knowledge of Javascript.



## Quick Setup Guide
This guide will have you up and running quickly. Use the following instruction to evaluate the framework and start your application development.

**Prerequisite:** Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

1. Create a Clone
```
git clone git@github.com:Reveal-IQ/MEMS.git
```
2. Navigate to root folder containg docker compose file. Launch docker containers
```
Mac/Windows: docker-compose --project-name MEMS up
Linux: docker compose --project-name MEMS up
```
3. Verify the following containers have launched successfully
 - **reveal/api** : Backend web application
 - **reveal/dmodb01**: MongoDB Database
 - **reveal/proxy**: NGINX Proxy
 - **reveal/web**: Web Client

> Due to bug #3. The following workaround is required

4. Manual Launch Web Client. Naviate to client root folder
```
cd client/web
```
5. Add Hostfiles

Add the following to hostfiles:
```
127.0.0.1       dev.reveal.health
```

To access hostfiles:
```
Mac: sudo nano /etc/hosts
```
6. Install and turn on [CORS Extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

7. Navigate to Client and Install Node Modules
```
npm install
```

8. Launch client as a development enviroment
```
npm run serve
```

9. Web Client will launch on localhost port 8080
10. Navigate to the webpage and begin the default setup process

### Initalize Database
Follow these instructions to initalise the MongoDB database with a root user.

1. Attach SHELL to the reveal/DMODB01 database container
2. Launch Mongo Shell
```
mongo
```
3. Select Admin Database
```
use admin
```
4. Create root database user
```
db.createUser({ user: "DBadmin", pwd: "Admin@123",  roles: ["root"]});
```
5. Insert Terminology database
6. Navigate to devop/database
7. Run command
```
npm install
```
8. Open initDB.js and customize command for DemoDB and DB Connection Type.
9. Run command
```
node initDB.js
```

## Default Setup Wizard

The Setup Wizard is required to be configured based on the implementation need. The following fields are present by default and values can be assigned to establish a test enviroment.

> - DB Configuration
>    - Hostname: DMODB01
>    - Port: 27017
>    - Username: DBadmin
>    - Password: Admin@123
>    - SSL Certificates: SKIP
> - Institute Information
>   - Insitute Name: Demo Clinic
>   - Insitute Code: DMO [Code value must be unique ]
>   - Currency:  SKIP
>   - Time Zone: SKIP
>   - Foundation Date: SKIP
>   - Institute Country: SKIP
>   - Insitute State: SKIP
>   - Institute District: SKIP
>   - Insitute Mandal: SKIP
>   - Insitute Street: SKIP
>   - Institute Upload workflow and Cost Code
>   - Workflow Logic: SKIP
>   - Cost Code: SKIP
> - User Information
>    - First Name: Administrator
>    - Last Name: Site
>    - Username: admin
>    - Password: Admin@1234
>    - Phone Number: 99886644775
>    - Email: admin@site.com


## Tooling
Reveal foundation comes with customized tooling to aid in development and testing your application.

### API Testing
The SEQUI module included within the Web Client package, provides features to test API functinality. A YML test case file is used to automate sending request packets and validating API response.

The following step enable this service for a user:
- Navigate to App_Access collection
- Create a Access Record and modify the following fields
    - Service_Code: "TESTS"
    - ID_User: <User ID>
- Log out and log in to access the new application
