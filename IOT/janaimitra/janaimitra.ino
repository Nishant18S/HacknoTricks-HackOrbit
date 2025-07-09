#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "Airtel_Nishant";        // Your Wi-Fi SSID (network name)
const char* password = "Nishant2003@";      // Your Wi-Fi password

const unsigned long wifiTimeout = 60000; // 60 seconds timeout
unsigned long previousMillis = 0;  // Variable to track the time

WebServer server(80);

void handleRoot() {
    server.sendHeader("Location", "https://jan-aimitra.netlify.app/digitaltech.html", true);
    server.send(302, "text/plain", "Redirecting to Jan-AI Mitra...");
}

void setup() {
    Serial.begin(115200);
    delay(1000);  // Wait for serial port to initialize
    Serial.println("Connecting to Wi-Fi...");

    WiFi.begin(ssid, password);

    unsigned long startAttemptTime = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 30000) {
        delay(1000);
        Serial.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi connected!");
        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nConnection failed. Timeout reached.");
    }

    server.on("/", handleRoot);
    server.begin();
    Serial.println("Server Started");
}

void loop() {
    server.handleClient();
}