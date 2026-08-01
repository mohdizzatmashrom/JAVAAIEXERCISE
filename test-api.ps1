$base = "http://localhost:8080"
$pass = 0
$fail = 0

function Test-Endpoint {
    param($name, $expected, $actual, $detail = "")
    if ($actual -eq $expected) {
        Write-Host "  [PASS] $name -> $actual $detail" -ForegroundColor Green
        $script:pass++
    } else {
        Write-Host "  [FAIL] $name -> expected $expected, got $actual $detail" -ForegroundColor Red
        $script:fail++
    }
}

Write-Host "`n========== 1. HEALTH CHECK (Checklist #1: Project runs) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/health" -Method GET -TimeoutSec 10
    Write-Host "  Response: $($r | ConvertTo-Json -Compress)"
    Test-Endpoint "GET /api/health" 200 200 "status=$($r.status)"
} catch { Test-Endpoint "GET /api/health" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 2. API INFO (public) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/v1/info" -Method GET -TimeoutSec 10
    Write-Host "  Response: $($r | ConvertTo-Json -Compress)"
    Test-Endpoint "GET /api/v1/info" 200 200
} catch { Test-Endpoint "GET /api/v1/info" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 3. API DOCS (Checklist #16: API documentation) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/docs" -Method GET -TimeoutSec 10
    Write-Host "  Application: $($r.applicationName), Version: $($r.version)"
    Write-Host "  Endpoints count: $($r.endpoints.Count)"
    Test-Endpoint "GET /api/docs" 200 200 "endpoints=$($r.endpoints.Count)"
} catch { Test-Endpoint "GET /api/docs" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 4. LOGIN (Checklist #11: Login returns JWT) ==========" -ForegroundColor Cyan
try {
    $body = @{ email = "admin@example.com"; password = "Admin@12345" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$base/api/auth/login" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 10
    Write-Host "  Token type: $($r.tokenType)"
    Write-Host "  Role: $($r.role)"
    Write-Host "  Token (first 50 chars): $($r.token.Substring(0,50))..."
    Test-Endpoint "POST /api/auth/login" 200 200 "role=$($r.role)"
    $script:token = $r.token
} catch { Test-Endpoint "POST /api/auth/login" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 5. PROTECTED ENDPOINT WITHOUT TOKEN (Checklist #12: Reject missing token) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets" -Method GET -TimeoutSec 10
    Test-Endpoint "GET /api/tickets (no token)" 401 200 "SHOULD HAVE BEEN 401!"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Test-Endpoint "GET /api/tickets (no token)" 401 $code
}

Write-Host "`n========== 6. PROTECTED ENDPOINT WITH TOKEN (Checklist #13: Accept valid token) ==========" -ForegroundColor Cyan
$headers = @{ Authorization = "Bearer $token" }
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Tickets returned: $($r.Count)"
    Test-Endpoint "GET /api/tickets (with token)" 200 200 "count=$($r.Count)"
    $script:ticketId = $r[0].id
    Write-Host "  Sample ticket ID: $ticketId"
} catch { Test-Endpoint "GET /api/tickets (with token)" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 7. GET TICKET BY ID (Checklist #5: CRUD - Read by ID) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets/$ticketId" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Ticket: id=$($r.id), title=$($r.title), status=$($r.status)"
    Test-Endpoint "GET /api/tickets/{id}" 200 200 "title=$($r.title)"
} catch { Test-Endpoint "GET /api/tickets/{id}" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 8. CREATE TICKET (Checklist #5: CRUD - Create) ==========" -ForegroundColor Cyan
try {
    $body = @{ title = "Test Ticket from API Test"; description = "Created during milestone review testing"; category = "Bug"; priority = "High"; createdBy = "admin@example.com" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$base/api/tickets" -Method POST -Headers $headers -Body $body -ContentType "application/json" -TimeoutSec 10
    Write-Host "  Created: id=$($r.id), title=$($r.title), status=$($r.status)"
    Test-Endpoint "POST /api/tickets" 201 201 "id=$($r.id)"
    $script:newTicketId = $r.id
} catch { Test-Endpoint "POST /api/tickets" 201 "ERR" $_.Exception.Message }

Write-Host "`n========== 9. FILTER BY STATUS (Checklist #6: Filtering) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets?status=OPEN" -Method GET -Headers $headers -TimeoutSec 10
    $allOpen = ($r | Where-Object { $_.status -ne "OPEN" }).Count -eq 0
    Write-Host "  Tickets with status=OPEN: $($r.Count), all are OPEN: $allOpen"
    Test-Endpoint "GET /api/tickets?status=OPEN" 200 200 "count=$($r.Count)"
} catch { Test-Endpoint "GET /api/tickets?status=OPEN" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 10. FILTER BY PRIORITY (Checklist #6: Filtering) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets?priority=HIGH" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Tickets with priority=HIGH: $($r.Count)"
    Test-Endpoint "GET /api/tickets?priority=HIGH" 200 200 "count=$($r.Count)"
} catch { Test-Endpoint "GET /api/tickets?priority=HIGH" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 11. FILTER BY CATEGORY (Checklist #6: Filtering) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets?category=Email" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Tickets with category=Email: $($r.Count)"
    Test-Endpoint "GET /api/tickets?category=Email" 200 200 "count=$($r.Count)"
} catch { Test-Endpoint "GET /api/tickets?category=Email" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 12. PAGINATION (Checklist #7: Pagination) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets/paged?page=0&size=3" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Page size: $($r.content.Count), totalElements: $($r.totalElements), totalPages: $($r.totalPages)"
    Test-Endpoint "GET /api/tickets/paged?page=0&size=3" 200 200 "pageContent=$($r.content.Count)/total=$($r.totalElements)"
} catch { Test-Endpoint "GET /api/tickets/paged" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 13. SORTING ASC (Checklist #8: Sorting) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets/paged?page=0&size=10&sortBy=title&direction=asc" -Method GET -Headers $headers -TimeoutSec 10
    $titles = $r.content | ForEach-Object { $_.title }
    Write-Host "  Titles (asc): $titles"
    Test-Endpoint "GET /api/tickets/paged?sortBy=title&direction=asc" 200 200
} catch { Test-Endpoint "GET /api/tickets/paged (sort asc)" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 14. SORTING DESC (Checklist #8: Sorting) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets/paged?page=0&size=10&sortBy=createdAt&direction=desc" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  First ticket (newest): $($r.content[0].title)"
    Test-Endpoint "GET /api/tickets/paged?sortBy=createdAt&direction=desc" 200 200
} catch { Test-Endpoint "GET /api/tickets/paged (sort desc)" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 15. VALIDATION ERROR (Checklist #9: Validation errors) ==========" -ForegroundColor Cyan
try {
    $body = @{ title = ""; description = ""; category = "Bug"; priority = "High"; createdBy = "admin@example.com" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$base/api/tickets" -Method POST -Headers $headers -Body $body -ContentType "application/json" -TimeoutSec 10
    Test-Endpoint "POST /api/tickets (invalid)" 400 200 "SHOULD HAVE BEEN 400!"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    $errMsg = $_.ErrorDetails.Message
    if ($errMsg) { Write-Host "  Error body: $errMsg" }
    Test-Endpoint "POST /api/tickets (invalid)" 400 $code
}

Write-Host "`n========== 16. VERSIONED ROUTE - LIST (Checklist #14: /api/v1 routes) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/v1/tickets" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  v1 tickets returned: $($r.Count)"
    Test-Endpoint "GET /api/v1/tickets" 200 200 "count=$($r.Count)"
} catch { Test-Endpoint "GET /api/v1/tickets" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 17. VERSIONED ROUTE - CREATE (Checklist #14: /api/v1 routes) ==========" -ForegroundColor Cyan
try {
    $body = @{ title = "V1 API Test Ticket"; description = "Created via versioned endpoint"; category = "Feature Request"; priority = "Low"; createdBy = "admin@example.com" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "$base/api/v1/tickets" -Method POST -Headers $headers -Body $body -ContentType "application/json" -TimeoutSec 10
    Write-Host "  Created via v1: id=$($r.id), title=$($r.title)"
    Test-Endpoint "POST /api/v1/tickets" 201 201
} catch { Test-Endpoint "POST /api/v1/tickets" 201 "ERR" $_.Exception.Message }

Write-Host "`n========== 18. REPORT BY STATUS (Checklist #15: Report endpoint) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/v1/reports/tickets-by-status" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Report data:"; $r | ForEach-Object { Write-Host "    $($_.label): $($_.count)" }
    Test-Endpoint "GET /api/v1/reports/tickets-by-status" 200 200 "groups=$($r.Count)"
} catch { Test-Endpoint "GET /api/v1/reports/tickets-by-status" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 19. REPORT BY PRIORITY (Checklist #15: Report endpoint) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/v1/reports/tickets-by-priority" -Method GET -Headers $headers -TimeoutSec 10
    Write-Host "  Report data:"; $r | ForEach-Object { Write-Host "    $($_.label): $($_.count)" }
    Test-Endpoint "GET /api/v1/reports/tickets-by-priority" 200 200 "groups=$($r.Count)"
} catch { Test-Endpoint "GET /api/v1/reports/tickets-by-priority" 200 "ERR" $_.Exception.Message }

Write-Host "`n========== 20. GET TICKET BY ID - 404 (Checklist #9: Not found error) ==========" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$base/api/tickets/nonexistent12345" -Method GET -Headers $headers -TimeoutSec 10
    Test-Endpoint "GET /api/tickets/{bad-id}" 404 200 "SHOULD HAVE BEEN 404!"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Test-Endpoint "GET /api/tickets/{bad-id}" 404 $code
}

Write-Host "`n============================================================" -ForegroundColor Yellow
Write-Host "  TEST SUMMARY: $pass PASSED, $fail FAILED" -ForegroundColor Yellow
Write-Host "============================================================`n" -ForegroundColor Yellow
