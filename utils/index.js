export const getCourseRatings = (reviews) => {
    let total = 0
    let ratings = 0
    reviews.map(review => {
        ratings += parseInt(review.ratings)
        total++
    })
    return (ratings / total).toFixed(1)
}