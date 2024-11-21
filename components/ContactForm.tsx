"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { send } from '@emailjs/browser'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            await send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                Object.fromEntries(formData),
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )

            setIsSuccessModalOpen(true)
            form.reset()
        } catch (error) {
            console.error('Error sending email:', error)
            toast({
                title: "Error sending message",
                description: "There was a problem sending your message. Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Card>
                <CardContent className="pt-6 mt-6">
                    <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input id="name" name="name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <Textarea id="message" name="message" rows={4} required />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="bg-white/50">
                    <DialogHeader>
                        <DialogTitle>Message Sent Successfully!</DialogTitle>
                    </DialogHeader>
                    <Button onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
