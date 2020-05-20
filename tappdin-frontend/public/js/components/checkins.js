const ratings = document.querySelectorAll(".checkin__rating-val");

for(let rating of ratings){
    console.log(rating)
    const ratingVal = parseInt(rating.dataset.rating, 10);
    let displayRating = "";
    for (let i = 1; i <= ratingVal; i++) {
        displayRating += "🍺";
        rating.innerHTML = displayRating;
}

}

