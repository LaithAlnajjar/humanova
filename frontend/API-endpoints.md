# Humanova API Endpoints (draft)

Base URL (configurable via `.env`):

- `VITE_API_BASE_URL` → e.g. `http://localhost:4000/api`

---

## Auth

### POST /auth/login

**Request**

```json
{
  "email": "string",
  "password": "string"
}
