# Creștem ONG

[![GitHub contributors][ico-contributors]][link-contributors]
[![GitHub last commit][ico-last-commit]][link-last-commit]
[![License: MPL 2.0][ico-license]][link-license]

Crestem ONG project consists of 3 modules:
- api - openapi yaml specification files. Used by both be&fe 
- backend - Spring Boot application that implements the api
- frontend - Next.js application

[See the project live][link-production]

An evaluation and e-learning web platform that allows NGOs access to free resources and personalized mentoring

[Contributing](#contributing) | [Built with](#built-with) | [Repos and projects](#repos-and-projects) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code for Romania](#about-code-for-romania)

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project][link-contributing]. If you want to make any change to this repository, please **make a fork first**.

If you would like to suggest new functionality, open an Issue and mark it as a __[Feature request]__. Please be specific about why you think this functionality will be of use. If you can, please include some visual description of what you would like the UI to look like, if you are suggesting new UI elements.

## Built With

### Programming languages
- Java
- React

### Platforms

### Frontend framework

### Package managers

### Database technology & provider

## Repos and projects

![image]()

## Deployment
### Without Docker
In order to get the code up and running on your own system proceed as follows:
1. Make sure you have these installed: JDK 17+, Node 18.12.1+, Maven 3.8.5+, MySQL 8.0.31+ (or use the one from provided docker-compose.yaml)
2. Go to root folder (crestem-ong) and issue the following command `mvn clean install`
3. Import the project as Maven project in your favourite IDE (IntelliJ recommended)
4. Make sure you have a MySQL server instance running on localhost and port 3306
5. Start the backend application by running the `org.crestemong.backend.Application.main()` method from `backend` module (IntelliJ creates the run config for you when you first run it)
6. Start the frontend application by running the `dev` script from `package.json` file located in `frontend` module
7. Access the application on `localhost:3000`

### With Docker
In order to get the app up and running with Docker proceed as follows:
1. Make sure you have these installed: Docker 20.10.17+, docker-compose 2.2.3+ 
2. Go to root folder (crestem-ong) and issue the following command `docker build -t crestem-ong-frontend -f frontend.Dockerfile .` to build the frontend image
3. Go to root folder (crestem-ong) and issue the following command `docker build -t crestem-ong-backend -f backend.Dockerfile .` to build the backend image
4. From the same root folder issue the command `docker-compose up` to run the applicaiton
5. Access the application on `localhost:3000`

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code for Romania

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of around 2.000 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site][link-code4] or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here][link-donate].


[ico-contributors]: https://img.shields.io/github/contributors/code4romania/crestem-ong.svg?style=for-the-badge
[ico-last-commit]: https://img.shields.io/github/last-commit/code4romania/crestem-ong.svg?style=for-the-badge
[ico-license]: https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge

[link-contributors]: https://github.com/code4romania/crestem-ong/graphs/contributors
[link-last-commit]: https://github.com/code4romania/crestem-ong/commits/main
[link-license]: https://opensource.org/licenses/MPL-2.0
[link-contributing]: https://github.com/code4romania/.github/blob/main/CONTRIBUTING.md

[link-production]: insert_link_here

[link-code4]: https://code4.ro/en/
[link-donate]: https://code4.ro/en/donate/
