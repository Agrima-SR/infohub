
import React, { useState, useEffect } from 'react';
import { Post, PostCategory, CollegeYear } from '../types';
import { CATEGORIES, YEARS } from '../constants';
import { geminiService } from '../services/gemini';

interface PostFormProps {
  initialData?: Post | null;
  onSubmit: (data: Partial<Post>) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    description: '',
    category: PostCategory.REGISTRATIONS,
    targetYear: CollegeYear.ALL,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    ...initialData
  });

  const [isRefining, setIsRefining] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRefine = async () => {
    if (!formData.title || !formData.description) {
      alert('Please provide a title and description first.');
      return;
    }
    setIsRefining(true);
    const refined = await geminiService.refinePost(formData.title, formData.description);
    setFormData(prev => ({ ...prev, description: refined }));
    setIsRefining(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let fileData = formData.attachment;
    if (attachment) {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
      });
      reader.readAsDataURL(attachment);
      const data = await base64Promise;
      fileData = {
        name: attachment.name,
        type: attachment.type,
        data: data
      };
    }

    onSubmit({ ...formData, attachment: fileData });
  };

  const inputClasses = "w-full px-4 py-2 bg-[#002b36] border border-[#004b5f] rounded-lg text-white focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none transition-all placeholder-slate-500";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <div className="bg-[#00313d] p-6 md:p-8 rounded-2xl shadow-2xl border border-[#004b5f] max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? 'Edit Announcement' : 'Create New Announcement'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClasses}>Title</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className={inputClasses}
            placeholder="e.g., Annual Sports Meet"
          />
        </div>

        <div>
          <label className={labelClasses}>
            Description
            <button 
              type="button"
              onClick={handleRefine}
              disabled={isRefining}
              className="ml-4 text-xs font-semibold text-[#00bcd4] hover:text-[#4dd0e1] disabled:opacity-50"
            >
              {isRefining ? '✨ Refining...' : '✨ Polish with AI'}
            </button>
          </label>
          <textarea 
            required
            rows={5}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className={inputClasses}
            placeholder="Provide all relevant details here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as PostCategory })}
              className={inputClasses}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-[#00313d]">{cat}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Target Year</label>
            <select 
              value={formData.targetYear}
              onChange={e => setFormData({ ...formData, targetYear: e.target.value as CollegeYear })}
              className={inputClasses}
            >
              <option value={CollegeYear.ALL} className="bg-[#00313d]">All Years</option>
              {YEARS.map(year => <option key={year} value={year} className="bg-[#00313d]">{year}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Date</label>
            <input 
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Time</label>
            <input 
              type="time"
              required
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Attachment (PDF/Image)</label>
          <input 
            type="file"
            onChange={handleFileChange}
            accept=".pdf,image/*"
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#004b5f] file:text-[#00bcd4] hover:file:bg-[#007b8f] transition-all"
          />
          {initialData?.attachment && !attachment && (
            <p className="mt-1 text-xs text-slate-500 italic">Current file: {initialData.attachment.name}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#004b5f] mt-6">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 border border-[#004b5f] text-slate-300 rounded-lg hover:bg-[#004b5f] transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-[#009bb3] text-white rounded-lg hover:bg-[#00bcd4] transition-all shadow-lg active:scale-95"
          >
            {initialData ? 'Update Post' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
