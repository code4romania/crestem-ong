FROM maven:3.8.5-openjdk-17-slim AS build
ADD . /crestem-ong
RUN mvn -ntp -f /crestem-ong/pom.xml clean package -DskipTests
RUN rm -rf /crestem-ong/frontend

FROM openjdk:17-alpine
RUN mkdir /opt/app
COPY --from=build /crestem-ong/backend/target/backend.jar /opt/app

EXPOSE 8080
CMD ["java", "-jar", "/opt/app/backend.jar"]