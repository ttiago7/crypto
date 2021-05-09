<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!--<a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Crypto API Rest</h3>

  <p align="center">
    Project description: API rest in NodeJS to check cryptocurrency rates
    <br />
    <a href="https://github.com/ttiago7/crypto/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/#">Coming soon</a>
    ·
    <a href="https://github.com/#">View Frontend repo</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>      
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#EER-Diagram">EER-Diagram</a></li>
  </ol>
</details>


### Built With

* NodeJS
* Express
* Sequelize
* MySQL


<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up this project locally. To get a local copy up and running follow these simple steps.

### Prerequisites

* Git
* Docker


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ttiago7/crypto.git
   ```
2. Open the command line and go to folder called backend, into this execute next command
   ```sh
   docker-compose up
   ```


<!-- USAGE EXAMPLES -->
## Usage

1. GET http://localhost:3001/currencies - Get all currencies from DB
2. POST http://localhost:3001/currencies - Post a currency if not exist
  body json to send : 
  {
      "description": "ethereum",
      "symbol": "eth"
  }

3. POST http://localhost:3001/rates - Post a rate of a existing currency (id_currency)
  body json to send : 
    {
      "id_currency": 1,
      "value": 24934.231922
  }

4. GET http://localhost:3001/rates - Get the last rate of alls currencies 
5. GET http://localhost:3001/rates/{symbol} - Get the last rate of a especific currency, example: http://localhost:3001/rates/eth


<!-- CONTACT -->
## Contact

Calizaya Santiago - [@linkedin-ttiago7](https://www.linkedin.com/in/ttiago7/) - c.ttiago7@gmail.com


<!-- ACKNOWLEDGEMENTS -->
## EER-Diagram

<img src="/mysql/crypto DB - EER Diagram.JPG" alt="My cool logo"/>
