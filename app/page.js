"use client";

import { useDataStore } from "@/store/dataStore";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const abwabs = useDataStore((state) => state.abwabs);
  const posts = useDataStore((state) => state.posts);
  const setPost = useDataStore((state) => state.setPost);

  // Delete post
  const handleDelete = (id) => {
    if (!confirm("کیا آپ واقعی یہ پوسٹ حذف کرنا چاہتے ہیں؟")) return;

    const updatedPosts = posts.filter((p) => p.id !== id);
    setPost(updatedPosts);
    toast.success("پوسٹ کامیابی سے حذف ہو گئی!");
  };

  // Convert normal YouTube link to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2]
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  return (
    <div className="p-8 font-nori max-w-4xl mx-auto">
      <button
        onClick={() => redirect("/admin")}
        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
      >
        Admin Panel
      </button>

      <h1 className="text-3xl mb-6 text-center">تمام پوسٹس</h1>

      {abwabs?.length === 0 && <p>ابھی کوئی ابواب شامل نہیں ہوا۔</p>}

      {abwabs?.map((ab, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">{ab}</h2>

          {posts.filter((p) => p.abwab === ab).length === 0 && (
            <p>ابھی اس ابواب کے لئے کوئی پوسٹ نہیں ہے۔</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {posts
              ?.filter((p) => p.abwab === ab)
              ?.map((p) => (
                <div
                  key={p.id}
                  className="border rounded p-4 shadow hover:shadow-lg transition bg-white relative"
                >
                  <h3 className="text-3xl font-semibold mb-2">{p.title}</h3>
                  <p className="mb-2 text-2xl">{p.content}</p>
                  {p.arabic && (
                    <p className="text-2xl text-gray-700 mb-2 font-semibold font-almajeed">
                      {p.arabic}
                    </p>
                  )}

                  {p.ytLink && getEmbedUrl(p.ytLink) && (
                    <div className="mb-2">
                      <iframe
                        className="w-full h-48"
                        src={getEmbedUrl(p.ytLink)}
                        title={p.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                  >
                    ڈیلیٹ کریں
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
