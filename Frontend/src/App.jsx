import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCopy, setShowCopy] = useState(false);

  const prompt = "Generate review";
  const GOOGLE_REVIEW_LINK =
    "https://search.google.com/local/writereview?placeid=ChIJsRbQh4jxDDkRPjbID0hbDcQ";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://ai-code-reviewer-watl.onrender.com/Api/get-response",
          { prompt },
          { withCredentials: true }
        );
        // if(res.data.error){
        //   window.location.reload();
        //   return ;
        // }
        if (res.data?.message) {
          setValue(String(res.data.message));
        } else if (typeof res.data === "string") {
          setValue(res.data);
        } else {
          setValue("Something went wrong. Please try again.");
        }
        console.log(res);
        setShowCopy(true);
      } catch (err) {
        setValue("Server busy, please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyReview = () => {
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_LINK, "_blank");
    }, 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="shadow-black shadow-sm rounded-xl w-full sm:w-[90%] lg:w-[50%] lg:h-[60%] text-center p-5">
        <h1 className="text-xl font-bold mb-4">
          Welcome to Chandra Prabha Travels Page
          <br />
          Click on Copy & Go and paste the text in review
        </h1>

        <div className="flex flex-col items-center">
          <div className="w-[90%] h-40 p-2 shadow-sm shadow-black rounded-xl mb-4 overflow-y-auto">
            {loading ? "Generating review..." : value}
          </div>

          {showCopy && (
            <button
              onClick={copyReview}
              className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-white hover:text-black hover:shadow-sm shadow-black"
            >
              Copy & Go
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
