const API_BASE = "https://elbertus.app.n8n.cloud/webhook";

export async function getPendingReviews() {
    const response = await fetch(`${API_BASE}/reviews/pending`);
    return await response.json();
}

export async function resolveReview(payload) {
    const response = await fetch(`${API_BASE}/reviews/resolve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return await response.json();
}
