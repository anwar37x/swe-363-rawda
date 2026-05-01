import React from "react";
import { Clock, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router";

const QuestionCard = ({ question }) => {
  const { title, author, postedAt, tags, likes, id, _id } = question || {};
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/expert/question/${id || _id}`)}
      className="bg-white border p-4 rounded-lg flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-800 text-base">{title}</h3>

      <div className="flex items-center text-sm text-gray-500 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
            {author?.name?.charAt(0)}
          </div>
          <span className="text-gray-700">{author?.name}</span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <Clock size={14} />
          <span>{postedAt}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex gap-2 flex-wrap">
          {tags?.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <ThumbsUp size={15} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;