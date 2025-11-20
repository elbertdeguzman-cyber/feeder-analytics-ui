import { getPendingReviews, resolveReview } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("reviewList");
    const reviews = await getPendingReviews();

    list.innerHTML = "";

    reviews.forEach(review => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
        <div class="card shadow-sm p-3">
            <h5>${review.raw_name}</h5>
            <p class="text-muted">Suggested: <strong>${review.suggested_school_name ?? "None"}</strong></p>
            <p>Confidence: ${(review.confidence_score * 100).toFixed(1)}%</p>

            <button class="btn btn-success w-100 mb-2" onclick='approve("${review.review_id}")'>Approve</button>
            <button class="btn btn-danger w-100" onclick='reject("${review.review_id}")'>Reject</button>
        </div>
        `;

        list.appendChild(card);
    });
});

window.approve = async function (id) {
    await resolveReview({ review_id: id, action: "approve" });
    location.reload();
};

window.reject = async function (id) {
    await resolveReview({ review_id: id, action: "reject" });
    location.reload();
};
