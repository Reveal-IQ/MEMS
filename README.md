<div id="top"></div>


[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Pull Requests][pr-shield]][pr-url]
[![Latest Release][release-shield]][release-url]
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

<!-- PROJECT LOGO -->
<br />
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src= "https://user-images.githubusercontent.com/8020014/198841940-ea0dacf5-b8ab-4dce-a629-74443cdb5f86.svg" alt="Logo" height="100">
  </a>
<br />
<br />
<h3 align="center">Medical Equipment Managment System</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>

## 🎯 Goals

## 🏆 The Team

### PR Approval Commitee 

### Sprint Planning Commitee 



## ℹ️ How can you Support?
Our team of volunteers always welcomes all the help and support we can get as this project requires a wide array of expertise from software developers to UI/UX designers. If have the skillset or require more flight-hours and looking for project to sharpen your skills, we encourage you to contact us at ???

* **UI/UX Designers**
  - Create design guides for overall application theme
  - Develop application workflows
  - Design UI elements and pages.
 
* **Frontend JavaScript Developers**
  - Create Design Input Requirements (DIR) documentation
  - Develop UI elements and components using VueJs or React
  - Integrate with backend APIs using JavaScript

* **Backend NodeJs Developers**
  - Develop APIs using Nodejs and JavaScript
  - Launch Nodejs Application on Cloud services
  - Architect database schema

## Developer Guides

### Porting Reveal Foundation
The MEMS project is based on the Reveal Foundation to provide the scaffold to build on top off. This section provides instructions on how to port new releases of Reveal Foundation for use with the MEMS project.

  - Revise the name API and Client container image names (mems/api: and mems/client:) in docker-compose.yml located at /src/devop
  - Launch container using the command 
    ```
    docker-compose --project-name mems up
    ```


### Branching Strategy

MAIN -> RC04
- Change main application version number
- Version: 0.4.0 <Release>.<Release Candidate>.<Minor Changes>
  
RC04 -> Feature Branch (RC04_NewViewVendor)
  - Single contributor

 RC04 -> Bug Branch (RC04_BUG_BugName)
  -Single Contributor
  -Single Bug

 Detached Branch (TST_RC04_FeatureName) 
  - Test branch 
  - Delete Branch when testing complete
  
Pull Request
  - Feature/Bug PR (Feature Branch -> RC##)
    - UI PR - Reviewer AS + Peer
    - Backend PR - Reviewer AP
    - PR Name: RC## <Feature/Bug Name>
 
  - Release Candidate (RC) PR (RC## -> Main) 
    - Reviewed AS + AP 
    - PR Name: RC## RELEASE



## 📚 Documents
  - [User Requirements](https://1drv.ms/w/s!Aoyt_5MLLrQsi6hhpnkagfaawf1pcA?e=iVbRyr)
  - [System Architecture and Specification](https://1drv.ms/w/s!Aoyt_5MLLrQsi657RYs-5oKwFtDmcg?e=cIGSvS)
  - [Visual Designs](https://www.figma.com/file/3RZaloPTGo1Qe8rCp5Vv55/UI-Designs?node-id=0%3A1)
  - [Sprint Plan](https://1drv.ms/w/s!Aoyt_5MLLrQsi68zxO4M0fXzqS1hWg?e=FVPErk)
  - [Test Cases](https://1drv.ms/x/s!Aoyt_5MLLrQsi68Atdismmgw1tSr7g?e=knGDfZ)
  - [Doc Repo](https://1drv.ms/u/s!Aoyt_5MLLrQsi6hgaHG_8-McARe2UQ?e=BQGzPa)

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]
  
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Reveal-IQ/MEMS.svg?style=for-the-badge
[contributors-url]: https://github.com/Reveal-IQ/MEMS/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/Reveal-IQ/MEMS.svg?style=for-the-badge
[issues-url]: https://github.com/Reveal-IQ/MEMS/issues
[pr-shield]: https://img.shields.io/github/issues-pr/Reveal-IQ/MEMS.svg?style=for-the-badge
[pr-url]: https://github.com/Reveal-IQ/MEMS/pr
[release-shield]: https://img.shields.io/github/release/Reveal-IQ/MEMS.svg?display_name=tag&include_prereleases&style=for-the-badge
[release-url]: https://github.com/Reveal-IQ/MEMS/release
[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?&style=for-the-badge
