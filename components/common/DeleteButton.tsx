"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter} from "@/components/ui/dialog"
import { toast } from "sonner"
// import { deleteCategory } from "@/app/actions/categories/deleteCategory"

const DeleteButton = ({ id, action}: {id:string, action: (id: string) => Promise<{success: boolean, message?: string}>}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await action(id)

      if (result.success) return toast.success(result.message)

    } catch (error) {
      console.error("Failed to delete", error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button className="text-red-400 cursor-pointer" variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>
    
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle/>
        <DialogContent className="bg-zinc-900 text-white ">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>This action cannot be undone.</p>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading} className="text-red-400 cursor-pointer">
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteButton