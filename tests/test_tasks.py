def test_create_task(client):
    response = client.post(
        "/api/v1/tasks/",
        json={
            "title": "Learn FastAPI",
            "description": "Build a task management API"
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Learn FastAPI"
    assert data["completed"] is False
    assert data["id"] is not None


def test_get_tasks(client):
    client.post(
        "/api/v1/tasks/",
        json={"title": "Task One"}
    )

    response = client.get("/api/v1/tasks/")

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_task_by_id(client):
    created = client.post(
        "/api/v1/tasks/",
        json={"title": "My Task"}
    )

    task_id = created.json()["id"]

    response = client.get(f"/api/v1/tasks/{task_id}")

    assert response.status_code == 200
    assert response.json()["title"] == "My Task"


def test_update_task(client):
    created = client.post(
        "/api/v1/tasks/",
        json={"title": "Old Title"}
    )

    task_id = created.json()["id"]

    response = client.patch(
        f"/api/v1/tasks/{task_id}",
        json={"title": "New Title", "completed": True}
    )

    assert response.status_code == 200
    assert response.json()["title"] == "New Title"
    assert response.json()["completed"] is True


def test_delete_task(client):
    created = client.post(
        "/api/v1/tasks/",
        json={"title": "Delete Me"}
    )

    task_id = created.json()["id"]

    response = client.delete(f"/api/v1/tasks/{task_id}")

    assert response.status_code == 204

    response = client.get(f"/api/v1/tasks/{task_id}")

    assert response.status_code == 404


def test_task_not_found(client):
    response = client.get("/api/v1/tasks/99999")

    assert response.status_code == 404


def test_invalid_task(client):
    response = client.post(
        "/api/v1/tasks/",
        json={"title": "AB"}
    )

    assert response.status_code == 422

def test_task_pagination(client):
    client.post("/api/v1/tasks/", json={"title": "Task One"})
    client.post("/api/v1/tasks/", json={"title": "Task Two"})
    client.post("/api/v1/tasks/", json={"title": "Task Three"})

    response = client.get("/api/v1/tasks/?skip=0&limit=2")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_filter_completed_tasks(client):
    task = client.post(
        "/api/v1/tasks/",
        json={"title": "Completed Task"}
    ).json()

    client.patch(
        f"/api/v1/tasks/{task['id']}",
        json={"completed": True}
    )

    client.post(
        "/api/v1/tasks/",
        json={"title": "Pending Task"}
    )

    response = client.get("/api/v1/tasks/?completed=true")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["completed"] is True


def test_filter_pending_tasks(client):
    client.post(
        "/api/v1/tasks/",
        json={"title": "Pending Task"}
    )

    response = client.get("/api/v1/tasks/?completed=false")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["completed"] is False