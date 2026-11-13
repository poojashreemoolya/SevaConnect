# SevaConnect – API Contract
## Backend and Frontend Integration Agreement

**Project:** SevaConnect  
**Location:** Dakshina Kannada, Karnataka  
**Backend:** Python + Flask  
**Database:** SQLite  
**Frontend:** React + Vite  
**API format:** JSON  
**Backend base URL:** http://127.0.0.1:5000

This document defines how the frontend communicates with the backend.

All team members must follow the exact endpoint names and JSON field names described here.

---

## 1. Common API Response Format

All successful API responses must follow a consistent structure.

### Successful response

```json
{
  "success": true,
  "data": [],
  "message": "Data retrieved successfully"
}
```

For a single record, `data` will contain an object instead of an array.

### Error response

```json
{
  "success": false,
  "data": null,
  "message": "Requested record not found"
}
```

Use appropriate HTTP status codes, such as 200 for success, 404 for missing records and 500 for server errors.

---

## 2. Government Services API

**Responsible frontend developer: Member 2**

### Endpoint 1: Get all services

```http
GET /api/services
```

Example:

```http
GET /api/services?search=income
```

Supported filters:
- `search` – search by service name.
- `category` – filter by service category.

### Endpoint 2: Get one service

```http
GET /api/services/1
```

### Service JSON structure

Every service must follow these exact field names:

```json
{
  "id": 1,
  "name": "Income Certificate",
  "category": "Certificates",
  "description": "Information about the service.",
  "eligibility": "Refer to official eligibility conditions.",
  "required_documents": [
    "Document 1",
    "Document 2"
  ],
  "application_steps": [
    "Step 1",
    "Step 2"
  ],
  "application_mode": "Online",
  "official_url": null,
  "department": "Relevant Department",
  "source_url": null,
  "last_verified": "2026-11-13"
}
```

Field descriptions:

| Field | Data type |
|---|---|
| id | Integer |
| name | String |
| category | String |
| description | String |
| eligibility | String |
| required_documents | Array of strings |
| application_steps | Array of strings |
| application_mode | String |
| official_url | String or null |
| department | String |
| source_url | String or null |
| last_verified | Date string |

Allowed `application_mode` values:
- Online
- Offline
- Both
- Unknown

---

## 3. Local Government Offices API

**Responsible frontend developer: Member 4**

### Endpoint: Get all offices

```http
GET /api/offices
```

### Filter by taluk

```http
GET /api/offices?taluk=Puttur
```

Supported filters:
- `taluk` – filter by taluk.
- `search` – search by office name.

### Office JSON structure

```json
{
  "id": 1,
  "office_name": "Example Government Office",
  "taluk": "Puttur",
  "address": null,
  "contact_number": null,
  "services_handled": [
    "Service 1",
    "Service 2"
  ],
  "official_url": null,
  "source_url": null,
  "last_verified": "2026-11-13"
}
```

Field descriptions:

| Field | Data type |
|---|---|
| id | Integer |
| office_name | String |
| taluk | String |
| address | String or null |
| contact_number | String or null |
| services_handled | Array of strings |
| official_url | String or null |
| source_url | String or null |
| last_verified | Date string |

Supported Dakshina Kannada taluks:
- Mangaluru
- Bantwal
- Puttur
- Sullia
- Belthangady
- Kadaba
- Moodabidri

The database must support adding offices from all seven taluks.

---

## 4. Public Announcements API

**Responsible frontend developer: Member 4**

### Endpoint: Get announcements

```http
GET /api/announcements
```

Optional filter:

```http
GET /api/announcements?status=current
```

### Announcement JSON structure

```json
{
  "id": 1,
  "title": "Example Public Announcement",
  "description": "Short announcement description.",
  "published_date": "2026-11-13",
  "deadline": null,
  "official_url": null,
  "source_url": null,
  "status": "current",
  "last_verified": "2026-11-13"
}
```

Field descriptions:

| Field | Data type |
|---|---|
| id | Integer |
| title | String |
| description | String |
| published_date | Date string |
| deadline | Date string or null |
| official_url | String or null |
| source_url | String or null |
| status | String |
| last_verified | Date string |

Allowed status values:
- current
- expired

Only verified announcements should be displayed as official information.

---

## 5. Backend Health API

**Responsible developer: Member 3**

### Endpoint

```http
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "running"
  },
  "message": "SevaConnect backend is running"
}
```

This endpoint will be used to check whether React can communicate with Flask.

---

## 6. Important Integration Rules

1. Use the exact field names defined in this document.
2. All API responses must be JSON.
3. Store lists such as documents and services handled as arrays in API responses.
4. Use `null` when verified information is unavailable. Never invent it.
5. Dates must use `YYYY-MM-DD` format.
6. Official links must be verified before being included.
7. The frontend must use the backend API instead of creating unrelated hardcoded datasets.
8. The backend base URL for local development is `http://127.0.0.1:5000`.
9. Enable Flask-CORS.
10. Inform Member 3 before requesting changes to the agreed API structure.

---

## 7. Team Responsibilities

| Module | Responsible member |
|---|---|
| Homepage and common UI | Member 1 |
| Government services | Member 2 |
| Backend, SQLite and APIs | Member 3 |
| Offices and announcements | Member 4 |

**This API contract is the shared integration agreement for all four members.**