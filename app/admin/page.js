"use client";

import { useState } from "react";
import { useDataStore } from "@/store/dataStore"; // adjust path
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function Admin() {
  // Zustand store
  const abwabs = useDataStore((state) => state.abwabs);
  const setAbwaab = useDataStore((state) => state.setAbwaab);

  const posts = useDataStore((state) => state.posts);
  const setPost = useDataStore((state) => state.setPost);

  // Local states
  const [newAbwab, setNewAbwab] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postArabic, setPostArabic] = useState("");
  const [postYTLink, setPostYTLink] = useState("");
  const [selectedAbwab, setSelectedAbwab] = useState("");

  // Add Abwab
  const handleAddAbwab = (e) => {
    e.preventDefault();
    if (newAbwab.trim() === "") {
      toast.error("براہ مہربانی ابواب کا نام درج کریں!");
      return;
    }
    const updated = [...abwabs, newAbwab];
    setAbwaab(updated);
    setNewAbwab("");
    toast.success("ابواب کامیابی سے شامل ہو گیا!");
  };

  // Add Post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!postTitle || !postContent || !selectedAbwab) {
      toast.error("براہ مہربانی تمام ضروری فیلڈز بھریں!");
      return;
    }

    const updatedPosts = [
      ...posts,
      {
        id: Date.now(),
        title: postTitle,
        content: postContent,
        arabic: postArabic,
        ytLink: postYTLink,
        abwab: selectedAbwab,
      },
    ];
    setPost(updatedPosts);
    setPostTitle("");
    setPostContent("");
    setPostArabic("");
    setPostYTLink("");
    setSelectedAbwab("");
    toast.success("پوسٹ کامیابی سے شامل ہو گئی!");

    // Redirect to home
    redirect("/");
  };

  return (
    <div className="p-8 font-nori max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6">ابواب اور پوسٹس کا انتظام</h1>

      {/* Add Abwab Form */}
      <form
        onSubmit={handleAddAbwab}
        className="mb-6 p-4 border rounded bg-white"
      >
        <h2 className="text-xl mb-2">نیا ابواب شامل کریں</h2>
        <input
          type="text"
          placeholder="ابواب کا نام"
          value={newAbwab}
          onChange={(e) => setNewAbwab(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-700 text-white p-2 rounded hover:bg-green-800"
        >
          شامل کریں
        </button>
      </form>

      {/* Add Post Form */}
      <form
        onSubmit={handleAddPost}
        className="mb-6 p-4 border rounded bg-white"
      >
        <h2 className="text-xl mb-2">نیا پوسٹ شامل کریں</h2>
        <select
          value={selectedAbwab}
          onChange={(e) => setSelectedAbwab(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">ابواب منتخب کریں</option>
          {abwabs?.map((ab, idx) => (
            <option key={idx} value={ab}>
              {ab}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="پوسٹ کا عنوان"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <textarea
          placeholder="پوسٹ کا مواد"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          placeholder="پوسٹ کی عربی"
          value={postArabic}
          onChange={(e) => setPostArabic(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          placeholder="یوٹیوب ویڈیو کا لنک"
          value={postYTLink}
          onChange={(e) => setPostYTLink(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          شامل کریں
        </button>
      </form>
    </div>
  );
}
