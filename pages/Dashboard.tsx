
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserRole, Post, CollegeYear, PostCategory } from '../types';
import { CATEGORIES } from '../constants';
import { storage } from '../services/storage';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | PostCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(storage.getPosts());
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by User's year if Student
    if (user.role === UserRole.STUDENT && user.year) {
      result = result.filter(p => p.targetYear === user.year || p.targetYear === CollegeYear.ALL);
    }

    // Filter by Category
    if (activeTab !== 'ALL') {
      result = result.filter(p => p.category === activeTab);
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tutorName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, user, activeTab, searchQuery]);

  const handleCreateOrUpdate = (data: Partial<Post>) => {
    if (editingPost) {
      const updated = { ...editingPost, ...data } as Post;
      storage.updatePost(updated);
    } else {
      const newPost: Post = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        tutorId: user.id,
        tutorName: user.name,
        createdAt: Date.now(),
      } as Post;
      storage.savePost(newPost);
    }
    setPosts(storage.getPosts());
    setShowForm(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      storage.deletePost(id);
      setPosts(storage.getPosts());
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {user.role === UserRole.TUTOR ? 'Tutor Management' : 'Student Feed'}
          </h1>
          <p className="text-[#00bcd4] font-medium">
            {user.role === UserRole.TUTOR ? 'Create and manage official campus updates' : `Official updates for ${user.year}`}
          </p>
        </div>
        
        {user.role === UserRole.TUTOR && !showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#009bb3] text-white font-bold rounded-xl shadow-lg hover:bg-[#00bcd4] transition-all hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            New Announcement
          </button>
        )}
      </div>

      {showForm ? (
        <PostForm 
          initialData={editingPost}
          onCancel={() => { setShowForm(false); setEditingPost(null); }}
          onSubmit={handleCreateOrUpdate}
        />
      ) : (
        <>
          {/* Filters & Search */}
          <div className="bg-[#002b36] p-4 rounded-xl border border-[#004b5f] mb-8 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'ALL' ? 'bg-[#009bb3] text-white' : 'bg-[#003a4a] text-slate-300 hover:bg-[#004b5f]'}`}
              >
                All Announcements
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === cat ? 'bg-[#009bb3] text-white' : 'bg-[#003a4a] text-slate-300 hover:bg-[#004b5f]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full lg:w-72 px-10 py-2 bg-[#00313d] border border-[#004b5f] rounded-lg text-white focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none transition-all placeholder-slate-500"
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#00bcd4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Feed Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  role={user.role} 
                  onEdit={startEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#00313d] rounded-2xl border border-dashed border-[#004b5f]">
              <div className="w-16 h-16 bg-[#004b5f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#00bcd4]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white">No announcements found</h3>
              <p className="text-slate-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
