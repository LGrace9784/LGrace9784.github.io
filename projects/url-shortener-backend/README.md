# URL Shortener Service

A backend service built with Spring Boot that allows users to shorten URLs and track click analytics.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Click Tracking**: Monitor how many times each shortened URL is clicked
- **Analytics**: Detailed click analytics including IP address, user agent, referrer, and timestamp
- **RESTful API**: Clean REST endpoints for all operations
- **H2 Database**: In-memory database for development (easily switchable to production databases)

## Technologies Used

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database**
- **Maven**

## API Endpoints

### Shorten URL
```
POST /api/shorten
Content-Type: application/json

{
  "url": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

Response:
```json
{
  "shortUrl": "http://localhost:8080/AbCdEf",
  "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
  "shortCode": "AbCdEf"
}
```

### Redirect to Original URL
```
GET /{shortCode}
```
Redirects to the original URL and records the click.

### Get Analytics
```
GET /api/analytics/{shortCode}
```

Response:
```json
{
  "shortCode": "AbCdEf",
  "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
  "totalClicks": 42,
  "createdAt": "2024-01-01T12:00:00",
  "clicks": [
    {
      "id": 1,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "referrer": "https://google.com",
      "clickedAt": "2024-01-01T12:30:00"
    }
  ]
}
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Running the Application

1. Clone or download the project
2. Navigate to the project directory
3. Run with Maven:
   ```bash
   mvn spring-boot:run
   ```
4. The application will start on `http://localhost:8080`

### Testing the API

You can test the API using tools like:
- **Postman**
- **curl**
- **Thunder Client** (VS Code extension)

Example curl commands:

```bash
# Shorten a URL
curl -X POST http://localhost:8080/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'

# Access shortened URL (will redirect)
curl -L http://localhost:8080/AbCdEf

# Get analytics
curl http://localhost:8080/api/analytics/AbCdEf
```

### H2 Database Console

Access the H2 console at: `http://localhost:8080/h2-console`

- **JDBC URL**: `jdbc:h2:mem:urlshortener`
- **Username**: `sa`
- **Password**: `password`

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/urlshortener/
│   │       ├── UrlShortenerApplication.java
│   │       ├── Url.java
│   │       ├── ClickAnalytics.java
│   │       ├── UrlRepository.java
│   │       ├── ClickAnalyticsRepository.java
│   │       ├── UrlShortenerService.java
│   │       └── UrlShortenerController.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/
        └── com/example/urlshortener/
            └── UrlShortenerApplicationTests.java
```

## Future Enhancements

- User authentication and personalized URL management
- Custom short codes
- URL expiration
- Rate limiting
- QR code generation
- Bulk URL shortening
- Integration with Redis for caching
- Switch to PostgreSQL/MySQL for production

## License

This project is open source and available under the [MIT License](LICENSE).