package com.example.urlshortener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UrlShortenerController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    @Autowired
    private ClickAnalyticsRepository analyticsRepository;

    @PostMapping("/shorten")
    public ResponseEntity<Map<String, String>> shortenUrl(@RequestBody Map<String, String> request) {
        String originalUrl = request.get("url");
        if (originalUrl == null || originalUrl.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "URL is required");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            Url url = urlShortenerService.shortenUrl(originalUrl.trim());
            Map<String, String> response = new HashMap<>();
            response.put("shortUrl", "http://localhost:8080/" + url.getShortCode());
            response.put("originalUrl", url.getOriginalUrl());
            response.put("shortCode", url.getShortCode());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginal(@PathVariable String shortCode, HttpServletRequest request) {
        Optional<Url> urlOpt = urlShortenerService.getUrlByShortCode(shortCode);
        if (urlOpt.isPresent()) {
            Url url = urlOpt.get();
            String ipAddress = getClientIpAddress(request);
            String userAgent = request.getHeader("User-Agent");
            String referrer = request.getHeader("Referer");

            urlShortenerService.recordClick(url, ipAddress, userAgent, referrer);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", url.getOriginalUrl());
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/analytics/{shortCode}")
    public ResponseEntity<Map<String, Object>> getAnalytics(@PathVariable String shortCode) {
        Optional<Url> urlOpt = urlShortenerService.getUrlByShortCode(shortCode);
        if (urlOpt.isPresent()) {
            Url url = urlOpt.get();
            List<ClickAnalytics> clicks = analyticsRepository.findByUrlId(url.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("shortCode", shortCode);
            response.put("originalUrl", url.getOriginalUrl());
            response.put("totalClicks", url.getClickCount());
            response.put("createdAt", url.getCreatedAt());
            response.put("clicks", clicks);

            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Short code not found");
            return ResponseEntity.notFound().build();
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}