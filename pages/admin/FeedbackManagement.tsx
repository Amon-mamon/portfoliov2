"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { 
  VscFeedback, 
  VscTrash, 
  VscEdit, 
  VscCheck, 
  VscClose, 
  VscLoading, 
  VscStarFull, 
  VscRefresh,
  VscSymbolVariable
} from "react-icons/vsc";

export interface FeedbackItem {
  id: string | number;
  created_at?: string;
  rating: number;
  name: string;
  description: string;
  suggestions?: string | null;
}

export function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Partial<FeedbackItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  const supabase = createClient();

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setFeedbacks(data);
    } catch (err: any) {
      console.error("Error fetching feedbacks:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Delete Action
  const handleDelete = async (id: string | number) => {
  if (!confirm("Are you sure you want to delete this feedback record?")) return;

  try {
    // Adding .select() returns the array of deleted rows
    const { data, error } = await supabase
      .from("feedbacks")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;

    // If data is empty, RLS blocked the deletion!
    if (!data || data.length === 0) {
      alert("Delete failed: Row Level Security (RLS) prevented deletion on Supabase.");
      return;
    }

    // Remove from local UI state only if actual DB deletion succeeded
    setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) cancelEdit();
  } catch (err: any) {
    console.error("Delete failed:", err.message);
  }
};
  // Start Editing
  const startEditing = (item: FeedbackItem) => {
    setEditingId(item.id);
    setEditForm({
      rating: item.rating,
      name: item.name,
      description: item.description,
      suggestions: item.suggestions || "",
    });
  };

  // Cancel Editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save Edit Action
  const handleSaveUpdate = async (id: string | number) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("feedbacks")
        .update({
          rating: editForm.rating,
          name: editForm.name,
          description: editForm.description,
          suggestions: editForm.suggestions?.trim() ? editForm.suggestions : null,
        })
        .eq("id", id);

      if (error) throw error;

      // Update Local State
      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                rating: editForm.rating ?? item.rating,
                name: editForm.name ?? item.name,
                description: editForm.description ?? item.description,
                suggestions: editForm.suggestions,
              }
            : item
        )
      );

      cancelEdit();
    } catch (err: any) {
      console.error("Update failed:", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#181818] border border-[#2b2b2b] rounded-lg overflow-hidden shadow-2xl font-mono text-xs text-[#d4d4d4]">
      {/* Table Header / Toolbar */}
      <div className="bg-[#252526] px-4 py-2.5 border-b border-[#2b2b2b] flex items-center justify-between text-[#cccccc]">
        <span className="flex items-center gap-2 font-semibold">
          <VscFeedback className="text-[#e5c07b]" />
          <span>feedbacks.table.json [{feedbacks.length}]</span>
        </span>
        <button
          onClick={fetchFeedbacks}
          disabled={loading}
          className="flex items-center gap-1 text-[#808080] hover:text-white transition-colors cursor-pointer"
        >
          <VscRefresh className={`text-sm ${loading ? "animate-spin" : ""}`} />
          <span>reload()</span>
        </button>
      </div>

      {/* Body List */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="p-8 text-center text-[#4ec9b0] flex items-center justify-center gap-2">
            <VscLoading className="animate-spin text-lg" />
            <span>// Loading feedback records...</span>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="p-8 text-center text-[#808080]">
            // No user feedback entries found.
          </div>
        ) : (
          feedbacks.map((item) => {
            const isEditingThis = editingId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-[#1e1e1e] border rounded-md p-3 transition-all ${
                  isEditingThis
                    ? "border-[#e5c07b] bg-[#222222]"
                    : "border-[#2b2b2b] hover:border-[#3c3c3c]"
                }`}
              >
                {isEditingThis ? (
                  /* Inline Edit Form */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-2 text-[#e5c07b]">
                      <span>editingRecord(id: {item.id})</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveUpdate(item.id)}
                          disabled={isSaving}
                          className="flex items-center gap-1 bg-[#4ec9b0] hover:bg-[#3db39a] text-black px-2 py-1 rounded font-bold cursor-pointer"
                        >
                          {isSaving ? <VscLoading className="animate-spin" /> : <VscCheck />}
                          <span>Save</span>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] text-white px-2 py-1 rounded cursor-pointer"
                        >
                          <VscClose />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[#9cdcfe] text-[11px] block mb-1">&quot;author_name&quot;:</label>
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-[#181818] border border-[#3c3c3c] rounded px-2 py-1 text-[#ce9178] outline-none focus:border-[#007acc]"
                        />
                      </div>
                      <div>
                        <label className="text-[#9cdcfe] text-[11px] block mb-1">&quot;rating_score&quot; (1-5):</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={editForm.rating || 5}
                          onChange={(e) => setEditForm({ ...editForm, rating: Number(e.target.value) })}
                          className="w-full bg-[#181818] border border-[#3c3c3c] rounded px-2 py-1 text-[#ce9178] outline-none focus:border-[#007acc]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#9cdcfe] text-[11px] block mb-1">&quot;description&quot;:</label>
                      <textarea
                        rows={2}
                        value={editForm.description || ""}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full bg-[#181818] border border-[#3c3c3c] rounded px-2 py-1 text-[#ce9178] outline-none focus:border-[#007acc] resize-y"
                      />
                    </div>

                    <div>
                      <label className="text-[#9cdcfe] text-[11px] block mb-1">&quot;suggestions&quot;:</label>
                      <input
                        type="text"
                        value={editForm.suggestions || ""}
                        onChange={(e) => setEditForm({ ...editForm, suggestions: e.target.value })}
                        className="w-full bg-[#181818] border border-[#3c3c3c] rounded px-2 py-1 text-[#ce9178] outline-none focus:border-[#007acc]"
                      />
                    </div>
                  </div>
                ) : (
                  /* Display Row */
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#9cdcfe] font-bold">@{item.name}</span>
                        <div className="flex items-center text-amber-400 gap-0.5 text-[11px]">
                          <VscStarFull />
                          <span>{item.rating}.0</span>
                        </div>
                      </div>

                      {/* Commented Description formatting */}
                      <div className="text-[#6a9955] italic leading-relaxed text-[11px]">
                        <span className="not-italic text-[#57a64a]">/* </span>
                        {item.description}
                        <span className="not-italic text-[#57a64a]"> */</span>
                      </div>

                      {item.suggestions && (
                        <div className="text-[#6a9955] text-[10px]">
                          <span className="text-[#4ec9b0] font-semibold not-italic">// Suggestion:</span>{" "}
                          {item.suggestions}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => startEditing(item)}
                        className="flex items-center gap-1 bg-[#e5c07b]/10 hover:bg-[#e5c07b] text-[#e5c07b] hover:text-black border border-[#e5c07b]/30 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <VscEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 bg-[#f14c4c]/10 hover:bg-[#f14c4c] text-[#f14c4c] hover:text-white border border-[#f14c4c]/30 px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer"
                      >
                        <VscTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}