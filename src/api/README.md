# Read Me - Reveal Core Unit #
On the server the Reveal platform is build on the Reveal Core Units (RCU), which is composed of several units that handle requests from the client. The current version of the architecture is 

All RCU are required to have the following modules.

- **Request Handler (HU) Module -** Responsible for managing all the communications between the client and the server. This also includes securing any messages being transferred through the public. This includes maintaining HTTPS connection , and compiling a unique shared key for each client.
- **Microservice Worker (MW) Module -** All requests that attempt to make changes or read from the database shall be processed by this module. 
- **Status Manager (SM) Module-** Transition requests from the client are processed by this module
- **Logger (LG) Module -** All info, warning, and error logs are send to the LG module to log. In addition, the system status is logged.

## Deployment Instructions
- [ ] Check...

## 📚 Documentation
A library of documents that define the RCU, including technical specification, database schema and release notes. The following are links to the highlevel folder structure:
- [RCU Release Notes](https://revealhealth.sharepoint.com/:f:/s/RevealCoreUnit/EqdLVSQ7TBtElRcD9kTJ368Bg_AgVUr0udzapijh53PTcQ?e=dSTAF9)
- [Architecture and Database Definition](https://revealhealth.sharepoint.com/:f:/s/RevealCoreUnit/ElsV8t5nRQdOm41c7A672MoB00rwjt_RA5cR5c8o5JIZkQ?e=RHa2He)
- [Specifications](https://revealhealth.sharepoint.com/:f:/s/RevealCoreUnit/EqQHnl--dd5DgoqYbuRjvBABnew0C8ypcxZ_JWK3RwKVrA?e=lTs6ny)


---
<sup> Reveal IQ Ltd - 2020 </sup>
