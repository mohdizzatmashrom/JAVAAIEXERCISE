# ===== Stage 1: Build =====
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml first (better layer caching)
COPY .mvn/ .mvn/
COPY mvnw mvnw.cmd ./
COPY pom.xml ./

# Download dependencies (cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src/ src/

# Build the JAR (skip tests to speed up the Docker build)
RUN ./mvnw package -DskipTests -B

# ===== Stage 2: Runtime =====
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
