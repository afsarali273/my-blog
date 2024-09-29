import { Card, CardContent } from "@/components/ui/card"

export default function BlogPage() {
    const blogPosts = [
        // Add more blog posts here
        {
            id: 1,
            title: "Getting Started with Next.js",
            excerpt: "Learn how to set up your first Next.js project and understand its key features...",
            date: "2023-07-15"
        },
        {
            id: 2,
            title: "Mastering React Hooks",
            excerpt: "Dive deep into React Hooks and learn how to use them effectively in your projects...",
            date: "2023-06-22"
        },
        {
            id: 3,
            title: "Building Scalable APIs with Node.js",
            excerpt: "Discover best practices for creating robust and scalable APIs using Node.js...",
            date: "2023-05-10"
        }
    ]

    return (
        <div className="container mx-auto px-6 mt-12">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map(post => (
                    <Card key={post.id}>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-2">{post.date}</p>
                            <p className="text-gray-700 mb-4">{post.excerpt}</p>
                            <a href="#" className="text-blue-600 hover:underline">Read More</a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
