import { useState, useEffect } from "react";

const RatingModal = ({ rival }) => {
  const [stars, setStars] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleStarClick = async (starCount) => {
    setStars(starCount);

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grade: starCount,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${rival._id}/grade`,
        requestOptions
      );
      setUserRating(starCount);
      setShowMessage(true);

      // Oculta el mensaje después de 3 segundos
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const requestOptions = {
          method: "GET",
          credentials: "include",
          headers: {
            aplication: "json",
          },
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${rival._id}/myGrade`,
          requestOptions
        );
        const { grade } = await response.json();
        if (grade.value !== undefined) {
          const parsedRating = parseFloat(grade.value, 10);
          setUserRating(parsedRating);
          if (stars === null) {
            setStars(parsedRating);
          }
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchUserRating();
  }, [rival, stars]);

  return (
    <div>
      {showMessage && <p>Grade updated!</p>}
      <p>Your rate to this rival:</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={` ${
            userRating && star <= userRating
              ? "text-yellow-500"
              : "text-black-400"
          } p-1 cursor-pointer`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingModal;
