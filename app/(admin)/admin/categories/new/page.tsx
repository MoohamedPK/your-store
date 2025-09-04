"use client";

import { useState, useTransition } from "react";
import { createCategory } from "@/app/actions/categories/createCategory";
import { toast } from "sonner";

const NewCategory =  () => {

    const [name, setName] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
        const res = await createCategory(name);
        
        if (res?.success) {
            toast.success(res.message)
        } else {
            toast.error(res?.message)
        }
    })
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-zinc-800 hover:bg-zinc-800/85 cursor-pointer text-white px-4 py-2  rounded"
      >
        {isPending ? "Creating..." : "Create Category"}
      </button>
    </form>
  )
}

export default NewCategory