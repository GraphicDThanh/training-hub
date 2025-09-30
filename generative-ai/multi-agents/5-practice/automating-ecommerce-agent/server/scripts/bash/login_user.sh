#!/bin/bash

# Credentials
EMAIL="thanh.nguyen@asnet.com.vn"
PASSWORD="abcABC@123"

# Login request
RESPONSE=$(curl -s -X POST http://127.0.0.1:8080/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")

# Extract access token using jq
ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.data.session.access_token')

# Export as environment variable
export TEST_USER_ACCESS_TOKEN="$ACCESS_TOKEN"

# Output the token
echo "Access token for user stored in environment variable: \$TEST_USER_ACCESS_TOKEN"
echo "Token: "
echo $TEST_USER_ACCESS_TOKEN