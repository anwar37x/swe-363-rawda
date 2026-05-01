import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2, MoreHorizontal, Send, Loader2 } from "lucide-react";

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5050/api/questions/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setQuestion(data);
      setLikes(data.likes || 0);
    } catch (err) {
      showToast("Failed to load question.");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handlePostAnswer = async () => {
    if (!answer.trim()) {
      showToast("Please write an answer before posting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5050/api/questions/${id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: answer }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Failed to post answer.");
        return;
      }

      setAnswer("");
      showToast("Answer posted successfully!");
      fetchQuestion();

    } catch (err) {
      showToast("Server error. Make sure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Question not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-900 pl-0 hover:bg-transparent"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
                {question.author?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{question.author?.name || "Unknown"}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">
                    Gardener
                  </span>
                  <span>•</span>
                  <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </Button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
          <div className="text-gray-600 mb-6 leading-relaxed">
            <p>{question.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {question.tags?.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`gap-2 ${liked ? "text-green-600" : "text-gray-500 hover:text-green-600"}`}
              >
                <ThumbsUp size={18} />
                <span>{likes} Likes</span>
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-green-600 gap-2">
                <MessageSquare size={18} />
                <span>{question.answers?.length || 0} Answers</span>
              </Button>
            </div>
            <Button variant="ghost" onClick={handleShare} className="text-gray-500 hover:text-gray-900 gap-2">
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Answers */}
      {question.answers?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {question.answers.length} {question.answers.length === 1 ? "Answer" : "Answers"}
          </h3>
          <div className="space-y-6">
            {question.answers.map((ans) => (
              <div key={ans._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                    {ans.author?.name?.charAt(0) || "E"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ans.author?.name || "Expert"}</p>
                    <p className="text-xs text-gray-500">{new Date(ans.createdAt).toLocaleDateString()}</p>
                  </div>
                  {ans.isVerified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{ans.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Answer */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Expert Answer</h3>
        <div className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full min-h-[200px] p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-y outline-none transition-all text-gray-700"
            placeholder="Write your helpful answer here..."
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Posting as <span className="font-semibold text-gray-900">{user.name || "Expert"}</span>
            </p>
            <Button
              onClick={handlePostAnswer}
              disabled={!answer.trim() || isSubmitting}
              className="bg-[#4CAF50] hover:bg-[#43A047] text-white gap-2 px-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Posting...
                </>
              ) : (
                <>
                  <Send size={16} /> Post Answer
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}