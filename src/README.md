![Group 41](https://user-images.githubusercontent.com/8020014/179413406-5b438dbb-e8e2-46ce-9504-62cbd01f648a.png)

An Open-Source framework to enable development teams to focus efforts on achieving user facing milestone and leveraging the scafold provided by the Reveal Foundation. The Reveal Core provides API functionality required the web client application. We have provided a sample web client that can be repackaging into other forms to meet you needs. 

We hope to democatrize web applications development where small teams or individuals can leverage cutting-edge technologies without the years of experities. You can expect to quickly develop an application to meet your specific needs, exactly how you or the end-user expect to use it, with some basic to intermediate knowledge of Javascript. 

# Quick Setup Guide
This guide will have you up and running quickly. Use the following instruction to evaluate the framework and start your application development.

## Using Docker Compose

**Prerequisite:** Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

1. Create a Clone
    ```
    git clone git@github.com:Reveal-IQ/Reveal-Foundation.git
    ```
1. Navigate to root folder containg docker compose file. Launch docker containers
    ```
    Mac/Windows: docker-compose --project-name RevealFoundation up 
    Linux: docker compose --project-name RevealFoundation up 
    ```
1. Verify the following containers have launched successfully
    - **reveal/api** : Backend web application
    - **reveal/dmodb01**: MongoDB Database
    - **reveal/web**: Web Client

1. Add Hostfiles

    Add the following to hostfiles:
    ```
    127.0.0.1       dev.reveal.health
    ```

    To access hostfiles:
    ```
    Mac: sudo nano /etc/hosts
    Windows 11: C:\Windows\System32\Drivers\etc
    ```
1. Install and turn on [CORS Extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

1. Launch the Client
    ```
    localhost:80
    ```
1. Step through the setup wizard to initalize the server

## Initalize Database
Follow these instructions to initalise the MongoDB database with a root user. 

1. Attach SHELL to the reveal/DMODB01 database container

1. Launch Mongo Shell
    ```
    mongo
    ```
1. Select Admin Database
    ```
    use admin
    ```
1. Create root database user
    ```
    db.createUser({ user: "DBadmin", pwd: "Admin@123",  roles: ["root"]});
    ```
1. Insert Terminology database

1. Navigate to devop/database

1. Run command
    ```
    npm install
    ```
1. Open initDB.js and customize command for DemoDB and DB Connection Type.

1. Run command
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


# Developer Tools
Reveal foundation comes with customized tooling to aid in development and testing your application. 

## API Testing
The SEQUI module included within the Web Client package, provides features to test API functinality. A YML test case file is used to automate sending request packets and validating API response.

The following step enable this service for a user:
- Navigate to App_Access collection
- Create a Access Record and modify the following fields
    - Service_Code: "TESTS"
    - ID_User: <User ID>
- Log out and log in to access the new application

## Development Client Enviroment

A development enviroment of the web client can be launched manually. 

1. Naviate to client root folder
    ```
    cd client/web
    ```
1. Install Node Modules
    ```
    npm install
    ```

1. Launch client as a development enviroment
    ```
    npm run serve
    ```

## Compatibility

- Node.js: LTS Gallium / Version 16.x

# Version

- v0.2.0-Alpha
    - Integration Caddy and Webclient Launch with docker compose
    - Revise Setup Instructions
    - Full Change Log

- v0.1.1-Alpha - Change Log

- v0.1.0-Alpha - Change Log