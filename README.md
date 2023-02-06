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
    Version 0.2.0-Alpha
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


## Release Management

### Verioning
The product shall follow [Semantic Versioning](https://semver.org/)

Given a version number `<MAJOR>.<MINOR>.<PATCH>`, increment the:
- MAJOR version when you make incompatible API changes
- MINOR version when you add functionality in a backwards compatible manner
- PATCH version when you make backwards compatible bug fixes


## Branching Strategy

The following branching strategy will provide ease to developers working on this code base.

### Development Branch
The development branch signifies the bleeding edge of the product. As such, this is the branch to base features and bugfix branches from.


Release branch format: `develop`

NOTE: The development branch will be a protected branch. As such, you will only be able to merge pull-requests to it.

### Feature Branches
Feature branches are used for changing the functionality of the product. This includes adding capabilities, optimizing existing data flows, or refactoring.

Feature branch format: `feature/<ISSUE_ID>/<description>`

For example:
```bash
git checkout -b feature/64/new-branching-strategy
```

### Bugfix Branches
Bugfix branches are used to fix an issue in the product. The bug branch will typically be based off the develop or release branches.

Bugfix branch format: `bugfix/<ISSUE_ID>/<description>`

For example:
```bash
git checkout -b bugfix/22/request-id-unknown-in-respon
```

### Release Branches
Release branches are long lived-branches that reflect the state of the product at ehe end of a milestone.

Release branch format: `release/<MAJOR>.<MINOR>`

> NOTE: The PATCH version is not included in the release branch naming as bugfixes in this release branch will correspond to an increment in the patch version numbering.

For example:
```bash
git checkout -b release/0.1
```

These releases are important to maintain when bug-fixes are needed for particular deployments that can't easily upgrade to the newest version.

**Cutting a Release**
Once a milestone has been reached, the latest release branch should be created from the `develop` branch.

If any bugs arise in the release branch, bugfixes should go to the release branch first.
Once the bug fix is merged to the release branch, it can be cherry-picked back to the develop branch.

### Main Branch
The main branch should point to the latest release once it has been tested thoroughly.

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
