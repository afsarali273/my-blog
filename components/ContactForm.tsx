import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactForm() {
    return (
        <Card>
            <CardContent className="pt-6 mt-6">
                <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
                <form className="space-y-4">
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
                    <Button type="submit">Send Message</Button>
                </form>
            </CardContent>
        </Card>
    )
}
