
import React, { useState } from 'react';
import { Post, UserRole } from '../types';
import { geminiService } from '../services/gemini';

interface PostCardProps {
  post: Post;
  role: UserRole;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, role, onEdit, onDelete }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const text = await geminiService.summarizeForStudent(post.description);
    setSummary(text);
    setIsSummarizing(false);
  };

  return (
    <div className="bg-[#00313d] rounded-xl shadow-lg border border-[#004b5f] overflow-hidden hover:border-[#009bb3] transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#004b5f] text-[#4dd0e1] text-xs font-semibold rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="px-3 py-1 bg-[#002b36] text-slate-300 text-xs font-medium rounded-full">
              {post.targetYear}
            </span>
          </div>
          {role === UserRole.TUTOR && (
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit?.(post)}
                className="text-slate-400 hover:text-[#00bcd4] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </button>
              <button 
                onClick={() => onDelete?.(post.id)}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
        <p className="text-slate-300 mb-4 whitespace-pre-wrap">{post.description}</p>

        {summary && (
          <div className="mb-4 p-3 bg-[#004242] border-l-4 border-[#00bcd4] rounded text-sm text-[#e0f2f1] italic">
            <strong className="text-[#00bcd4]">AI Summary:</strong> {summary}
          </div>
        )}

        {post.attachment && (
          <div className="mb-4 p-3 bg-[#002b36] border border-[#004b5f] rounded flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
               <svg className="w-6 h-6 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
               <span className="text-sm text-slate-400 truncate">{post.attachment.name}</span>
            </div>
            <a 
              href={post.attachment.data} 
              download={post.attachment.name}
              className="text-[#00bcd4] text-sm font-semibold hover:text-[#4dd0e1] transition-colors"
            >
              Download
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#004b5f] pt-4 gap-4">
          <div className="flex flex-col text-sm text-slate-400">
            <span className="font-medium text-slate-200">{post.tutorName}</span>
            <span>{post.date} at {post.time}</span>
          </div>
          {role === UserRole.STUDENT && !summary && (
            <button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-[#009bb3] text-[#00bcd4] rounded-lg text-sm hover:bg-[#004b5f] disabled:opacity-50 transition-all"
            >
              {isSummarizing ? 'Summarizing...' : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3z"></path></svg>
                  Quick AI Summary
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
