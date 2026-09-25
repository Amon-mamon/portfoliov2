"use client"

import React, { useEffect, useState } from "react"
import { Send, CheckCircle2, AlertCircle, Terminal, Star, Sparkles, Filter } from "lucide-react"
import { createClient } from "@/lib/supabaseClient"
import { Marquee } from "@/components/ui/feed-back-marquee"
import VariableDeclaration from "@/components/reusable/variable-declaration"

interface Feedback {
  id: string
  created_at: string
  rating: number
  name: string
  description: string
  suggestions?: string | null
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [fetching, setFetching] = useState(true)
  const [filterRating, setFilterRating] = useState<number | "all">("all")

  // Form states
  const [rating, setRating] = useState<number>(5)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [suggestions, setSuggestions] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {

    const supabase = await createClient()

    try {
      setFetching(true)
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      if (data) setFeedbacks(data)
    } catch (err: any) {
      console.error("Failed to load feedbacks:", err.message)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = await createClient()

    if (!rating) {
      setErrorMsg("Please select a score.")
      return
    }

    setSubmitting(true)
    setErrorMsg(null)

    try {
      const newFeedback = {
        rating,
        name,
        description,
        suggestions: suggestions.trim() ? suggestions : null,
      }

      const { data, error } = await supabase
        .from("feedbacks")
        .insert([newFeedback])
        .select()
        .single()

      if (error) throw error

      if (data) {
        setFeedbacks((prev) => [data, ...prev])
      }

      setSubmitted(true)
      setName("")
      setDescription("")
      setSuggestions("")
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to commit feedback.")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredFeedbacks = feedbacks.filter((item) => {
    if (filterRating === "all") return true
    return item.rating === filterRating
  })

  return (
    <div className=" p-4 md:p-8 font-mono text-xs text-gray-300">

      <VariableDeclaration
      variableName="Feedback"
      tagId="feedback"
      tagName="section"
      >

        <div className="my-6 pl-8 sm:pl-20  ml-8 sm:ml-20max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT: FORM ================= */}
        <div className="lg:col-span-6 bg-[#181818] border border-[#2b2b2b] rounded-sm p-5 shadow-2xl ">
          
          <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-3 mb-4">
            <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
              // 01. Commit Your Thoughts
            </span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
              Live Connection
            </span>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
              <p className="text-sm text-white font-medium">Commit Successful</p>
              <p className="text-gray-400 text-[11px]">
                Your review has been pushed to the community board.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-3 py-1.5 bg-[#252526] hover:bg-[#2a2d2e] border border-[#3c3c3c] text-white rounded text-xs transition-colors"
              >
                New Entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-950/40 border border-rose-800/50 text-rose-300 rounded text-[11px]">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Score Picker */}
              <div>
                <label className="block text-gray-400 mb-1.5">
                  <span className="text-[#569cd6]">const</span> rating =
                </label>
                <div className="grid grid-cols-5 gap-1 bg-[#111111] p-1 border border-[#2b2b2b] rounded">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`py-1.5 flex items-center justify-center gap-1 rounded transition-all text-xs ${
                        rating === num
                          ? "bg-[#007acc] text-white font-bold"
                          : "text-gray-400 hover:text-white hover:bg-[#222]"
                      }`}
                    >
                      <span>{num}</span>
                      <Star size={10} className={rating === num ? "fill-white" : ""} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="name">
                  <span className="text-[#9cdcfe]">authorName</span>:
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='e.g. "DevName"'
                  className="w-full bg-[#111111] border border-[#2b2b2b] focus:border-[#007acc] rounded px-3 py-1.5 text-white outline-none transition-colors"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="desc">
                  <span className="text-[#ce9178]">comment</span>:
                </label>
                <textarea
                  id="desc"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Honest feedback on UI, speed, or bugs..."
                  className="w-full bg-[#111111] border border-[#2b2b2b] focus:border-[#007acc] rounded px-3 py-1.5 text-white outline-none transition-colors resize-none"
                />
              </div>

              {/* Ideas */}
              <div>
                <label className="block text-gray-400 mb-1" htmlFor="sugg">
                  <span className="text-[#4ec9b0]">suggestions</span>: <span className="text-gray-600">(optional)</span>
                </label>
                <textarea
                  id="sugg"
                  rows={2}
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="What feature would you like to see next?"
                  className="w-full bg-[#111111] border border-[#2b2b2b] focus:border-[#007acc] rounded px-3 py-1.5 text-white outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#007acc] hover:bg-[#0062a3] text-white py-2 rounded font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Executing...</span>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Push Feedback</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ================= RIGHT: COMMUNITY STREAM ================= */}
        <div className="lg:col-span-6 bg-[#181818] border border-[#2b2b2b] rounded-sm p-5 shadow-2xl flex flex-col h-[520px]">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#2b2b2b] pb-3 mb-4 gap-2">
            <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
              // 02. Community Activity Log
            </span>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-[#111111] p-0.5 border border-[#2b2b2b] rounded">
              <Filter size={10} className="text-gray-500 ml-1.5" />
              {(["all", 5, 4] as const).map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setFilterRating(val)}
                  className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                    filterRating === val
                      ? "bg-[#2d2d2d] text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {val === "all" ? "All" : `${val}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Marquee Content */}
          {fetching ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Fetching entries...
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-2">
              <Sparkles size={20} className="text-gray-600" />
              <p>No feedback entries match this filter.</p>
            </div>
          ) : (
            <div className="relative flex-1 overflow-hidden">
              <Marquee vertical pauseOnHover className="[--duration:28s] h-full">
                {filteredFeedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="w-full bg-[#111111] border border-[#2b2b2b] hover:border-[#3c3c3c] rounded p-3 mb-2 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#9cdcfe] font-medium text-xs">
                        @{item.name} 
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <span className="text-[10px] font-bold">{item.rating}.0</span>
                        <Star size={10} className="fill-amber-400" />
                      </div>
                    </div>

                    <div className="text-[#6a9955] leading-relaxed text-[11px] mb-2 font-mono whitespace-pre-wrap italic">
                        <span className="text-[#57a64a] font-normal not-italic">{"{"}/* </span>
                        {item.description}
                        <span className="text-[#57a64a] font-normal not-italic"> */{"}"}</span>
                    </div>

                    {item.suggestions && (
                      <div className="bg-[#181818] pl-2 py-1 text-[10px] text-gray-400">
                        <span className="text-[#4ec9b0] font-semibold">? suggestion</span>{" "}
                        {item.suggestions}
                      </div>
                    )}
                  </div>
                ))}
              </Marquee>

              {/* Edge Fades */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#181818] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#181818] to-transparent z-10" />
            </div>
          )}

          <div className="border-t border-[#2b2b2b] pt-2 mt-auto text-[10px] text-gray-500 flex justify-between">
            <span>Hover list to freeze auto-scroll</span>
            <span>Total: {filteredFeedbacks.length} items</span>
          </div>

        </div>

      </div>
      </VariableDeclaration>
    </div>
  )
}