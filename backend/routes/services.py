
import json

from flask import Blueprint, jsonify, request

from database.db import get_db_connection


services_bp = Blueprint("services", __name__)


def convert_service(row):
    """Convert a database row into an API-friendly dictionary."""
    service = dict(row)

    service["required_documents"] = json.loads(
        service["required_documents"] or "[]"
    )

    service["application_steps"] = json.loads(
        service["application_steps"] or "[]"
    )

    return service


# GET all services, with optional search and category filters
@services_bp.route("/api/services", methods=["GET"])
def get_services():
    search = request.args.get("search", "").strip()
    category = request.args.get("category", "").strip()

    query = "SELECT * FROM services WHERE 1=1"
    parameters = []

    if search:
        query += " AND name LIKE ?"
        parameters.append(f"%{search}%")

    if category:
        query += " AND category = ?"
        parameters.append(category)

    query += " ORDER BY name"

    connection = get_db_connection()

    try:
        rows = connection.execute(query, parameters).fetchall()
        services = [convert_service(row) for row in rows]

        return jsonify({
            "success": True,
            "data": services,
            "message": "Services retrieved successfully"
        }), 200

    finally:
        connection.close()


# GET one service using its ID
@services_bp.route("/api/services/<int:service_id>", methods=["GET"])
def get_service(service_id):
    connection = get_db_connection()

    try:
        row = connection.execute(
            "SELECT * FROM services WHERE id = ?",
            (service_id,)
        ).fetchone()

        if row is None:
            return jsonify({
                "success": False,
                "data": None,
                "message": "Service not found"
            }), 404

        return jsonify({
            "success": True,
            "data": convert_service(row),
            "message": "Service retrieved successfully"
        }), 200

    finally:
        connection.close()
